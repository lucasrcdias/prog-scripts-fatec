var gulp        = require('gulp');
var pug         = require('gulp-pug');
var stylus      = require('gulp-stylus');
var concat      = require('gulp-concat');
var koutoSwiss  = require('kouto-swiss');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var plumber     = require('gulp-plumber');
var prefixer    = require('autoprefixer-stylus');
var browserSync = require('browser-sync').create();
var gcmq        = require('gulp-group-css-media-queries');

var srcPaths = {
  js:        'src/js/**/*.js',
  pug:       'src/pug/*.pug',
  stylus:    'src/stylus/**/*.styl',
  mainStyl:  'src/stylus/main.styl',
  vendorJs:  'src/vendor/**/*.js',
  vendorCss: 'src/vendor/**/*.css'
};

var buildPaths = {
  pug:   'build/',
  js:    'build/js/',
  css:   'build/css/',
  build: 'build/**/*'
}

gulp.task('watch', function() {
  gulp.watch(srcPaths.js, ['js']);
  gulp.watch(srcPaths.pug, ['pug']);
  gulp.watch(srcPaths.stylus, ['stylus']);
});

gulp.task('pug', function() {
  return gulp.src(srcPaths.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildPaths.pug))
    .pipe(browserSync.stream());
});

gulp.task('stylus', function() {
  return gulp.src([srcPaths.vendorCss, srcPaths.mainStyl])
    .pipe(plumber())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer()],
      compress: true
    }))
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(buildPaths.css))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src([srcPaths.vendorJs, srcPaths.js])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(buildPaths.js))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
  var files = [
    buildPaths.build
  ];

  browserSync.init(files, {
    server: {
      port: 8000,
      baseDir: './build/'
    },
  });
});

gulp.task('default', ['browser-sync', 'stylus', 'pug', 'js', 'watch']);
