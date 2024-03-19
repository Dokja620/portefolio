const { src, dest, watch, series} = require ('gulp')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    return src ('dokja/**/*.scss')
        .pipe(sass())
        .pipe(dest('assets/styles'))
}

function watchTask() {
    watch(['dokja/**/*.scss'], buildStyles)
}

exports.default = series(buildStyles, watchTask)