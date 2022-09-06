const { src, dest, series, parallel, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-dart-sass');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const reload = browserSync.reload;

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	distSass: './dist/css',
	js: './src/js/**/*.js',
	distJs: './dist/js',
};
function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename('./style.min.css'))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.distSass));
	done();
}
function javaScript(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(rename('./main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.distJs));
	done();
}
function startBrowserSync(done) {
	browserSync.init({
		notify: false,
		server: {
			baseDir: './',
		},
	});

	done();
}
function watchForChanges(done) {
	watch('./*.html').on('change', reload);
	watch(
		[paths.html, paths.sass, paths.js],
		parallel(sassCompiler, javaScript)
	).on('change', reload);
	done();
}
const mainFunctions = parallel(sassCompiler, javaScript);
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
