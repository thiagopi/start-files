const gulp = require('gulp');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const cssNano = require('gulp-cssnano');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const jsmin = require('gulp-minify');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // 1. where is my scss file
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        // 2. pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
        // 3. store all SCSS files into a single CSS file
        .pipe(concatCss('style.css'))
        .pipe(sourcemaps.write('.'))
        // 4. where do I save the compiled CSS
        .pipe(gulp.dest('./assets/css/'))
        // 5. stream changes to all browsers
        .pipe(browserSync.stream());
}

function removeMinifies() {
    return gulp.src('./assets/css/**/*.min.css')
    .pipe(clean({force: true}));
}

function minifyCss() {
    return gulp.src('./assets/css/**/*.css')
        .pipe(sourcemaps.init())
        // .pipe(cssNano())
        .pipe(cssmin({
            keepBreaks: false,
        }))
        .pipe(rename(function(file){
            if (file.basename.endsWith(".min")) {
                file.basename = file.basename.slice(0, -4) + ".min";
            }
            else {
            file.basename += ".min";
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css/'))
}

function minifyJs() {
    return gulp.src('./assets/scripts/**/*.js')
        .pipe(jsmin({
            ext:{
                min:'.min.js'
            },
            ignoreFiles: ['-min.js'],
            noSource: true
        }))
        .pipe(gulp.dest('./assets/js/'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    // gulp.watch('./assets/scss/**/*.scss', style);
    gulp.watch('./assets/scss/**/*.scss', gulp.series('style', 'removeMinifies', 'minifyCss')).on('change', browserSync.reload);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./assets/scripts/**/*.js', minifyJs).on('change', browserSync.reload);
}

exports.style = style;
exports.removeMinifies = removeMinifies;
exports.minifyCss = minifyCss;
exports.watch = watch;
exports.minifyJs = minifyJs;
