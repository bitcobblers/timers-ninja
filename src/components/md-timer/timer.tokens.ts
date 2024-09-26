import { Lexer, createToken } from "chevrotain";
import { comma } from "postcss/lib/list";

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

export const Return = createToken({ name: "Return", pattern: /[\r\n]+/, group: Lexer.SKIPPED });

export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z]\w*/,
});

export const Integer = createToken({ name: "Integer", pattern: /\d+/ });
export const Multiplier = createToken({ name: "Multiplier", pattern: /\d+x/ });
export const Delimiter = createToken({
  name: "Delimiter",
  pattern: Lexer.NA,
});

export const Comma = createToken({ name: "Comma", pattern: /,/, categories: Delimiter });
export const Pipe = createToken({ name: "Pipe", pattern: /\|/, categories: Delimiter });
export const SemiColon = createToken({ name: "SemiColon", pattern: /;/, categories: Delimiter });


export const Weight = createToken({
  name: "Weight",
  pattern: Lexer.NA,
});

export const Pounds = createToken({ name: "LB", pattern: /lb/, categories: Weight });
export const Kelos = createToken({ name: "KG", pattern: /kg/, categories: Weight });
export const At = createToken({ name: "At", pattern: /@/});

export const CountDirection = createToken({
  name: "CountDirection",
  pattern: Lexer.NA,
});
export const Minus = createToken({
  name: "Minus",
  pattern: /-/,
  categories: CountDirection,
});
export const Plus = createToken({
  name: "Plus",
  pattern: /\+/,
  categories: CountDirection,
});

export const Time = createToken({ name: "Time", pattern: /(\d+)?(:\d+)?(:\d+)?(:\d+)/ });

export const allTokens = [
  WhiteSpace,
  Return,
  // "keywords" appear before the Identifier  
  Delimiter,
  Comma,
  Pipe,
  SemiColon,

  CountDirection,
  Minus,
  Plus,
  
  Multiplier,

  Weight,
  Kelos,
  Pounds,
  At,

  Time,  
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  
  Identifier,
  
  Integer,
];
