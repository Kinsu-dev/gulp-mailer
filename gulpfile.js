const gulp = require('gulp'),
  gutil = require('gulp-util'),
  runSeq = require('run-sequence').use(gulp),
  requireDir = require('require-dir');

requireDir('./gulp');
// -------------------------------------------------------
// Create a your email with inline css
gulp.task('dist', function (cb) {
	runSeq('clean', ['sass', 'html', 'images'], 'cdn', 'inline', 'rplc', 'pug', cb);
});
// -------------------------------------------------------
// Send dist folder to ftp server
gulp.task('ftp', function (cb) {
	runSeq('deploy', cb);
});
// -------------------------------------------------------
// Deploy email to Litmus account for validation
gulp.task('lit', function (cb) {
	runSeq('litmus', cb);
});
// -------------------------------------------------------
// Send email to the respective email list
gulp.task('send', function (cb) {
	runSeq('mailgun', cb);
});
// -------------------------------------------------------
// Create a your email with inline css
// deploy to ftp server
// send email test
// deploy email to Litmus account for validation
gulp.task('sendmail', function (cb) {
	runSeq('dist', 'ftp', 'mailgun', 'lit', cb);
});
// -------------------------------------------------------
// Default tasks
gulp.task('default', function (cb) {
	runSeq(['sass', 'html', 'images'], cb);
});
// -------------------------------------------------------
// Start Browser-Sync local server
gulp.task('server', function (cb) {
	gutil.log('The `server` task has been deprecated. Use `grunt serve` to start a server.');
	runSeq('serve', cb);
});
gulp.task('serve', function (cb) {
	var fs = require('fs'),
		dist = 'dist';
	if (fs.existsSync(dist)) {
		gutil.log('Starting server.');
		runSeq('browserSync')
	} else {
		gutil.log('Generating dist folder and starting server.');
		runSeq('default', 'browserSync', cb)
	}
});
