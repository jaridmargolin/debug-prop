'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

/* -----------------------------------------------------------------------------
 * rollup config
 * -------------------------------------------------------------------------- */

const externals = [
  '@inventory/debug',
  'core-js/modules/es.object.define-property'
]

const sharedPlugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json']
  }),
  commonjs(),
  babel({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: 'src/debug-prop.ts',
    external: externals,
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/common/debug-prop.js',
      format: 'cjs',
      exports: 'named'
    }
  },
  {
    input: 'src/debug-prop.ts',
    external: externals,
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/es/debug-prop.js',
      format: 'es'
    }
  },
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
    plugins: [...sharedPlugins, terser()],
    output: {
      file: 'dist/debug-prop.min.js',
      format: 'umd',
      name: 'debugProp',
      exports: 'named'
    }
  }
]
