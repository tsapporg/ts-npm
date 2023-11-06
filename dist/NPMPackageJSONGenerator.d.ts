export default class NPMPackageJSONGenerator {
    private absolutePathToDependencies;
    private dependencyFilesGlob;
    private absolutePathToDependencyFilesGlob;
    constructor(absolutePathToDependenciesArg?: string);
    generatePackageJSON(): Promise<void>;
    private mergePackageDefs;
    private loadNPMPackageDef;
    private generateJSON;
}
//# sourceMappingURL=NPMPackageJSONGenerator.d.ts.map