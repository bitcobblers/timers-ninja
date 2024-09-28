import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";
import { MdRepetitionValue, MDTimerEntry, MDTimerEntryType, MdTimerValue, MdWeightValue, type MDTimerCommand } from "./timer.types";

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
    const newCommand = (line: number) => {      
      const newCmd = {
        line,
        label: "test",
        repeater: {},
        sources: [],
        children: [],
        metrics: [] 
      };
      commands.push(newCmd);
      return newCmd;
    }
    let current = undefined as undefined | MDTimerCommand;   
    for (let block of ctx.blocks) {
      var entry = this.visit(block);
      var entryLine = Math.min(...entry.sources.map((e: any) =>e.endLine));
      if ((current?.line || 0) != entryLine) {
        current = newCommand(entryLine);
      }
      current?.metrics.push(entry);
    }
    return commands;
  }  

  timerBlock(ctx: any) {    
    const blocks = [] as MDTimerCommand[];                
    if (ctx.simpleTimer) {       
      return this.visit(ctx.simpleTimer)      

    }
    if (ctx.resistance) {
      return this.visit(ctx.resistance);
    }

    // const labels = ctx.labels[0].children.lenght > 0 
    //   ? ctx.labels[0].children 
    //   : [null];

    // for (const label of labels)                    
    // { 
    //   const value = label == null 
    //     ? "" 
    //     : this.visit(label);
        
    //   blocks.push({
    //         label: value,
    //         metrics: tracker !== undefined ? [ tracker ] : [],
    //         repeater: {}, 
    //         children: [],
    //         sources: []
    //     });
    // }             
    return blocks;
  }
  
  resistance(ctx: any) {
    if (ctx.resitanceShort) {
      return this.visit(ctx.resitanceShort)
    }
    if (ctx.value) {
      return this.visit(ctx.resitanceShort)
    }
    
    return this.visit(ctx.resistanceLong)      
  }
  
  resitanceShort(ctx: any) {
    return new MdWeightValue("LB", Number(ctx.Integer[0].image), [ctx.Integer[0]])
  }

  resistanceValue(ctx: any) {
    return new MdWeightValue(ctx.Kelos ? "KG" : "LB", Number(ctx.Integer[0].image),[ctx.Integer[0]])
  }
  
  resistanceLong(ctx: any) {
    return ctx.resistance(ctx);
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
    return new MdTimerValue(ctx.Time[0].image, type, sources);
  }
  
  labels(ctx: any): string[] {    
    return ctx.values;
  }

  numericValue(ctx: any): MdTimerValue {
    const value = ctx.Integer[0].image;
    return new MdRepetitionValue(Number(value), [ctx.Integer[0]]);
  }

  stringValue(ctx: any): string {
    return ctx.Identifier[0].image;
  }
}
