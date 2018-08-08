const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  cfg = require('./_config')();

gulp.task('browserSync', () => {
  browserSync.init({server: 'dist'});

  gulp.watch(cfg.dist.htmlFiles).on('change', reload);
});
