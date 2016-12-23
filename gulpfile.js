var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('dist', function(){
	gulp.src('src/base64.js')
		.pipe(gulp.dest('dist/'));
	gulp.src('src/base64.js')
        .pipe(uglify())
        .pipe(rename('base64.min.js'))
        .pipe(gulp.dest('dist/'));
});