import path from 'path';
import fs from 'fs';
import * as tsc from 'typescript';
import { glob } from 'glob';
import merge from 'ts-deepmerge';

import { NPMPackage } from './iface';

export default class NPMPackageJSONGenerator {
  private absolutePathToDependencies: string;
  private dependencyFilesGlob = 'npm*.ts';
  private absolutePathToDependencyFilesGlob = '';

  constructor(absolutePathToDependenciesArg?: string) {
    this.absolutePathToDependencies = absolutePathToDependenciesArg ? absolutePathToDependenciesArg : process.cwd();

    if (!fs.existsSync(this.absolutePathToDependencies)) {
      throw Error(`ts-npm failed!: ${this.absolutePathToDependencies} is not a valid path`);
    }

    if (!fs.lstatSync(this.absolutePathToDependencies).isDirectory()) {
      throw Error(`ts-npm failed!: ${this.absolutePathToDependencies} is not a valid directory`);
    }
    
    console.debug('will check supplied dir for npm*.ts files');
  
    if (this.absolutePathToDependencies.at(-1) === '/') {
      this.absolutePathToDependencyFilesGlob = `${this.absolutePathToDependencies}${this.dependencyFilesGlob}`;
    } else {
      this.absolutePathToDependencyFilesGlob = `${this.absolutePathToDependencies}/${this.dependencyFilesGlob}`;
    }
  }

  async generatePackageJSON(): Promise<void> {
    const npmPackageDefs = await glob.glob(this.absolutePathToDependencyFilesGlob, {
      ignore: 'node_modules/**'
    });
    console.debug('npmPackageDefs', npmPackageDefs);

    const npmPackageDefAbsolutePaths = npmPackageDefs.map(npmPackageDef => path.resolve(process.cwd(), npmPackageDef));
  
    this.mergePackageDefs(npmPackageDefAbsolutePaths);
  }

  private mergePackageDefs(npmPackageDefAbsolutePaths: string[]) {
    console.debug('npmPackageDefAbsolutePaths', npmPackageDefAbsolutePaths);
    
    const npmPackageJSON = npmPackageDefAbsolutePaths
      .map(npmPackageDefAbsolutePaths => this.loadNPMPackageDef(npmPackageDefAbsolutePaths))
      .map(npmPackage => this.generateJSON(npmPackage))
      .reduce((combo, item) => { return merge(item, combo); }, {});
  
    console.debug('package.json', npmPackageJSON);
    console.debug(`saving json to ${process.cwd()}/package.json`);
  
    fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(npmPackageJSON, null, 2));
  }
  
  private loadNPMPackageDef(npmPackageDefAbsolutePath: string): NPMPackage {
    console.debug('loadNPMPackageDef', npmPackageDefAbsolutePath);
  
    const code = fs.readFileSync(npmPackageDefAbsolutePath).toString();
    console.debug('code', code);

    const result = tsc.transpile(code);
    console.debug(result);
    const module: any = eval(result);

    console.debug('module', module);
    console.debug('module.npmPackage', module.npmPackage);
  
    return module.npmPackage;
  }

  private generateJSON(npmPackage: NPMPackage): any {
    console.debug('generateJSON', npmPackage);

    const deps = npmPackage.dependencies || {};
    const devDeps = npmPackage.devDependencies || {};

    for (const dep in deps) {
      const depVersion = deps[dep];

      if (dep.includes('@types/')) {
        devDeps[dep] = depVersion;

        delete deps[dep];
      }
    }

    const json = { '@comment': `This file was generated from ${this.absolutePathToDependencyFilesGlob} .`, ...npmPackage };
    json.dependencies = deps;
    json.devDependencies = devDeps;

    return json;
  }
}