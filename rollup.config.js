import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { dependencies } from './package.json';

export default {
    input: './src/index.js',
    output: {
        file: './lib/index.js',
        format: 'cjs',
        exports: 'auto'
    },
    plugins: [
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs(),
        json({
            namedExports: false
        }),
        babel({
            babelHelpers: 'bundled'
        }),
        terser()
    ],
    external: Object.keys(dependencies).concat(['path'])
};
