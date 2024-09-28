import type { IToken } from "chevrotain";
import { CstParser } from "chevrotain";
import {  
  At,
  CountDirection,
  Delimiter,
  Identifier,
  Integer,  
  Kelos,  
  Pounds,  
  Return,  
  Time,
  allTokens,
} from "./timer.tokens";

export class MdTimerParse extends CstParser {
  constructor(tokens?: IToken[]) {
    super(allTokens);
    const $ = this as any;

    $.RULE("timerMarkdown", () => {     
      $.MANY(() => {
        $.SUBRULE($.timerBlock, { LABEL: "blocks" });
      });      
    });

    $.RULE("timerBlock", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.resistance,) },
        { ALT: () => $.SUBRULE($.simpleTimer) },
        { ALT: () => $.SUBRULE($.labels) },
      ]);                  
    });      

    $.RULE("resistance", () => {
      $.OR([        
        { ALT: () => $.SUBRULE($.resistanceLong) },                   
        { ALT: () => $.SUBRULE($.resistanceValue) },
        { ALT: () => $.SUBRULE($.resitanceShort) }
      ]);
    });

    $.RULE("resistanceLong", () => {      
      $.CONSUME(At)
      $.CONSUME(Integer)
      $.OR([
        { ALT: () => $.CONSUME(Kelos) },        
        { ALT: () => $.CONSUME(Pounds) },
      ])
    })  

    $.RULE("resistanceValue", () => {      
      $.CONSUME(Integer)
      $.OR([
        { ALT: () => $.CONSUME(Kelos) },        
        { ALT: () => $.CONSUME(Pounds) },
      ])
    })
    
    $.RULE("resitanceShort", () => {    
      $.CONSUME(At)
      $.CONSUME(Integer)
    })

    $.RULE("simpleTimer", () => {
      $.OPTION(() => {
        $.CONSUME(CountDirection, { label: "directionValue" });
      });
      $.CONSUME(Time);
    });
    
    $.RULE("labels", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: Delimiter,
        DEF: () => {          
            $.SUBRULE($.label);          
        },
      });
    });

    $.RULE("label", () => {
      $.AT_LEAST_ONE({      
        DEF: () => {          
          $.SUBRULE($.stringValue);          
        },
      });
    });

    $.RULE("numericValue", () => {
      $.CONSUME(Integer);
    });

    $.RULE("stringValue", () => {
      $.CONSUME(Identifier);
    });

    $.performSelfAnalysis();

    if (tokens) {
      this.input = tokens;
    }
  }
}