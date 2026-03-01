// This file is responsible for defining frontend specific dependencies. See: https://github.com/tsapporg/ts-npm
const npmPackage: any = {
  dependencies: {
    'drawing-tool': '2.3.2', // Used for drawing.
  },
  devDependencies: {
    'local-web-server': '5.4.0' // Used to serve website locally for development.
  }
}

export default { npmPackage }