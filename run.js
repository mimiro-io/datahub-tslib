#!/usr/bin/env node

import ts from "typescript";
import {rollup} from 'rollup';
import typescript from '@rollup/plugin-typescript';
import {createRequire} from 'module';
import fs from "fs";

const require = createRequire(import.meta.url);

const removeExportsPlugin = function () {
    return {
        async renderChunk(bundle) {
            const code = bundle
                .replace(/^export.*/gm, "//$&")
                .replace(/^import.*builtin_stubs.*/gm, "//$&");
            return {code, map: null};
        },
    };
};

const inp = process.argv.slice(2)



async function preCompile(fileNames) {
    let c = ts.readConfigFile("./tsconfig.json.shared" ,(path) => fs.readFileSync(path, 'utf8'))
    let program = ts.createProgram(fileNames, c.config.compilerOptions);
    let allDiagnostics = ts.getPreEmitDiagnostics(program)

    console.log(ts.formatDiagnosticsWithColorAndContext(allDiagnostics, {
        getCurrentDirectory: function () { return ts.sys.getCurrentDirectory(); },
        getNewLine: function () { return ts.sys.newLine; },
        getCanonicalFileName: ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames),
    }))
    if (allDiagnostics.length > 0) {
            process.exit(1);
    }
/*
    let res = null
    await program.emit(program.getSourceFile(fileNames[0]), (fileName, text) => {
        res = text
    })
    return res

 */
}


async function build() {
    let bundle;
    let buildFailed = false;
    const tsconfigShared = require.resolve('datahub-tslib/tsconfig.json');
    const fsPromises = fs.promises;
    await fsPromises.cp(tsconfigShared, "tsconfig.json.shared")

    try {
        // run tsc only first, for improved error reporting (rollup stops at first error)
        const tsRes = await preCompile(inp);

        // create a bundle
        bundle = await rollup({
            input: inp[0],
            external: ['./lib/builtin_stubs', './builtin_stubs'],
            plugins: [
                typescript({
                    noEmitOnError: true,
                    tsconfig: "tsconfig.json.shared"
                }),
                removeExportsPlugin()
            ]
        })

        // an array of file names this bundle depends on
        const rollupRes =await bundle.generate({dir: 'dist', format: 'es'})
        if (rollupRes.output.length == 1) {
            console.log(rollupRes.output[0].code)
        } else {
            console.error("no output", rollupRes)
            buildFailed = true;
        }
    } catch (error) {
        buildFailed = true;
        // do some error reporting
        if (error.loc && error.frame) {
            console.error(error.message);
            console.error(error.loc.file, "(", error.loc.line, ":", error.loc.column, ")");
            console.error(error.frame);
        } else {
            console.error(error)
        }
    }
    if (bundle) {
        // closes the bundle
        await bundle.close();
    }
    await fsPromises.rm("tsconfig.json.shared")
    process.exit(buildFailed ? 1 : 0);
}


build();