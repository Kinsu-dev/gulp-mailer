// mailgun.js
var gulp 	 = require('gulp'),
	cfg		 = require('./_config')(),
	debug 	 = require('gulp-debug'),
	mail 	 = require('gulp-mailgun');

// -------------------------------------------------------
gulp.task('mailgun', function () {
	return gulp.src( 'dist/email.html' ) // Modify this to select the HTML file(s)
	.pipe(mail({
		key: cfg.email.key, // Enter your Mailgun API key here
		sender: cfg.email.sender,
		recipient: cfg.email.recipient,
		subject: cfg.email.subject,
		preventThreading: true,
		hideRecipient: true
	}));
});