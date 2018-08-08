/** IMAGES TASKS --------------------------------------- */
const gulp = require('gulp'),
  cfg = require('./_config')(),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  imagemin = require('gulp-imagemin'),
  ice = require('imagemin-jpeg-recompress'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  runSeq = require('run-sequence').use(gulp);

// ---------------------------------------------------------------------------
gulp.task('images', function () {
  runSeq(
    'imagemin',
    'imagemin:clearCache'
  )
});
// ---------------------------------------------------------------------------
gulp.task('imagemin', function () {
  var source = [cfg.src.images];

  return gulp.src('app/_images/**/*.*')
    .pipe(plumber(function (error) {
      gutil.log(error.message);
      this.emit('end');
    }))
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [
        pngquant(),
        ice()
      ]
    })))
    .pipe(gulp.dest('dist/images'));
});
// ---------------------------------------------------------------------------
gulp.task('imagemin:clearCache', (done) => {
  return cache.clearAll(done);
});
