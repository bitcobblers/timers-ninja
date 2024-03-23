import { Lexer, createToken } from "chevrotain";

export const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });
export const Integer = createToken({ name: "Integer", pattern: /\d+/ });
export const Comma = createToken({ name: "Comma", pattern: /,/ });
export const Colon = createToken({ name: "Colon", pattern: /:/ });

export const CountDirection = createToken({ name: "CountDirection", pattern: Lexer.NA });
export const Minus = createToken({ name: "Minus", pattern: /-/, categories: CountDirection });
export const Plus = createToken({ name: "Plus", pattern: /\+/, categories: CountDirection});

export const LabelOpen = createToken({ name: "LabelOpen", pattern: /\[/ });
export const LabelClose = createToken({ name: "LabelClose", pattern: /\]/ });

export const allTokens = [
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
