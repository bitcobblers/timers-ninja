import type { IToken } from "chevrotain";
import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";
import { Duration } from "luxon";

const parser = new MdTimerParse() as any;
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class MdTimerSignificant {
    private order = [
        { key: "years", max : 10 },
        { key: "months", max : 12 },
        { key: "days", max : 31 },
        { key: "hours", max : 24 },
        { key: "minutes", max : 60 },
        { key: "seconds", max : 60 }
    ];
    private obj: MdTimerOptional;
    private digits: string;
    constructor(private value?: MdTimerValue, min?: string[]) {
        const _min = ["seconds", ...(min || [])]
        let found = false;
        const list = [];
        this.obj = {} as any;
        for (const index of this.order) {            
            const val = value ? (this.value as any)[index.key] : 0;                        
            if (val != 0) {
                found = true;
            }

            if (found || _min.includes(index.key)) {                                
                list.push(val.toString());
                (this.obj as any)[index.key] = val;
            }            
        }   
        let carry = 0;
        for (const index of this.order.reverse()) {
            let val = (this.obj as any)[index.key];
            if (carry > 0) {
                val = (val || 0) + carry;
            }
            if (!val) { continue; }
            carry = Math.floor(val / index.max);
            val = val % index.max;
            (this.obj as any)[index.key] = val;
        }      

        this.digits = list.map(item => item.length < 2 ? "0" + item : item).join(":");
    }
    toDigits():string {
        return this.digits;
    }
    toString():string {
        return Duration.fromObject(this.toObject()).toHuman({unitDisplay: "short"});
    }
    toObject():MdTimerOptional {
        return this.obj;
    }
}


export type MdTimerOptional= {
    years?: number,
    months?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number 
}
export type MdTimerValue = {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number 
}

export type MdTimerBlock = {
    timer:MdTimerValue,
    type: {
        step: number,
        label: string
    },
    round?: number,
    label?: string
    sources: IToken[]
}

export class MdTimerInterpreter extends BaseCstVisitor {
    constructor() {
      super();
      // This helper will detect any missing or redundant methods on this visitor
            
      
      this.validateVisitor();
    }
    
    /// High level entry point, contains any number of simple of compound timers.
    timerMarkdown(ctx: any) : MdTimerBlock[] {                
        const result = ctx.blocks.flatMap((block:any) => block && this.visit(block)) as MdTimerBlock[];        
        return result;
    }
    
    timerBlock(ctx:any) {                                        
        const blocks = [];
        if (ctx.compoundTimer || ctx.simpleTimer)
        {
            const outcome = this.visit(ctx.compoundTimer || ctx.simpleTimer).flat(Infinity);        
            const labels = ctx.timerMultiplier 
            ? this.visit(ctx.timerMultiplier) 
            : [ { round:1, label: '' }]            
            for (const label of labels) {
                for (const index of outcome) {                
                    if (index != null) {                    
                        blocks.push({ ...index, 
                            label : index.label ? label.label + " - " + index.label
                            : label.label
                        })
                    }
                }
            }
        }
                        
        return blocks;
    }
    
    compoundTimer(ctx:any) {                       
        return ctx.blocks
            .map((block:any) => this.visit(block));
    }

    simpleTimer(ctx: any): MdTimerBlock[] {                        
        const type = ctx.CountDirection && ctx.CountDirection[0].tokenType == Minus 
            ? {label: "down", step: -1 }
            : {label: "up", step: 1 };        
        const sources = [];
        if(ctx.CountDirection) {
            sources.push(ctx.CountDirection[0]);
        }
        for (const segment of ctx.timerValue[0].children.segments)
        {
            sources.push(segment.children.Integer[0]);            
        }
        return [{ 
            type,
            timer: this.visit(ctx.timerValue),
            sources
        }]
    }

    timerValue(cxt:any): any{                                        
        const segments = cxt.segments != null         
        ? cxt.segments.map((block:any) => this.visit(block)).reverse()
        : [];

        while(segments.length < 6) {
            segments.push(0);
        }

        return {
            'years': segments[5], 
            'months': segments[4], 
            'days': segments[3], 
            'hours': segments[2], 
            'minutes': segments[1], 
            'seconds': segments[0]};          
    }

    timerMultiplier(ctx:any) {        
        return ctx.multiplierValue?.flatMap((value:any)=> this.visit(value)) || [];
    }
    multiplierValue(ctx:any) {        
        const outcome = [];
        if (ctx.numericValue) {
            const count = this.visit(ctx.numericValue);            
            for(let index = 0; index < count; index++) {
                outcome.push({label: 'Round '+ (index + 1), index: index})
            }
        }

        if (ctx.stringValue) {
            const label = this.visit(ctx.stringValue);                        
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