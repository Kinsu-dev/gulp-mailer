var gulp        = require('gulp'),
	cfg			= require('./_config')(),
	print       = require('gulp-print'),
	gutil       = require('gulp-util'),
	plumber     = require('gulp-plumber'),
	debug       = require('gulp-debug'),
	handlebars  = require('gulp-compile-handlebars'),
	prettify    = require('gulp-prettify'),
	rename      = require('gulp-rename'),
	runSeq      = require('run-sequence').use(gulp);

var templateData = {},
	options = {
		batch: ['./app/layout/'],
		helpers: {
			compare: function(lvalue, rvalue, options) {
				if (arguments.length < 3)
					throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

				var operator = options.hash.operator || "==";

				var operators = {
					'==':       function(l,r) { return l == r; },
					'===':      function(l,r) { return l === r; },
					'!=':       function(l,r) { return l != r; },
					'<':        function(l,r) { return l < r; },
					'>':        function(l,r) { return l > r; },
					'<=':       function(l,r) { return l <= r; },
					'>=':       function(l,r) { return l >= r; },
					'typeof':   function(l,r) { return typeof l == r; },
					'contains': function(l,r) { return l ? l.indexOf(r) !== -1 : false ; }
				};

				if (!operators[operator])
					throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

				var result = operators[operator](lvalue,rvalue);

				if( result ) {
					return options.fn(this);
				} else {
					return options.inverse(this);
				}

			}
		}
	};
// ---------------------------------------------------------------------------
gulp.task('html', function(cb) {
	runSeq('handlebars', 'prettify', cb )
});
// ---------------------------------------------------------------------------
gulp.task('handlebars', function () {
	var source = [cfg.src.templates + '/email_template/*.hbs'];
	return gulp.src(source)
		.pipe(plumber(function(error) {
		  gutil.log(error.message);
		  this.emit('end');
		}))
		.pipe(handlebars(templateData, options))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest( cfg.dist.html ))
});
// ---------------------------------------------------------------------------
gulp.task('prettify', function() {
	var source = [
		'dist/*.html'
	];

	return gulp.src(source, {base: './'})
		.pipe(plumber(function(error) {
		  gutil.log(error.message);
		  this.emit('end');
		}))
		.pipe(prettify({
			indent_size: 4
		}))
		.pipe(gulp.dest('./'));
});