#!/usr/bin/env node
import path from 'path';
import NPMPackageJSONGenerator from './NPMPackageJSONGenerator';
import fs from 'fs';
import * as ts from 'typescript';
import { NPMPackage } from './types';
import glob from 'glob';
import merge from 'ts-deepmerge';

const generatePackageJSON = async (npmPackageDefs: string[]) => {
  console.debug('generating package.json from npm package defs', npmPackageDefs);
  
  const npmPackageJSON = npmPackageDefs
    .map(npmPackageDef => loadNPMPackageDef(npmPackageDef))
    .map(npmPackage => new NPMPackageJSONGenerator(npmPackage).json)
    .reduce((combo, item) => { return merge(item, combo); }, {});

  console.debug('package.json', npmPackageJSON);
  console.debug(`saving json to ${process.cwd()}/package.json`);

  fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(npmPackageJSON, null, 2));
}

const loadNPMPackageDef = (moduleDefPath: string): NPMPackage => {
  console.debug('loadNPMPackageDef', moduleDefPath);

  const code = fs.readFileSync(moduleDefPath).toString();
  const result = ts.transpile(code);
  const module: any = eval(result);

  console.debug('module', module);
  console.debug('module.npmPackage', module.npmPackage);

  return module.npmPackage;
}

glob.glob('npm*.ts', {}, (error, npmPackageDefs) => {
  if (error) { throw new Error('ts-npm failed!', error); }

  npmPackageDefs = npmPackageDefs.map(npmPackageDef => path.resolve(process.cwd(), npmPackageDef));

  generatePackageJSON(npmPackageDefs);
});