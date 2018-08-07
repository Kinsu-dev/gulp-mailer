const gulp = require('gulp'),
  cfg = require('./_config')(),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync');

// ---------------------------------------------------------------------------
gulp.task('sass', function () {
  const processors = [autoprefixer({browsers: ['last 4 version']})];

  return gulp.src(cfg.src.sassMain)
		.pipe(plumber(function (error) {
			gutil.log(error.message);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(cfg.dist.css))
		.pipe(browserSync.stream());
});
