var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	rename = require('gulp-rename');

gulp.task('js', function() {
	return gulp.src('map.js')
		.pipe(uglify())
		.on('error', function(error) {
			console.log(error);
		})
		.pipe(rename('map.min.js'))
		.pipe(gulp.dest('build'))
});

gulp.task('css', function() {
	return gulp.src('map.css')
		.pipe(minifyCSS({compatibility: 'ie8'}))
		.pipe(rename('map.min.css'))
		.pipe(gulp.dest('build'))
});

gulp.task('lint', function() {
	return gulp.src('map.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});

gulp.task('default', ['js', 'css']);