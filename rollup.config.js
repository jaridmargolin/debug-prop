'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

/* -----------------------------------------------------------------------------
 * rollup config
 * -------------------------------------------------------------------------- */

const sharedPlugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    module: true
  }),
  babel({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: 'src/debug-prop.ts',
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/debug-prop.js',
      format: 'umd',
      name: 'debugProp',
      exports: 'named'
    }
  },
  {
    input: 'src/debug-prop.ts',
    external: ['@inventory/debug'],
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/common/debug-prop.js',
      format: 'cjs',
      exports: 'named'
    }
  },
  {
    input: 'src/debug-prop.ts',
    external: ['@inventory/debug'],
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/es/debug-prop.js',
      format: 'es'
    }
  },
  {
    input: 'src/debug-prop.ts',
    plugins: [...sharedPlugins, terser()],
    output: {
      file: 'dist/debug-prop.min.js',
      format: 'umd',
      name: 'debugProp',
      exports: 'named'
    }
  }
]
