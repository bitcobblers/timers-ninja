import { Lexer } from "chevrotain";
import { allTokens } from "./timer.tokens";
import { MdTimerParse } from "./timer.parser";
import { MdTimerInterpreter } from "./timer.visitor";

export class MdTimerRuntime {
    lexer: Lexer;    
    visitor: MdTimerInterpreter;
    constructor() {
        this.lexer = new Lexer(allTokens);         
        this.visitor = new MdTimerInterpreter();
    }

    read(inputText: string) {
        const { tokens } = this.lexer.tokenize(inputText);
        const parser = new MdTimerParse(tokens) as any;        
        const cst = parser.markdownExpression();    
        const outcome = [];
        let raw = this.visitor.visit(cst);
        do {
            outcome.push(raw.current);
            raw = raw.next;
        }
        while (raw)

        return  {
            source: inputText,
            tokens,
            parser,
            syntax: cst,
            outcome       
        };
    }
}