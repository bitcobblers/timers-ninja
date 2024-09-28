import { IToken } from "chevrotain";
import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";
import { MdRepetitionValue, MDTimerEntry, MDTimerEntryType, MDTimerStatementBuilder, MdTimerValue, MdWeightValue, StatementLabelBuilder, StatementMetricBuilder, type MDTimerCommand } from "./timer.types";

const parser = new MdTimerParse() as any;
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class MdTimerInterpreter extends BaseCstVisitor {
  constructor() {
    super();
    // This helper will detect any missing or redundant methods on this visitor

    this.validateVisitor();
  }

  /// High level entry point, contains any number of simple of compound timers.
  timerMarkdown(ctx: any): MDTimerCommand[] {
    const commands = [] as MDTimerCommand[];
    let current = undefined as undefined | MDTimerCommand;
    for (let block of ctx.blocks) {
      var entry = this.visit(block) as MDTimerStatementBuilder;
      if (entry) {
        var entryLine = Math.min(...entry.sources().map((e: any) => e.endLine));

        if ((current?.line || 0) != entryLine) {
          current = {
            line: entryLine,
            label: "",
            repeater: {},
            sources: [],
            children: [],
            metrics: []
          };
          commands.push(current);
        }

        if (current) {
          entry.apply(current);
        }
      }
    }

    return commands;
  }

  timerBlock(ctx: any): MDTimerStatementBuilder | undefined {
    if (ctx.simpleTimer) {
      return this.visit(ctx.simpleTimer)

    }
    if (ctx.resistance) {
      return this.visit(ctx.resistance);
    }

    if (ctx.labels[0]) {
      return this.visit(ctx.labels[0]);
    }          
  }

  resistance(ctx: any) {
    let value = undefined as undefined | MDTimerEntry
    if (ctx.resitanceShort) {
      value = this.visit(ctx.resitanceShort);
    }
    if (ctx.resistanceValue) {
      value = this.visit(ctx.resistanceValue);
    }
    if (ctx.resistanceLong) {
      value = this.visit(ctx.resistanceLong);
    }

    return new StatementMetricBuilder(value as MDTimerEntry);
  }

  resitanceShort(ctx: any) {
    return new MdWeightValue("LB", Number(ctx.Integer[0].image), [ctx.Integer[0]]);
  }

  resistanceValue(ctx: any) {
    return new MdWeightValue(ctx.Kelos ? "KG" : "LB", Number(ctx.Integer[0].image), [ctx.Integer[0]])
  }

  resistanceLong(ctx: any) {
    return new MdWeightValue(ctx.Kelos ? "KG" : "LB", Number(ctx.Integer[0].image), [ctx.Integer[0]])
  }

  simpleTimer(ctx: any): MDTimerStatementBuilder {
    const type =
      ctx.CountDirection && ctx.CountDirection[0].tokenType == Minus
        ? "down"
        : "up";
    const sources = [];
    if (ctx.CountDirection) {
      sources.push(ctx.CountDirection[0]);
    }
    sources.push(ctx.Time[0]);
    return new StatementMetricBuilder(new MdTimerValue(ctx.Time[0].image, type, sources));
  }

  labels(ctx: any): MDTimerStatementBuilder {
        return new StatementLabelBuilder(this.visit(ctx.label[0]));
    
    
  }

  label(ctx: any): MDTimerStatementBuilder {
    return ctx.stringValue.map((v : any) => this.visit(v));
  }

  numericValue(ctx: any): MdTimerValue {
    const value = ctx.Integer[0].image;
    return new MdRepetitionValue(Number(value), [ctx.Integer[0]]);
  }

  stringValue(ctx: any): IToken {
    return ctx.Identifier[0];
  }
}
