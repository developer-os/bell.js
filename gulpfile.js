const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');
const del = require('del');

// Clean build
gulp.task('clean', function() {
  return del(['web/css', 'web/js']);
});

// Minify css
gulp.task('css', function() {
  return gulp.src(['web/src/css/*.css'])
    .pipe(minify())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('web/dist/css'));
});

// Minify js
gulp.task('js', function() {
  return gulp.src(['web/src/js/*.js'])
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('web/js'));
});

// Minify lib css
gulp.task('lib css', function() {
  return gulp.src(['web/lib/bootstrap/dist/css/bootstrap.css'])
    .pipe(minify())
    .pipe(concat('lib.min.css'))
    .pipe(gulp.dest('web/css'));
});

// Minify vendor js
gulp.task('lib js', function() {
  return gulp.src(['web/lib/jquery/jquery.js',
                  'web/lib/angular/angular.js',
                  'web/lib/bootstrap/dist/js/bootstrap.js'])
    .pipe(uglify())
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('web/js'));
});

gulp.task('default', ['css', 'js', 'lib css', 'lib js']);
