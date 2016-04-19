// premailer.js
var gulp 		= require('gulp'),
	premailer 	= require('gulp-premailer'),
	cfg		 	= require('./_config')();

// ---------------------------------------------------------------------------
gulp.task('inline', function () {
	return gulp.src( cfg.dist.htmlFiles )
		.pipe(premailer())
		.pipe(gulp.dest( cfg.dist.html ));
});