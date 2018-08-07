var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	cfg = require('./_config')();

gulp.task('browserSync', function () {
	browserSync.create();
	browserSync.init({
		server: 'dist'
	});

	gulp.watch([cfg.src.templates + '/**/*.hbs'], ['handlebars']);
	gulp.watch([cfg.src.sass], ['sass']);
	gulp.watch([cfg.src.images], ['images']);

	gulp.watch(cfg.dist.htmlFiles).on('change', browserSync.reload);
});
