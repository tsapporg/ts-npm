// This file is responsible for defining shared dependencies across all packages,
//  including the package this is copied from, _ts-app-devkit.
// It gets copied into all TSAPP packages during setup.
// You can run `make packages/install` after updating this file in the _ts-app-devkit package 
//  to update downstream shared dependencies for TSAPP packages,
//  or just `make packages/copy-shared-files` to copy the files to other TSAPP packages.
const npmPackage: any = {
  dependencies: {},
  devDependencies: {
    'typescript': '5.2.2',
    '@types/node': '18.16.0',
    'ts-node': '10.9.1',
    'tslib': '2.4.0',

    // Cross-platform build support:
    'shx': '0.3.4', // Used to invoke cross-platform build commands.
    'del': '5.0.0', // Used for cross-platform rm.
    'cross-env': '5.2.1', // Used to set cross-platform env variables.
    'concurrently': '7.5.0', // Used to invoke multiple watch commands concurrently.
    'nodemon': '2.0.20', // Used to watch for source changes.
    'onchange': '7.1.0', // Used to watch for source changes.

    'esbuild': '0.16.7' // Used to bundle scripts and their dependencies.
  }
}

export default { npmPackage }