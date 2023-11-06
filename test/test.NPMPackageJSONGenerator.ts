
import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import * as fs from 'fs';

import NPMPackageJSONGenerator from '../src/NPMPackageJSONGenerator';

describe('test.NPMPackageJSONGenerator', async () => {
  before(async () => {
    if (fs.existsSync(`${process.cwd()}/package.json`)) { 
      fs.cpSync(`${process.cwd()}/package.json`, `${process.cwd()}/package.backup.json`);
      fs.rmSync(`${process.cwd()}/package.json`);
    }
  });

  after(async () => {
    fs.cpSync(`${process.cwd()}/package.backup.json`, `${process.cwd()}/package.json`);
    fs.rmSync(`${process.cwd()}/package.backup.json`);
  });

  it('tests NPMPackageJSONGenerator', async (_t) => {
    await new NPMPackageJSONGenerator(`${process.cwd()}/npm.ts`).generatePackageJSON();
     
    if (!fs.existsSync(`${process.cwd()}/package.json`)) { 
      throw Error('package.json was not generated, using backup');
    }

    assert.equal(fs.existsSync(`${process.cwd()}/package.json`), true);
  });
});