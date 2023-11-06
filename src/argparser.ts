// This file is responsible for parsing command-line arguments passed to the utility.
import { parse } from 'ts-command-line-args';

class ArgParser {
  readonly args: CLIArgs;
  
  constructor() {
    console.debug('argv', process.argv); 

    this.args = parse<CLIArgs>(
      {
        action: { type: String, optional: true, description: 'install|generate (package.json)' },
        'absolute-path-to-dependencies': { type: String, optional: true, description: 'Absolute path to npm*.ts file(s) or directory containing.' },

        help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide' },
      },
      {
        helpArg: 'help',
        headerContentSections: [{ header: 'Usage', content: 'ts-npm --action=install --absolute-path-to-dependencies=/path/to/npm.ts (file) or ts-npm --absolute-path-to-dependencies=/path/to/.npm (directory)' }]
      }
    );

    console.debug('args', this.args);
  }
}

interface CLIArgs {
  readonly action?: string;
  readonly 'absolute-path-to-dependencies'?: string;

  readonly help?: boolean;
}

const argparser = new ArgParser();

export { argparser }