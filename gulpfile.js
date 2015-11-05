/* global require: true */
/* global process: true */
(function() {

    'use strict';

    var gulp = require('gulp'),
        debug = require('gulp-debug'),
        inject = require('gulp-inject'),
        del = require('del'),
        Config = require('./gulpfile.config'),
        browserSync = require('browser-sync'),
        superstatic = require('superstatic'),
        $ = require('gulp-load-plugins')({lazy: true});

    var config = new Config();

    //clean
    gulp.task('clean', ['clean-css', 'clean-html', 'clean-js', 'clean-dev-data'], function() {
      //run all the clean tasks
    });

    gulp.task('clean-css', function(done) {
      clean(config.distCss, done);
    });

    gulp.task('clean-dev-data', function(done) {
      clean(config.distDevDataDirectory + '**/*.*', done);
    });

    gulp.task('clean-html', function(done) {
      clean(config.distHtml, done);
    });

    gulp.task('clean-js', function(done) {
      clean(config.distJavaScript, done);
    });

    //build dist
    gulp.task('build', ['dev-data', 'view-cache'], function() {
        log('building...');
        // return gulp.src([config.index])
        //     .pipe(gulp.dest(config.dist));
        var assets = $.useref.assets();
        return gulp.src(config.index)
          .pipe(assets)
          .pipe(assets.restore())
          .pipe($.useref())
          .pipe(gulp.dest(config.dist));
    });

    gulp.task('view-cache', function() {
        return gulp.src(config.views)
          .pipe($.angularTemplatecache(
            config.templateCache.fileName,
            config.templateCache.options
          )).pipe(gulp.dest(config.clientJavaScriptDirectory));
    });

    gulp.task('dev-data', function() {
        log('moving dev data');
        return gulp.src(config.sourceDevData)
          .pipe(gulp.dest(config.distDevDataDirectory));
    });

    //server
    gulp.task('watch', function() {
        gulp.watch([config.sourceJavaScript], []);
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
                middleware: superstatic({
                    debug: false
                })
            }
        });
    });

    gulp.task('default', ['serve']);

    function clean(path, done) {
        log('Deleting files from ' + path);
        del(path, done);
    }

    function log(message) {
    if (typeof(message) === 'object') {
        for (var key in message) {
            if (message[key]) {
                $.util.log($.util.colors.blue(message[key]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(message));
    }
}

})();
