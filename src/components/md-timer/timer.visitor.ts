import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";
import { MdRepetitionValue, MDTimerEntry, MDTimerEntryType, MdTimerValue, type MDTimerCommand } from "./timer.types";

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
    const result = ctx.blocks.flatMap(
      (block: any) => this.visit(block),
    ) as MDTimerCommand[];
    return result;
  }

  timerBlock(ctx: any) {    
    const blocks = [] as MDTimerCommand[];            
    let tracker = undefined as MDTimerEntry | undefined;            
    if (ctx.simpleTimer) {       
      tracker = this.visit(ctx.simpleTimer)      

    }
    if (ctx.numericValue) {
      tracker = this.visit(ctx.numericValue);
    }

    const labels = ctx.labels[0].children.lenght > 0 
      ? ctx.labels[0].children 
      : [null];

    for (const label of labels)                    
    { 
      const value = label == null 
        ? "" 
        : this.visit(label);
        
      blocks.push({
            label: value,
            metrics: tracker !== undefined ? [ tracker ] : [],
            repeater: {}, 
            children: [],
            sources: []
        });
    }             
    return blocks;
  }
  
  simpleTimer(ctx: any): MdTimerValue {
    const type =
      ctx.CountDirection && ctx.CountDirection[0].tokenType == Minus
        ? "down"
        : "up";
    const sources = [];
    if (ctx.CountDirection) {
      sources.push(ctx.CountDirection[0]);
    }
    sources.push(ctx.Time[0]);
    return new MdTimerValue(ctx.Time[0].image)    
  }
  
  labels(ctx: any): string[] {    
    return ctx.values;
  }

  numericValue(ctx: any): MdTimerValue {
    const value = ctx.Integer[0].image;
    return new MdRepetitionValue(Number(value));
  }

  stringValue(ctx: any): string {
    return ctx.Identifier[0].image;
  }
}
