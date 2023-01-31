import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'

const nodeResolve = resolve({
    preferBuiltins: false,
    mainFields: ['module', 'jsnext:main', 'browser'],
  });
  
const plugins = [commonjs(), nodeResolve];

export default {
//   external: ['d3'],
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    // name: 'd3javad',
    globals: {
        loadsh: '_'
    }
  },
  plugins
}