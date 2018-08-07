const fs = require('fs'),
  gulp = require('gulp'),
  runSeq = require('run-sequence').use(gulp),
  rename = require('gulp-rename'),
  html2jade = require('gulp-html2jade'),
  gulpPugBeautify = require('gulp-pug-beautify');

gulp.task('pug', function (cb) {
  runSeq('jade', 'pug-beautify', cb);
});

gulp.task('pug-beautify', function () {
  return gulp.src('dist/pug/*.pug')
    .pipe(gulpPugBeautify({ omit_empty_lines: true }))
    .pipe(gulp.dest('dist/pug/'));
});

var options = {nspaces:2};
gulp.task('jade', function(){
  gulp.src('dist/*.html')
    .pipe(html2jade(options))
    .pipe(rename(function (path) {
      path.extname = '.pug';
    }))
    .pipe(gulp.dest('dist/pug'));
});
