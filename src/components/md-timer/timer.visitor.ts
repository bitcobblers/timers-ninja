import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";
import { SegmentComposer, type TimeSegment } from "./timer.types";

const parser = new MdTimerParse() as any;
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class MdTimerInterpreter extends BaseCstVisitor {
    constructor() {
      super();
      // This helper will detect any missing or redundant methods on this visitor
            
      
      this.validateVisitor();
    }

    markdownExpression(ctx: any) {
        return [this.visit(ctx.timerExpression)]
    }

    timerExpression(ctx: any) {
        const composer = new SegmentComposer();
        return { 
            direction: ctx.timerDirection ? this.visit(ctx.timerDirection) : "count up", 
            timer: composer.compose(this.visit(ctx.timeSpanExpression))
        }
    }

    timerDirection(ctx:any) {                
        return ctx.CountDirection && ctx.CountDirection[0].tokenType == Minus 
            ? "count down"
            : "count up";
    }

    timeSpanExpression(ctx: any) {        
        return this.visit(ctx.timeSpan);
    }

    timeSpan(cxt:any): TimeSegment{                        
        return {
           current : this.visit(cxt.lhs),
           next: cxt.timeSpan && this.visit(cxt.timeSpan)
        };
    }

    numericExpression(ctx: any) {  
        const value = ctx.Integer[0].image;
        return Number(value);
    }
}