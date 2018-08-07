// clean.js
var gulp = require('gulp'),
	cfg = require('./_config'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util'),
	clean = require('gulp-clean');

gulp.task('clean', function () {
	var globs = './dist';
	return gulp.src(globs, {read: false})
		.pipe(plumber(function (error) {
			gutil.log(error.message);
			this.emit('end');
		}))
		.pipe(clean({force: true}))
		.pipe(clean());
});