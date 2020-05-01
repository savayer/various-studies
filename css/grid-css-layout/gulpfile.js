const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync')
const yargs = require('yargs');

const gulpif = require("gulp-if");
const sass = require("gulp-sass");
const mincss = require("gulp-clean-css");
const groupmedia = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");

const argv = yargs.argv;
const production = !!argv.production;

gulp.task('clean', () => {
    return del('./dist/*');
})

gulp.task('img', () => {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./dist/img'))
        .on("end", browserSync.reload);
})

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .on("end", browserSync.reload);
})

gulp.task("styles", () => {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass())
        .pipe(groupmedia())
        .pipe(gulpif(production, autoprefixer({
            cascade: false,
            grid: true
        })))
        .pipe(gulpif(production, mincss({
            compatibility: "ie8", level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false
                }
            }
        })))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({
        server: './dist',
        port: 3000,
        notify: true
    });

    gulp.watch(['./src/*.html'], gulp.parallel('html'));
    gulp.watch(['./src/styles/*.scss'], gulp.parallel('styles'));
    gulp.watch(['./src/js/**/*.js', './index.js']);
})

gulp.task('prod', gulp.series(
    'clean', 
    gulp.parallel(['html', 'styles', 'img'])
))

gulp.task('default', gulp.series(
    'clean', 
    gulp.parallel(['html', 'styles', 'img'],
    gulp.parallel('serve'))
))
