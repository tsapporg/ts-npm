// This file is responsible for defining the NPM package and the application's common dependencies b/t most packages,
//  which mostly amounts to lots of development-related packages. See: https://github.com/tsapporg/ts-npm
const npmPackage: any = {
  name: 'test-project',
  version: '0.0.1',
  private: false,
  type: 'module',
  engines : { 
    node: '>=20.0.0'
  },
  license: 'MIT-0',
  dependencies: {
    'dotenv': '16.4.5', // Used for bringing in data from the `./config/.env` file.
  },
  devDependencies: {
    'typescript': '5.2.2',
    '@types/node': '20.10.0',
    'tsx': '4.19.1', // Used for TypeScript execution, starting to move to this if ts-node fails.
    'tslib': '2.4.0'
  }
}

export default { npmPackage }