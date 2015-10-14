/* global require: true */
/* global process: true */

'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    browserSync = require('browser-sync'),
    superstatic = require( 'superstatic' );

var config = new Config();

gulp.task('watch', function() {
    gulp.watch([config.allJavaScript], []);
});

gulp.task('serve', ['watch'], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    files: ['**/*.html', '**/*.js', '**/*.css'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'road-home',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './src',
      middleware: superstatic({ debug: false})
    }
  });
});

gulp.task('default', ['serve']);