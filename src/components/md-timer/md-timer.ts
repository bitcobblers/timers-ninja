import type { IToken, CstNode } from "chevrotain";
import { Lexer } from "chevrotain";
import { allTokens } from "./timer.tokens";
import { MdTimerParse } from "./timer.parser";
import type { MDTimerCommand } from "./timer.types";
import { MdTimerInterpreter } from "./timer.visitor";
import { MDRuntimeEvent, MDRuntimeContext, RuntimeEventHandler } from "./md-timer-runtime";

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
    const { tokens } = this.lexer.tokenize(inputText);
    const parser = new MdTimerParse(tokens) as any;

    const cst = parser.timerMarkdown();
    const raw = cst != null ? this.visitor.visit(cst) : ([] as MDTimerCommand[]);
    return {
      source: inputText,
      tokens,
      parser,
      syntax: cst,
      outcome: raw,
    };
  }
}

export class MdTimerRuntime {
  constructor(private script: MDTimerCommand[], private handlers: RuntimeEventHandler[]) {

  }

  public Context: MDRuntimeContext | undefined = undefined;  
  next(evnt: MDRuntimeEvent): undefined | MDTimerInstance {
    if (this.Context == undefined) { return; }
    for (let index = 0; index < this.handlers.length; index++) {
      const handler = this.handlers[index];
      if (handler.handles !== evnt.type) {
        continue;
      }

      handler.apply(this.Context, evnt);
    }

    return this.script[0];
  }
}
export type MDTimerInstance = MDTimerCommand & {}