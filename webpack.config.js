const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const webpack = require('webpack');
const sourceMap = require('./webpack/sourceMap');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/sass.lint');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const babel = require('./webpack/babel');
const favicon = require('./webpack/favicon');

const fs = require('fs')

const PATHS = {
  source: path.join(__dirname, 'dev'),
  build: path.join(__dirname, 'build'),
};

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    //const extension = parts[1];
    const extension = 'pug';
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}/${name}.${extension}`),
      chunks: [name, 'common'],
    });
  });
}

function generateEntryPoints(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  const entryObject = {};
  for (let i = 0; i < templateFiles.length; i++) {
    const parts = templateFiles[i].split('.');
    const name = parts[0];
    const extension = 'js';
    entryObject[name] = path.resolve(__dirname, `${templateDir}/${name}/${name}.${extension}`);
  }
  return entryObject;
}

const htmlPages = generateHtmlPlugins('./dev/pages');
const entriesObject = generateEntryPoints('./dev/pages');

const common = merge([
  {
    entry: entriesObject,
    output: {
      path: PATHS.build,
      filename: './js/[name].js?[hash]',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ].concat(htmlPages),
    optimization: {
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
  pug(),
  // lintJS({ paths: PATHS.sources }),
  lintCSS(),
  images(),
  fonts(),
  babel(),
]);


module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common,
      extractCSS(),
      favicon(),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css(),
      sourceMap(),
    ]);
  }
};