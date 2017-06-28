var Rollup = require('broccoli-rollup');
var concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
var Gzip = require('broccoli-gzip');
var MergeTrees = require('broccoli-merge-trees');
var path = require('path');

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

// Add Phaser in
app = new MergeTrees([app, path.dirname(require.resolve('phaser'))]);

app = concat(app, {
  outputFile: 'bundle.js',
  headerFiles: ['phaser.js'],
  inputFiles: ['bundle.js'],
});

// Only pickup the bundle files
app = new Funnel(app, {
  include: ['bundle.*']
});

// Provide a Gzip compressed asset
app = new Gzip(app, {
  extensions: ['js']
});

module.exports = app;
