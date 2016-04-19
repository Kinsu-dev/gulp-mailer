// sftp.js
var gulp 	 = require('gulp'),
	cfg		 = require('./_config')(),
	ftp 	 = require('vinyl-ftp'),
	gutil 	 = require('gulp-util'),
	debug 	 = require('gulp-debug'),
	litmus 	 = require('gulp-litmus'),
	ftpCfg 	 = require('../ftpconfig'),
	cdnizer  = require('gulp-cdnizer'),
	replace  = require('gulp-regex-replace');
	runSeq 	 = require('run-sequence').use(gulp);

// -------------------------------------------------------
gulp.task('deploy', function() {
	var conn = ftp.create({
		host 		: ftpCfg.ftp.host,
		user 		: ftpCfg.ftp.user,
		password	: ftpCfg.ftp.password,
		parallel	: 10,
		log 		: gutil.log
	});

	var globs = ['./dist/*'];

	return gulp.src( globs, { base: './dist', buffer: false })
	.pipe(plumber(function(error) {
		gutil.log(error.message);
		this.emit('end');
	}))
	.pipe( conn.newer( cfg.ftpConfig.dest ))
	.pipe( conn.dest( cfg.ftpConfig.dest ));
});
// -------------------------------------------------------
// // litmus.js
config = {
	subject 	 : cfg.ftp.deploy,
	username 	 : cfg.lit.user,
	password 	 : cfg.lit.pass,
	url 	 	 : cfg.lit.url,
	applications : [
			// 'android4',
			// 'aolonline',
			'androidgmailapp',
			// 'ffaolonline',
			// 'chromeaolonline',
			'appmail7',
			'appmail8',
			'colorblind',
			// 'messagelabs',
			'ipadmini',
			'ipad',
			// 'barracuda',
			'outlookfilter',
			// 'spamassassin3',
			'gmailnewspam',
			'yahoospam',
			// 'aolonlinespam',
			'gmailnew',
			'ffgmailnew',
			'chromegmailnew',
			'googleapps',
			'chromegoogleapps',
			'ffgoogleapps',
			'iphone5s',
			'iphone5sios8',
			'iphone6',
			'iphone6plus',
			'iphone6s',
			'iphone6splus',
			// 'notes7',
			// 'notes8',
			// 'notes85',
			// 'notes9',
			// 'ol2000',
			// 'ol2002',
			// 'ol2003', 
			'ol2007',
			'ol2010',
			'ol2011',
			'ol2013dpi120',
			'ol2013',
			'ol2015',
			'ol2016',
			'outlookcom',
			'ffoutlookcom',
			'chromeoutlookcom',
			'office365',
			// 'plaintext',
			'ffoffice365',
			'chromeoffice365',
			// 'gmxde',
			// 'ffgmxde',
			// 'chromegmxde',
			// 'webde',
			// 'ffwebde',
			// 'chromewebde',
			'thunderbirdlatest',
			// 'yahoo',
			// 'ffyahoo',
			// 'chromeyahoo',
			// 'spfcheck',
			// 'dkimcheck',
			// 'dkcheck',
			// 'senderidcheck',
			// 'gmxspam',
			// 'mailcomspam'
			]
};
gulp.task('litmus', function () {
	return gulp.src('dist/email.html')
	.pipe(litmus(config))
	.pipe(gulp.dest('dist'));
});
// -------------------------------------------------------
// -------------------------------------------------------
gulp.task('cdn', function(cb){
	runSeq( 'cdnizer', 'regexReplace', cb )
});
// -------------------------------------------------------
// gulp-cdnizer
gulp.task("cdnizer", function(){
	gulp.src("./dist/**/*.*")
	.pipe(cdnizer({
		defaultCDNBase: cfg.ftp.absCDN,
		matchers: [{ 
			pattern: /(<a\s[^>]*?href=["']\/)(.+?)(["'][^>]*>)/gi, fallback: false 
		}],
		files: ["**/*.{gif,png,jpg,jpeg}", "*.html"]
	}))
	.pipe(gulp.dest("./dist"));
});
// gulp-replace
gulp.task('regexReplace', function(){
	return gulp.src('dist/email.html')
	.pipe(replace({regex:'href="/h', replace:'href="h'}))
	.pipe(gulp.dest('dist'));
});
// -------------------------------------------------------