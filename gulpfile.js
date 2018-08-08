const gulp = require('gulp'),
  gutil = require('gulp-util'),
  runSeq = require('run-sequence').use(gulp),
  requireDir = require('require-dir');

requireDir('./gulp');
// -------------------------------------------------------
// Create a your email with inline css
gulp.task('dist', (cb) => {
  runSeq('clean', ['sass', 'html', 'images'], 'inline', 'cdn', 'pug', cb);
});
// -------------------------------------------------------
// Send dist folder to ftp server
gulp.task('ftp', (cb) => {
  runSeq('deploy', cb);
});
// -------------------------------------------------------
// Deploy email to Litmus account for validation
gulp.task('lit', (cb) => {
  runSeq('litmus', cb);
});
// -------------------------------------------------------
// Send email to the respective email list
gulp.task('send', (cb) => {
  runSeq('mailgun', cb);
});
// -------------------------------------------------------
// Create a your email with inline css
// deploy to ftp server
// send email test
// deploy email to Litmus account for validation
gulp.task('sendmail', (cb) => {
  runSeq('dist', 'ftp', 'mailgun', 'lit', cb);
});
// -------------------------------------------------------
// Default tasks
gulp.task('default', (cb) => {
  runSeq(['sass', 'html', 'images'], cb);
});
// -------------------------------------------------------
// Start Browser-Sync local server
gulp.task('server', (cb) => {
  gutil.log('The `server` task has been deprecated. Use `grunt serve` to start a server.');
  runSeq('serve', cb);
});
gulp.task('serve', (cb) => {
  const fs = require('fs'), dist = 'dist';
  if (fs.existsSync(dist)) {
    gutil.log('Starting server.');
    runSeq('browserSync', 'watch')
  } else {
    gutil.log('Generating dist folder and starting server.');
    runSeq('default', 'browserSync', 'watch', cb)
  }
});
