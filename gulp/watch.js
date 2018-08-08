/** Watch TASKS --------------------------------------- */
const gulp = require('gulp'),
  gWatch = require('gulp-watch'),
  cfg = require('./_config')(),
  runSeq = require('run-sequence').use(gulp);

gulp.task('watch', () => {
  runSeq(
    'watch:images',
    'watch:html',
    'watch:sass'
  );
});
gulp.task('watch:images', () => {
  gWatch(cfg.src.images, () => {
    runSeq('imagemin:clean', 'imagemin');
  });
});

gulp.task('watch:html', () => {
  gWatch(cfg.src.templates + '/**/*.hbs', () => {
    runSeq('html');
  });
});

gulp.task('watch:sass', () => {
  gWatch(cfg.src.sass, () => {
    runSeq('sass');
  });
});
/** ------------------------------------------------------ */
