// This file is responsible for defining shared dependencies across all packages.
// It gets copied into all TSAPP packages during setup.
// You can run `make packages/install` after updating this file to update downstream dependencies for TSAPP packages.
const npmPackage: any = {
  dependencies: {},
  devDependencies: {
    'typescript': '4.8.4',
    '@types/node': '18.11.18',
    'ts-node': '10.9.1',

    // Cross-platform build support:
    'shx': '0.3.4', // Used to invoke cross-platform build commands.
    'del': '5.0.0', // Used for cross-platform rm.
    'cross-env': '5.2.1' // Used to set cross-platform env variables.
  }
}

export default { npmPackage }