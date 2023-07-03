import { NPMPackage } from './types';

export default class NPMPackageJSONGenerator {
  json: any;

  constructor(npmPackage: NPMPackage) {
    console.debug('npmPackage', npmPackage);

    const deps = npmPackage.dependencies || {};
    const devDeps = npmPackage.devDependencies || {};

    for (const dep in deps) {
      const depVersion = deps[dep];

      if (dep.includes('@types/')) {
        devDeps[dep] = depVersion;

        delete deps[dep];
      }
    }

    this.json = { '@comment': `This file was generated from npm*.ts .`, ...npmPackage };
    this.json.dependencies = deps;
    this.json.devDependencies = devDeps;
  }
}