import type { IToken } from "chevrotain";
import { CstParser } from "chevrotain";
import { Colon, CountDirection, Integer, allTokens } from "./timer.tokens";

export class MdTimerParse extends CstParser {
    constructor(tokens?: IToken[]) {
        super(allTokens);
        const $ = this as any;       

        $.RULE("markdownstep",()=> {
        })

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
        
        $.performSelfAnalysis();

        if (tokens) {
            this.input = tokens;
        }
    }
}