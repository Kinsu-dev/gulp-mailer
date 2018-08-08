const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  cfg = require('./_config')();

gulp.task('browserSync', () => {
  browserSync.create();
  browserSync.init({server: 'dist'});

  gulp.watch(cfg.dist.css + '/**/*.css').on('change', browserSync.stream);
  gulp.watch(cfg.dist.htmlFiles).on('change', reload);
});
