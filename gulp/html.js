const gulp = require('gulp'),
  cfg = require('./_config')(),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  handlebars = require('gulp-compile-handlebars'),
  prettify = require('gulp-prettify'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  runSeq = require('run-sequence').use(gulp),
  templateData = {},
  options = {
    batch: ['./app/layout/'],
    helpers: {
      compare: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
          throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

        var operator = options.hash.operator || "==";

        var operators = {
          '==': function (l, r) {
            return l == r;
          },
          '===': function (l, r) {
            return l === r;
          },
          '!=': function (l, r) {
            return l != r;
          },
          '<': function (l, r) {
            return l < r;
          },
          '>': function (l, r) {
            return l > r;
          },
          '<=': function (l, r) {
            return l <= r;
          },
          '>=': function (l, r) {
            return l >= r;
          },
          'typeof': function (l, r) {
            return typeof l == r;
          },
          'contains': function (l, r) {
            return l ? l.indexOf(r) !== -1 : false;
          }
        };

        if (!operators[operator])
          throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

        var result = operators[operator](lvalue, rvalue);

        if (result) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }

      },
      list: function(items, options) {
        var out = '';
        if (!!items) {
          out;
          items = items.split('|$|');
          for(var i=0, l=items.length; i<l; i++) {
            console.log(items[i]);
            out +=
              '<tr>'+
              '<td width="3%" align="left">&nbsp;</td>'+
              '<td class="valigntop" width="10"><span class="bullet">&bull;&nbsp;&nbsp;</span></td>'+
              '<td>' + items[i] + '</td>' +
              '</tr>'
          }
        }

        return out;
      }
    }
  };
// ---------------------------------------------------------------------------
gulp.task('html', (cb) => {
  runSeq('handlebars', 'prettify', cb)
});
// ---------------------------------------------------------------------------
gulp.task('handlebars', () => {
  const source = [cfg.src.templates + 'email_template/*.hbs'];
  let stream = gulp.src('app/layout/email_template/*.hbs')
    .pipe(plumber(function (error) {
      gutil.log(error.message);
      this.emit('end');
    }))
    .pipe(handlebars(templateData, options))
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(gulp.dest('dist'));

  return stream;
});
// ---------------------------------------------------------------------------
gulp.task('prettify', () => {
  var source = ['dist/*.html'];
  return gulp.src(source, {base: './'})
    .pipe(plumber(function (error) {
      gutil.log(error.message);
      this.emit('end');
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('./'));
});
// ---------------------------------------------------------------------------
gulp.task('rplc', () => {
  return gulp.src('./dist/*.html')
    .pipe(replace('&gt;', '>'))
    .pipe(gulp.dest('./dist'));
});
