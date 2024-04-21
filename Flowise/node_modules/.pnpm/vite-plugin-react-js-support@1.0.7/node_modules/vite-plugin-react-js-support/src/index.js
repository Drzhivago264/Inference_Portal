import babelCore from '@babel/core';
const cwd = process.cwd();
const fileRegex = /\.js$/
// 获取react版本
const version = require(cwd + '/node_modules/react/package.json').version;
const greatThan17 = parseInt(version.split('.')[0]) >= 17;

function vitePluginReactJsSupport(plugins, options) {
  options = options ? options: {
    jsxInject: true,
  };
  const jsxInject = options.jsxInject === undefined ? true : options.jsxInject;
  return {
    name: 'vite-plugin-react-js-support',
    transform(source, id) {
      if (fileRegex.test(id) && id.indexOf('node_modules') === -1) {
        if (greatThan17 && jsxInject &&
          source.indexOf('import React') === -1
          && source.indexOf('from "react"') === -1
          && source.indexOf("from 'react'") === -1)
        {
          source = 'import React from "react"; \n' + source
        }
        const ps = Array.isArray(plugins) ? plugins : [];
        return {
          code: compileFileToJS(source, ps),
          map: null // provide source map if available
        }
      }
    }
  }
}

function compileFileToJS(source, plugins) {
  const result = babelCore.transformSync(source, {
    plugins: ["@babel/plugin-transform-react-jsx", ...plugins],
  })
  return result.code;
}

module.exports = vitePluginReactJsSupport