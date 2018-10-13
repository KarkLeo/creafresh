'use strict';
 
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    csso = require('gulp-csso'),
    minify = require('gulp-minify'),
    htmlmin = require('gulp-htmlmin'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function buildHTML() {
  return gulp.src('src/*.html')  
  .pipe(htmlmin({ 
    collapseWhitespace: true 
  }))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('js', function buildHTML() {
  return gulp.src('src/js/**/*.js')
  .pipe(minify())
  .pipe(gulp.dest('./js'))
  .pipe(browserSync.reload({
    stream:true
  }));
});
 
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions']
    }))
    .pipe(csso())
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('svg', function () {
  return gulp.src('src/img/svg/*.svg')
      .pipe(gulp.dest('./creafresh/img/svg/'))
      .pipe(browserSync.reload({
        stream:true
      }));
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*.{png,jpg,PNG,JPG}')
      .pipe(gulp.dest('./creafresh/img/'))
      .pipe(browserSync.reload({
        stream:true
      }));
});

gulp.task('svgicons', function () {
  return gulp
      .src('src/img/svg/icons/*.svg')
      .pipe(svgmin(function (file) {
          var prefix = path.basename(file.relative, path.extname(file.relative));
          return {
              plugins: [{
                  cleanupIDs: {
                      prefix: prefix + '-',
                      minify: true
                  }
              }]
          }
      }))
      .pipe(gulp.dest('./creafresh/img/svg/icons/'));
});
 
//----------

gulp.task('watch', function () {
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
  gulp.watch('src/img/svg/*.svg', gulp.series('svg'));
  gulp.watch('src/img/svg/icons/*.svg', gulp.series('svgicons'));
  gulp.watch('src/img/**/*', gulp.series('img'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('default', gulp.series(
  gulp.parallel('html', 'sass', 'svg', 'svgicons', 'js', 'img'),
  gulp.parallel('watch', 'server')
));