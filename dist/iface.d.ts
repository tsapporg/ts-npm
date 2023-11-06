export interface NPMPackage {
    tsconfig?: string;
    name: string;
    version: string;
    description: string;
    repository?: {
        type: string;
        url: string;
    };
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
//# sourceMappingURL=iface.d.ts.map