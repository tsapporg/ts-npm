const npmPackage: any = {
  name: 'ts-npm',
  version: '0.0.0',
  description: 'Manage package.json files in Typescript npm*.ts files.',
  repository: {
    type: 'git',
    url: 'https://github.com/tsapporg/ts-npm'
  },
  private: false,
  license: 'MIT',
  type: 'module',
  dependencies: {
    'ts-command-line-args': '2.5.1',
    'glob': '10.3.10',
    '@types/glob': '8.1.0',
    'ts-deepmerge': '6.2.0',
    'tslib': '2.4.0',
    'typescript': '5.2.2'
  },
  devDependencies: { 
    // See npm.shared.ts
  },
  scripts: {},
  bin: {
    'ts-npm': './ts-npm.sh'
  },
  files: [
    './src/',
    './dist/',
    './ts-npm.sh',
    './tsconfig.json',
    './config/'
  ]
}

export default { npmPackage }