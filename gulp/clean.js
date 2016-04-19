// clean.js
var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    gutil   = require('gulp-util'),
    clean   = require('gulp-clean'),
    cfg     = require('./_config');

gulp.task('clean', function() {
    return gulp.src(cfg.dist.root, { read: false })
      .pipe(plumber(function(error) {
          gutil.log(error.message);
          this.emit('end');
      }))
      .pipe(clean());
});