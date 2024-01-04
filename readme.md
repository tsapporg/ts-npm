# ts-npm 
Use Typescript to define your NPM package.

This source code is experimental and therefore unpublished on NPM; install directly from Github.

`ts-npm install` uses root-level npm*.ts files to generate a package.json file and then install dependencies using `npm install`. ts-npm is experimental, but it:
- Allows you to manage dependencies for application-level monorepos
- Allows you to add comments in a sane manner (no @comment in package.json files)
- Allows you to include operating system business logic in the your dependencies file when using libraries that are not cross-platform
- Allows you to group dependencies to your liking in a single file (no auto-sorting, ever) and across multiple files (separate files are combined into 1 package.json file)
- Automatically moves `/types`-suffixed packages from 'development' to 'production' if you grouped them together

## Background
Basically [this](https://frantic.im/javascript-gom-jabbar/).

Let's say you have an NPM-based TypeScript application with many different `src/` folders:

        src/
        ├── website
        │   └── index.ts
        ├── native-desktop
        │   └── index.ts
        ├── native-mobile
        │   └── index.ts
        ├── cli
        │   └── index.ts
        └── infra
            └── hosting_provider_infra_as_code.ts

With the current paradigm for this type of application monorepo, you either put all the dependencies in a single package.json and find a way to bundle them out when building your artifacts, or create a `packages/` folder in your root package, breaking up all the artifact types into separate packages. Both approaches are tedious. There is monorepo software out there like Lerna, but we had issues using it in a low-RAM environment for other projects, and frankly it might be overkill for application monorepos; it seemed more sensible to just use makefiles for scripts and package.json files _just_ for dependencies and "package" info. 

ts-npm takes a more ad-hoc approach to monorepo management. For the above example, we'd define common depenencies in an npm.ts file, then break out out each requirement for a separate set of dependencies into its own npm*.ts file, e.g. npm.website.ts, npm.native-desktop.ts, etc. Defining dependencies might look something like this:

        .npm/
        ├── npm.ts # Must be here.
        ├── npm.website.ts
        ├── npm.cli.ts
        ├── npm.native-desktop.ts
        ├── npm.native-mobile.ts
        └── npm.infra.ts

> You should structure your npm*.ts files based on how you plan on bundling them, e.g. if you want to build a Docker image for a piece of business logic that runs on your hosting provider, you might create an npm.infra.business-logic.ts file, then add a build step before deploying to your hosting provider to build a package.json file from npm.infra.business-logic.ts, and placing in some sort of "dist" dir to use for deployment.

## Usage
Define your `package.json` file in a file named `npm.ts` (currently an object of type of `any`, see example `npm.ts` in the root of this source code).

Install this package globally. From a terminal, run:

    npm install -g tsapporg/ts-npm

Instead of running `npm install` in your NPM package root (and assuming the declaration of dependencies in a `.npm` folder above), run `ts-npm --action=install --absolute-path-to-dependencies=$(pwd)/.npm`. This command generates `package.json`.

## Develop & Test
Make changes, commit changes, push changes, reinstall locally:
  
    git add -A; git commit -m 'Test commit'; git push -u origin main; npm uninstall -g tsapporg/ts-npm; npm cache clear --force; npm install -g tsapporg/ts-npm

In your NPM package source, run `ts-npm install`. 
