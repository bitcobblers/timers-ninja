import type { IToken } from "chevrotain";
import { CstParser } from "chevrotain";
import { Colon, CountDirection, GroupClose, GroupOpen, Identifier, Integer, allTokens } from "./timer.tokens";

export class MdTimerParse extends CstParser {
    constructor(tokens?: IToken[]) {
        super(allTokens);
        const $ = this as any;       
        
        $.RULE("markdown",()=> {                        
            $.MANY(() => {                
                $.SUBRULE($.markdownBlock, { LABEL: "blocks"})
            })
        });

        $.RULE("markdownBlock", () => {
            $.OR([
                { ALT: () => $.SUBRULE($.timerExpression) },
                { ALT: () => $.SUBRULE($.compoundExpression) },
            ]);                
        });
        
        $.RULE("compoundExpression", () => {
            $.CONSUME(GroupOpen);                 
            $.MANY(() => {                
                $.SUBRULE($.markdownBlock, { LABEL: "blocks"})
            })         
            $.CONSUME(GroupClose);
        });

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
                $.SUBRULE2($.timeSpan, { LABEL: "rhs"})                    
            });
        });

        $.RULE("numericExpression", ()=> {
            $.CONSUME(Integer)
        })

        $.RULE("labelExpression", () => {
            $.CONSUME(Identifier)
        })
        
        $.performSelfAnalysis();

        if (tokens) {
            this.input = tokens;
        }
    }
}