// premailer.js
var gulp = require('gulp'),
	premailer = require('gulp-premailer'),
	cfg = require('./_config')();

// ---------------------------------------------------------------------------
gulp.task('inline', function () {
	var htmlFiles = ['./dist/email.html', './dist/index.html'];
	return gulp.src(htmlFiles)
		.pipe(premailer())
		.pipe(gulp.dest(cfg.dist.html));
});