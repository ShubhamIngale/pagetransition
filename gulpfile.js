// initialize modules
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const cssnano = require('cssnano');
const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

// File path variables
const files = {
    scssPath: 'app/style/**/*.scss',
    jsPath: 'app/js/**/*.js'
}

// Sass tasks
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist')
    );
}

// js tasks
function jsTask() {
    return src(files.jsPath)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist')
    );
}

// cachebusting tasks
const cbString = new Date().getTime();
function cacheBustTask() {
    return src(['index.html',])
    .pipe(replace(/cb=\d+/g, 'cb=' +cbString))
    .pipe(dest('.')
    );
}

// watch task
function watchTask() {
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask)
        );
}

// default task
exports.default = series(
    parallel(scssTask, jsTask),
    cacheBustTask,
    watchTask
);