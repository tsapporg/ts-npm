declare class ArgParser {
    readonly args: CLIArgs;
    constructor();
}
interface CLIArgs {
    readonly action?: string;
    readonly 'absolute-path-to-dependencies'?: string;
    readonly help?: boolean;
}
declare const argparser: ArgParser;
export { argparser };
//# sourceMappingURL=argparser.d.ts.map