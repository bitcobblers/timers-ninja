import type { IToken, CstNode } from "chevrotain";
import { Lexer } from "chevrotain";
import { allTokens } from "./timer.tokens";
import { MdTimerParse } from "./timer.parser";
import type { MDTimerCommand } from "./timer.types";
import { MdTimerInterpreter } from "./timer.visitor";
import { unescape } from "querystring";

export type MdTimeRuntimeResult = {
  source: string;
  tokens: IToken[];
  parser: any;
  syntax: CstNode;
  outcome: MDTimerCommand[];
};

export class MdTimerCompiler {
  lexer: Lexer;
  visitor: MdTimerInterpreter;
  constructor() {
    this.lexer = new Lexer(allTokens);
    this.visitor = new MdTimerInterpreter();
  }

  read(inputText: string): MdTimeRuntimeResult {
    // console.log("INPUT: ", inputText);
    const { tokens } = this.lexer.tokenize(inputText);
    const parser = new MdTimerParse(tokens) as any;

    const cst = parser.timerMarkdown();
    const raw = cst != null ? this.visitor.visit(cst) : ([] as MDTimerCommand[]);
    // console.log("Raw: ", raw);
    return {
      source: inputText,
      tokens,
      parser,
      syntax: cst,
      outcome: raw,
    };
  }
}

export type MdTimerContext = {}
export class MdTimerRuntime {
  constructor(private script: MDTimerCommand[])
  {
  }

   next(context: MdTimerContext): undefined | MDTimerInstance{    
    return this.script[0];
   }
}
export type MDTimerInstance = MDTimerCommand & {}