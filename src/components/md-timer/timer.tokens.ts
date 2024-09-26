import { Lexer, createToken } from "chevrotain";

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

export const Return = createToken({ name: "Return", pattern: /[\r\n]+/ });

export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z]\w*/,
});

export const Integer = createToken({ name: "Integer", pattern: /\d+/ });
export const Comma = createToken({ name: "Comma", pattern: /,/ });
export const Colon = createToken({ name: "Colon", pattern: /:/ });

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

export const Time = createToken({ name: "Time", pattern: /(\d+)?(:\d+)?(:\d+)?(:[\d\?]+)/ });
export const Question = createToken({name: "Question", pattern: /\?/ });

export const GroupOpen = createToken({ name: "LabelOpen", pattern: /\[/ });
export const GroupClose = createToken({ name: "LabelClose", pattern: /\]/ });

export const LabelOpen = createToken({ name: "LabelOpen", pattern: /\(/ });
export const LabelClose = createToken({ name: "LabelClose", pattern: /\)/ });

export const allTokens = [
  WhiteSpace,
  Return,
  // "keywords" appear before the Identifier
  GroupOpen,
  GroupClose,

  LabelOpen,
  LabelClose,
  Colon,
  CountDirection,
  Minus,
  Plus,
  Comma,
  Weight,
  Kelos,
  Pounds,
  At,
  Time,  
  Question,  
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
];
