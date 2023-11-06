#!/usr/bin/env node
import { argparser } from './argparser';
import NPMPackageJSONGenerator from './NPMPackageJSONGenerator';

(async () => {
  await new NPMPackageJSONGenerator(argparser.args['absolute-path-to-dependencies']).generatePackageJSON();
})();