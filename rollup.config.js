import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    input: './src/index.js',
    output: {
        file: './lib/index.js',
        format: 'cjs',
        exports: 'default'
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        babel({
            babelHelpers: 'runtime',
            plugins: [['@babel/plugin-transform-runtime']]
        }),
        terser()
    ],
    external: [
        'commander',
        'chalk',
        'ora',
        'fs-extra',
        'download-git-repo',
        'inquirer',
        'path'
    ]
};
