import { IToken } from "chevrotain";
import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";
import { MdRepetitionValue, IMDTimerEntry, MDTimerStatementBuilder, MdTimerValue, MdWeightValue, StatementLabelBuilder, StatementMetricBuilder, type MDTimerCommand, StatementTimerBuilder, StatementMultiplierBuilder, MdMultiplierValue, LabelMultiplierValue } from "./timer.types";

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
    let parrent = undefined as undefined | MDTimerCommand;

    let push = (command: MDTimerCommand) => {
      if (parrent) {
        parrent.children.push(command);
      }
      else {
        commands.push(command);
      }
    }
    for (let block of ctx.blocks) {
      var entry = this.visit(block) as MDTimerStatementBuilder;
      if (entry) {
        var entryLine = Math.min(...entry.sources().map((e: any) => e.endLine));
        console.log("linInfo:" ,current?.line, entryLine, (current?.line || 0) + 2 <= entryLine )
                
        if ((current?.line || 0) != entryLine) {                    
          if (current && !current?.multiplier) {
            current!.multiplier = new MdMultiplierValue(1, []);
          }
          if (current) {
            push(current)
          }
          if ((current?.line || 0) + 2 <= entryLine ) {
            parrent = undefined;
          }
          if (!current?.timer && !parrent) {
            parrent = current;
          }
          current = {
            line: entryLine,
            label: "",
            multiplier: undefined,
            timer: undefined,
            sources: [],
            children: [],
            metrics: []
          };
          
        }

        if (current) {
          entry.apply(current);
        }
      }      
    }    
    
    if (current) {
      push(current)
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

    if (ctx.labels) {
      return this.visit(ctx.labels[0]);
    }

    if (ctx.repeater) {
      return this.visit(ctx.repeater[0])
    }
  }

  resistance(ctx: any) {
    let value = undefined as undefined | IMDTimerEntry
    if (ctx.resitanceShort) {
      value = this.visit(ctx.resitanceShort);
    }
    if (ctx.resistanceValue) {
      value = this.visit(ctx.resistanceValue);
    }
    if (ctx.resistanceLong) {
      value = this.visit(ctx.resistanceLong);
    }

    return new StatementMetricBuilder(value as IMDTimerEntry);
  }
  repeater(ctx: any): MDTimerStatementBuilder {

    return new StatementMultiplierBuilder(new MdMultiplierValue(Number(ctx.Multiplier[0].image.replace(/\D/g, '')), [ctx.Multiplier[0]]));
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
    return new StatementTimerBuilder(new MdTimerValue(ctx.Time[0].image, type, sources));
  }

  labels(ctx: any): MDTimerStatementBuilder {
    if (ctx.label.length == 1) {
      return new StatementLabelBuilder(this.visit(ctx.label[0]));
    }
    let labels = ctx.label.map((label: any) => this.visit(label));
    let tokens = ctx.label.flatMap((label: any) => label.children.stringValue[0].children.Identifier as IToken[]);
    return new StatementMultiplierBuilder(new LabelMultiplierValue(labels, tokens));
  }

  label(ctx: any): MDTimerStatementBuilder {
    return ctx.stringValue.map((v: any) => this.visit(v));
  }

  numericValue(ctx: any): MdTimerValue {
    const sources = [ctx.Integer[0]];
    const value = ctx.Integer[0].image;
    return new MdRepetitionValue(Number(value), sources);
  }

  stringValue(ctx: any): IToken {
    return ctx.Identifier[0];
  }
}
