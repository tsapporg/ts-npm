# ts-npm 
Use Typescript to define your NPM package.

This source code is experimental and therefore unpublished on NPM; install directly from Github.

ts-npm uses root-level npm*.ts files to generate the package(-lock).json file(s) and then install the dependencies. ts-npm is experimental, but it:
- Allows you to add comments in a sane manner (no @comment in package.json files)
- Allows you to include platform business logic in the your dependencies file when using libraries that are not cross-platform
- Allows you to group dependencies to your liking in this file (no auto-sorting) and also in separate files (separate files are combined into 1 package.json file)
- Automatically moves `/types`-suffixed packages from 'development' to 'production' if you grouped them together

## Background
Basically [this](https://frantic.im/javascript-gom-jabbar/).

## Usage
Define your `package.json` file in a file named `npm.ts` (currently an object of type of `any`, see example `npm.ts` in the root of this source code).

Install this package globally. From a terminal, run:

    npm install -g tsapporg/ts-npm

Instead of running `npm install` in your NPM package source, run `ts-npm install`. This command generates `package.json`.

## Develop & Test
Make changes, commit changes, push changes, reinstall locally:
  
    git add -A; git commit -m 'Test commit'; git push -u origin main; npm uninstall -g tsapporg/ts-npm; npm cache clear --force; npm install -g tsapporg/ts-npm

In your NPM package source, run `ts-npm install`. 