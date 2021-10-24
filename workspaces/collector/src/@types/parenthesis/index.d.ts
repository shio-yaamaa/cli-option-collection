declare module 'parenthesis' {
  interface ParseOptions {
    brackets?: string[];
    flat?: boolean;
    escape?: string;
  }

  interface StringifyOptions {
    flat?: boolean;
    escape?: string;
  }

  type ParseFunction = (string: string, options?: ParseOptions) => any[];

  interface ParseInterface {
    stringify: (tokens: any[], options?: StringifyOptions) => string;
  }

  var parse: ParseFunction & ParseInterface;
  export default parse;
}
