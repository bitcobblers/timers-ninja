import type { IToken } from "chevrotain";
import { CstParser } from "chevrotain";
import { Colon, Comma, CountDirection, GroupClose, GroupOpen, Identifier, Integer, LabelClose, LabelOpen, allTokens } from "./timer.tokens";

export class MdTimerParse extends CstParser {
    constructor(tokens?: IToken[]) {
        super(allTokens);
        const $ = this as any;       
        
        $.RULE("timerMarkdown",()=> {                        
            $.MANY(() => {                
                $.SUBRULE($.timerBlock, { LABEL: "blocks"})
            })
        });

        $.RULE("timerBlock", () => {
            $.OR([                
                { ALT: () => $.SUBRULE($.compoundTimer) },
                { ALT: () => $.SUBRULE($.simpleTimer) }
            ]);                                
        });
        
        $.RULE("compoundTimer", () => {
            $.CONSUME(GroupOpen);                 
            $.MANY(() => {                
                $.SUBRULE($.timerBlock, { LABEL: "blocks"})
            })         
            $.CONSUME(GroupClose);
            $.OPTION(() => {
            $.SUBRULE($.timerMultiplier)
            })
        });
       
    $.RULE("simpleTimer", () => {
            $.SUBRULE($.directionValue);
            $.SUBRULE($.timerValue)
            $.OPTION(() => {
            $.SUBRULE($.timerMultiplier)
            })
        })

    $.RULE("timerValue", () => {            
            $.MANY_SEP({
                SEP: Colon,
                DEF: () => {
                $.SUBRULE($.numericValue, { LABEL: "segments"})
                }                    
            });
        });

    
    $.RULE("timerMultiplier", ()=> {
            $.CONSUME(LabelOpen)
            $.MANY_SEP({
                SEP: Comma,
                DEF: () => {
                $.SUBRULE($.multiplierValue, {label: "values"});
                },
              });
            $.CONSUME(LabelClose)
        });
    
        $.RULE("multiplierValue", ()=> {
            $.OR([
                { ALT: () => $.SUBRULE($.numericValue) },
                { ALT: () => $.SUBRULE($.stringValue) },
            ]);  
        })
    
        $.RULE("numericValue", ()=> {
          $.CONSUME(Integer)
        })

        $.RULE("stringValue", () => {
            $.CONSUME(Identifier)
        })
        $.RULE("directionValue", () => {
          $.OPTION(() => {
            $.CONSUME(CountDirection);            
          });
        })
        
        $.performSelfAnalysis();

        if (tokens) {
            this.input = tokens;
        }
    }
}