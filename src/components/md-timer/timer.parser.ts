import type { IToken } from "chevrotain";
import { CstParser } from "chevrotain";
import {  
  CountDirection,
  Delimiter,
  Identifier,
  Integer,  
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
        { ALT: () => $.SUBRULE($.numericValue) },
        { ALT: () => $.SUBRULE($.simpleTimer) },
      ]);            
      $.OPTION(() => {
        $.SUBRULE($.labels);
      });      
    });
    
    $.RULE("simpleTimer", () => {
      $.OPTION(() => {
        $.CONSUME(CountDirection, { label: "directionValue" });
      });
      $.CONSUME(Time);
    });
    
    $.RULE("labels", () => {
      $.MANY_SEP({
        SEP: Delimiter,
        DEF: () => {
          $.MANY(() => {
            $.SUBRULE($.stringValue, { label: "values" });
          });
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
