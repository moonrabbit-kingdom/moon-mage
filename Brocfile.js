/* eslint-disable */

var Rollup = require('broccoli-rollup');
var concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
var Gzip = require('broccoli-gzip');
var MergeTrees = require('broccoli-merge-trees');
var path = require('path');

function getJSNode() {
  var js = new Rollup('game/assets/js', {
    rollup: {
      entry: 'App.js',
      dest: 'bundle.js',
      format: 'iife',
      globals: {
        phaser: 'Phaser'
      }
    }
  });

  // Add Phaser in
  js = new MergeTrees([js, path.dirname(require.resolve('phaser'))]);

  js = concat(js, {
    outputFile: 'bundle.js',
    headerFiles: ['phaser.js'],
    inputFiles: ['bundle.js'],
  });

  // Only pickup the bundle files
  js = new Funnel(js, {
    include: ['bundle.*'],
    destDir: 'assets/js'
  });

  // Provide a Gzip compressed asset
  if (process.env.ENV !== 'dev') {
    js = new Gzip(js, {
      extensions: ['js']
    });
  }

  return js
}

function getHTMLNode() {
  var html = new Funnel('./game', {
    include: ['index' + (process.env.ENV === 'dev' ? '-dev' : '') + '.html'],
  });

  return html;
}

function getAssetsNode() {
  var assets = new Funnel('game/assets', {
    include: [
      'audio/**/*',
      'img/**/*',
      'levels/**/*',
      'spritesheets/**/*',
      'video/**/*'
    ],
    destDir: 'assets'
  });

  return assets;
}

var app = new MergeTrees([
  getJSNode(),
  getHTMLNode(),
  getAssetsNode()
]);


module.exports = app;
