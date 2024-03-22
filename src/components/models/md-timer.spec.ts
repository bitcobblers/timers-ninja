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
const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ });
const Comma = createToken({ name: "Comma", pattern: /,/ });
const Collon = createToken({ name: "Collon", pattern: /:/ });

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
    Collon,
    Minus,
    Plus,
    Comma,
    // The Identifier must appear after the keywords because all keywords are valid identifiers.
    Identifier,
    Integer    
  ];  

  import { CstParser } from "chevrotain";
import { as } from "vitest/dist/reporters-5f784f42";

  // ----------------- parser -----------------
class MdTimerParse extends CstParser {
    constructor() {
        super(allTokens);
        const $ = this as any;

        $.RULE("timer", () => {
            $.SUBRULE($.timerDirection);
            $.SUBRULE($.timeSpan);
            $.OPTION(() => {
                $.SUBRULE($.labels);
            });
            $.OPTION(() => {
                $.SUBRULE($.multiple);
            });
        });

        $.RULE("timerDirection", () => {
            $.OR([
                { ALT: () => $.OPTION(() => {
                    $.CONSUME(Plus)
                }) },
                { ALT: () => $.CONSUME(Minus) },
            ]);
        })

        $.RULE("additionExpression", () => {
            $.SUBRULE($.multiplicationExpression, { LABEL: "lhs" });
            $.MANY(() => {
              // consuming 'AdditionOperator' will consume either Plus or Minus as they are subclasses of AdditionOperator
              $.CONSUME(AdditionOperator);
              //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
              $.SUBRULE2($.multiplicationExpression, { LABEL: "rhs" });
            });
            });
        


        $.RULE("timeSpan", () => {})
        $.RULE("labels", () => {})

        $.RULE("parenthesisExpression", () => {
            $.CONSUME(LabelOpen);
            $.SUBRULE($.expression);
            $.CONSUME(LabelClose);
            });


        $.RULE("multiple", () => {})
        $.performSelfAnalysis();
    }

}


test(`ExpectingTokenToWork`, async () => {
    let SelectLexer = new Lexer(allTokens);    
    let inputText = "-1:00[pushup]";
    let lexingResult = SelectLexer.tokenize(inputText);

    console.log(lexingResult.tokens);
    expect(lexingResult.tokens.length).toBe(8);
  });
