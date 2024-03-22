import { Lexer, createToken } from "chevrotain";
import { test, expect } from "vitest";

class MdTimer {
    steps:MdSpan[] = []
 }

type MdSpan = {    
    start: number;
    end: number;
    step: TimeStep;

}

class TimeStep {
    constructor(private step?: number) {
    }    

    do(){
        return this.step || 1;
    }
}
    
const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });
const Integer = createToken({ name: "Integer", pattern: /\d+/ });
const Comma = createToken({ name: "Comma", pattern: /,/ });
const Colon = createToken({ name: "Colon", pattern: /:/ });

const CountDirection = createToken({ name: "CountDirection", pattern: Lexer.NA });
const Minus = createToken({ name: "Minus", pattern: /-/, categories: CountDirection });
const Plus = createToken({ name: "Plus", pattern: /\+/, categories: CountDirection});

const LabelOpen = createToken({ name: "LabelOpen", pattern: /\[/ });
const LabelClose = createToken({ name: "LabelClose", pattern: /\]/ });

let allTokens = [
    WhiteSpace,
    // "keywords" appear before the Identifier
    LabelOpen,
    LabelClose,
    Colon,
    CountDirection,
    Minus,
    Plus,
    Comma,
    // The Identifier must appear after the keywords because all keywords are valid identifiers.
    Identifier,
    Integer    
  ];  

  import { CstParser } from "chevrotain";
import { Result } from "postcss";

  // ----------------- parser -----------------
class MdTimerParse extends CstParser {
    constructor() {
        super(allTokens);
        const $ = this as any;

        // $.RULE("timer", () => {
        //     $.SUBRULE($.timerDirection);
        //     $.SUBRULE($.timeSpan);
        //     $.OPTION(() => {
        //         $.SUBRULE($.labels);
        //     });
        //     $.OPTION(() => {
        //         $.SUBRULE($.multiple);
        //     });
        // });

        $.RULE("timerExpression", () => {
            $.SUBRULE($.timerDirection);
            $.SUBRULE($.timeSpanExpression)
        })

        $.RULE("timerDirection", () => {
            $.OPTION(() => {
                $.CONSUME(CountDirection);            
            });
        })

        $.RULE("timeSpanExpression", () => {
            $.SUBRULE($.timeSpan)
        });

        $.RULE("timeSpan", () => {
            $.SUBRULE($.numericExpression, { LABEL: "lhs"});
            $.MANY(() => {
                $.CONSUME(Colon);
                $.SUBRULE2($.timeSpan)                    
            });
        });

        $.RULE("numericExpression", ()=> {
            $.CONSUME(Integer)
        })
        // $.RULE("labels", () => {})

        // $.RULE("parenthesisExpression", () => {
        //     $.CONSUME(LabelOpen);
        //     $.SUBRULE($.expression);
        //     $.CONSUME(LabelClose);
        //     });


        // $.RULE("multiple", () => {})
        $.performSelfAnalysis();
    }

}

const parser = new MdTimerParse() as any;

// ----------------- Interpreter -----------------
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

type TimeSegment = {
    current?: number;
    next?: TimeSegment;
}
class MdTimerInterpreter extends BaseCstVisitor {
    constructor() {
      super();
      // This helper will detect any missing or redundant methods on this visitor
            
      
      this.validateVisitor();
    }

    timerExpression(ctx: any) {
        let composer = new SegmentComposer();
        return{ 
            direction: ctx.timerDirection ? this.visit(ctx.timerDirection) : "countup", 
            timer: composer.compose(this.visit(ctx.timeSpanExpression))
        }
    }

    timerDirection(ctx:any) {                
        return ctx.CountDirection && ctx.CountDirection[0].tokenType == Minus 
            ? "countdown"
            : "countup";
    }

    timeSpanExpression(ctx: any) {        
        return this.visit(ctx.timeSpan);
    }

    timeSpan(cxt:any){                        
        let result:TimeSegment = {
           current : this.visit(cxt.lhs)
        };        
        if(cxt.timeSpan){
            result.next = this.visit(cxt.timeSpan)
        }                            
        return result;
    }

    numericExpression(ctx: any) {  
        const value = ctx.Integer[0].image;
        return Number(value);
    }
}

class SegmentComposer {
    
    compose(item:TimeSegment): Date{ 
        var result = this.c(item);
        while(result.length < 6) {
            result.push(0);
        }
        result = result.reverse();
        return new Date(result[0], result[1], result[2], result[3], result[4], result[5], 0)
    }
    
    private c(item: TimeSegment): number[] {
        if (!item.next) {
            return [item.current||0];
        }
        const result = this.c(item.next);
        result?.push(item.current || 0);
        return result;
    }
}

test(`ExpectingTokenToWork`, async () => {
    let SelectLexer = new Lexer(allTokens);    
    let inputText = "3:10:00";
    let { tokens } = SelectLexer.tokenize(inputText);
    parser.input = tokens;
    let cst = parser.timerExpression();            
    let visitor = new MdTimerInterpreter();
    let result = visitor.visit(cst)
    
    console.log(result);

  });

  test(`ExpectingTokenToWorkNegative`, async () => {
    let SelectLexer = new Lexer(allTokens);    
    let inputText = "-3:10:00";
    let { tokens } = SelectLexer.tokenize(inputText);
    parser.input = tokens;
    let cst = parser.timerExpression();            
    let visitor = new MdTimerInterpreter();
    let result = visitor.visit(cst)
    
    console.log(result);

  });


  test(`Composer can Build A Time From the value.`, () => {
    var item: TimeSegment = { current: 3, next: { current: 10, next: { current: 0 } } };
    var composer = new SegmentComposer();
    var result = composer.compose(item);    

    console.log(result);
    expect(result).toBeTruthy();
  });