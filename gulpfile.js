(function () {
    'use strict';
    var gulp = require('gulp'),
        clean = require('gulp-clean'),
        sass = require('gulp-sass'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        csslint = require('gulp-csslint'),
        scp = require('scp'),

        getDefaultConcatList = function () {
            return [
                'src/js/utils.js',
                'src/js/jsonp.js',
                'src/js/dom-manipulations.js',
                'src/js/initialization.js'
            ];
        };

    gulp.task('clean', function () {
        return gulp.src('./dist/**/*').pipe(clean());
    });

    gulp.task('sass', function () {
        return gulp.src('./src/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist/styles'));
    });

    gulp.task('copy', function () {
        return gulp.src('./src/*.html')
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('build', ['copy','sass', 'clean'], function () {
        return gulp.src(getDefaultConcatList())
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/scripts'));
    });

    gulp.task('default', ['build'], function() {});
})();