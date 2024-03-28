import { Duration } from "luxon";
import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";

const parser = new MdTimerParse() as any;
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class MdTimerInterpreter extends BaseCstVisitor {
    constructor() {
      super();
      // This helper will detect any missing or redundant methods on this visitor
            
      
      this.validateVisitor();
    }
    
    /// High level entry point, contains any number of simple of compound timers.
    timerMarkdown(ctx: any) {                
        const result = ctx.blocks.flatMap((block:any) => block && this.visit(block));        
        return result;
    }
    
    timerBlock(ctx:any) {                        
        const blocks = [];
        if (ctx.compoundTimer)
        {
            const outcome = this.visit(ctx.compoundTimer);        
            for (const index of outcome) {
                if (index != null) {
                    blocks.push(index)
                }
            }
        }
        if (ctx.simpleTimer) { 
            const singOutcome = this.visit(ctx.simpleTimer);            
            blocks.push(singOutcome);
        }
                        
        return blocks;
    }
    
    compoundTimer(ctx:any) {        
        // TODO needs to handle the timerMultiplier
        return ctx.blocks.map((block:any) => this.visit(block));
    }

    simpleTimer(ctx: any) {        
        // TODO needs to handle the timerMultiplier
        const direction = ctx.CountDirection && ctx.CountDirection[0].tokenType == Minus 
            ? "count down"
            : "count up";        
        return { 
            direction,
            timer: this.visit(ctx.timerValue)
        }
    }

    timerValue(cxt:any): Duration{                                        
        const segments = cxt.segments != null         
        ? cxt.segments.map((block:any) => this.visit(block)).reverse()
        : [];

        while(segments.length < 6) {
            segments.push(0);
        }

        return Duration.fromObject({
            'years': segments[5], 
            'months': segments[4], 
            'days': segments[3], 
            'hours': segments[2], 
            'minutes': segments[1], 
            'seconds': segments[0]});          
    }

    timerMultiplier(ctx:any) {        
        return ctx.valueExpression.map((value:any)=> this.visit(value));
    }
    multiplierValue(ctx:any) {        
        const outcome = [];
        if (ctx.numericExpression) {
            const count = this.visit(ctx.numericExpression);            
            for(let index = 0; index < count; index++) {
                outcome.push({label: '', index: index})
            }
        }

        if (ctx.labelExpression) {
            const label = this.visit(ctx.labelExpression);                        
            outcome.push({label: label});
        }        
        return outcome;
    }
       
    numericValue(ctx: any) : number {  
        const value = ctx.Integer[0].image;
        return Number(value);
    }
    
    stringValue(ctx:any): string {
        return ctx.Identifier[0].image;
    }  
}