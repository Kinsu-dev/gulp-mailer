var gulp = require('gulp'),
	runSeq = require('run-sequence').use(gulp),
	requireDir = require('require-dir');

requireDir('./gulp');
// -------------------------------------------------------
gulp.task('dist', function(cb) {
	runSeq( 'clean', ['sass', 'html', 'images'], 'cdn', 'inline', cb );
});
// -------------------------------------------------------
gulp.task('ftp', function(cb) {
	runSeq( 'deploy', cb );
});
// -------------------------------------------------------
gulp.task('lit', function(cb) {
	runSeq( 'litmus', cb );
});
// -------------------------------------------------------
gulp.task('send', function (cb) {
  	runSeq('mailgun', cb);
});
// -------------------------------------------------------
gulp.task('sendmail', function (cb) {
  	runSeq('dist', 'ftp', 'mailgun', cb);
});	
// -------------------------------------------------------
gulp.task('default', function (cb) {
  	runSeq([ 'sass', 'html', 'images' ], cb);
});	
// -------------------------------------------------------
gulp.task('server', function( cb) {
	gutil.log('The `server` task has been deprecated. Use `grunt serve` to start a server.');
	runSeq( 'serve', cb );
});
gulp.task('serve', function(cb) {
	var fs 	 = require('fs'),
		dist = 'dist';
	if( fs.existsSync( dist ) ) {
		runSeq( 'browserSync' )
	} else {
		runSeq('default', 'browserSync', cb)
	}
});