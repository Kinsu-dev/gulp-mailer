// sftp.js
const gulp = require('gulp'),
  cfg = require('./_config')(),
  ftp = require('vinyl-ftp'),
  gutil = require('gulp-util'),
  debug = require('gulp-debug'),
  litmus = require('gulp-litmus'),
  ftpCfg = require('../ftpconfig'),
  plumber = require('gulp-plumber'),
  replace = require('gulp-regex-replace'),
  runSeq = require('run-sequence').use(gulp);

// -------------------------------------------------------
gulp.task('deploy', function () {
  const conn = ftp.create({
    host: ftpCfg.ftp.host,
    user: ftpCfg.ftp.user,
    password: ftpCfg.ftp.password,
    parallel: 10,
    log: gutil.log
  });

  const globs = ['./dist/*'];

  return gulp.src(globs, {base: './dist', buffer: false})
		.pipe(plumber(function (error) {
			gutil.log(error.message);
			this.emit('end');
		}))
		.pipe(conn.newer(cfg.ftpConfig.dest))
		.pipe(conn.dest(cfg.ftpConfig.dest));
});
// -------------------------------------------------------
// litmus.js
config = {
	subject: cfg.ftp.deploy,
	username: cfg.lit.user,
	password: cfg.lit.pass,
	url: cfg.lit.url,
	applications: [
    "ol2000",
    "ol2002",
    "ol2003",
    "ol2007",
    "ol2010",
    "ol2013",
    "gmailnew",
    "ffgmailnew",
    "chromegmailnew",
    "ol2015",
    "ol2011",
    "outlookcom",
    "ffoutlookcom",
    "chromeoutlookcom",
    "ipad",
    "ipadmini",
    "iphone6",
    "iphone6plus",
    "ffaolonline",
    "chromeaolonline",
    "googleapps",
    "ffgoogleapps",
    "chromegoogleapps",
    "office365",
    "ffoffice365",
    "chromeoffice365",
    "ol2013dpi120",
    "ol2016",
    "androidgmailapp",
    "android4",
    "iphone6s",
    "iphone6splus",
    "appmail9",
    "ipadpro13in",
    "ffgoogleinbox",
    "chromegoogleinbox",
    "iphonese",
    "windows10mail",
    "appmail10",
    "iphone7",
    "android5",
    "android6",
    "androidgmailimap",
    "iphone7plus",
    "gmailios",
    "androidgoogleinbox",
    "googleinboxios",
    "androidsamsung6",
    "iphone8",
    "iphone8plus",
    "iphonex",
    "androidoutlook",
    "appmail11"
	]
};
gulp.task('litmus', function () {
	return gulp.src('dist/email.html')
		.pipe(litmus(config))
		.pipe(gulp.dest('dist'));
});
// -------------------------------------------------------
// -------------------------------------------------------
gulp.task('cdn', function (cb) {
	runSeq(/*'cdnizer', */'regexReplace', cb)
});
// -------------------------------------------------------
// absolute path fix
// gulp-replace
gulp.task('regexReplace', function () {
  const htmlFiles = ['dist/email.html', 'dist/index.html'];
  return gulp.src(htmlFiles)
		.pipe(replace({regex: 'href="/images', replace: 'href="'+cfg.ftpConfig.absCDN+'/images'}))
		.pipe(replace({regex: '/index.html', replace: cfg.ftpConfig.absCDN+'/index.html'}))
		.pipe(replace({regex: '&gt;', replace: '>'}))
		.pipe(replace({regex: '/http', replace: 'http'}))
		.pipe(replace({regex: 'src="images', replace: 'src="'+cfg.ftpConfig.absCDN+'/images'}))
		.pipe(replace({regex: 'src="/images', replace: 'src="'+cfg.ftpConfig.absCDN+'/images'}))
		.pipe(gulp.dest('dist'));
});
// -------------------------------------------------------
