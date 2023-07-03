// This file is responsible for declaring Node Package Manager (NPM) app dependencies.
// This file is used to generate package.json (the standard NPM dependency declaration file).
// Using this file allows us to document and group dependencies in a sane manner (no "@comment" JSON).
// All "@types" in .dependencies automatically get moved to .devDependencies when package.json is generated.
// Group your dependencies logically!
export interface NPMPackage {
  tsconfig?: string;
  name: string;
  version: string;
  description: string;
  repository?: {
    type: string;
    url: string;
  },
  license: string;
  private: boolean;
  type?: 'module' | 'commonjs';
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  bin?: string | string[];
  files?: string[];
  main?: string;
}