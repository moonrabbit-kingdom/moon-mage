var Rollup = require('broccoli-rollup');
var concat = require('broccoli-concat');
var uglify = require('broccoli-uglify-js');
var MergeTrees = require('broccoli-merge-trees');
var path = require('path');

var nodeResolve = require('rollup-plugin-node-resolve');

var app = new Rollup('game/assets/js', {
  rollup: {
    entry: 'App.js',
    dest: 'bundle.js',
    format: 'iife',
    globals: {
      phaser: 'Phaser'
    }
  }
});

app = new MergeTrees([app, path.dirname(require.resolve('phaser'))]);

app = concat(app, {
  outputFile: 'bundle.js',
  headerFiles: ['phaser.js'],
  inputFiles: ['bundle.js'],
});

// app = new Uglify(app);

module.exports = app;
