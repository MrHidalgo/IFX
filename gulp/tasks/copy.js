var gulp   = require('gulp');
var config = require('../config');

gulp.task('copy:fonts', function() {
  return gulp
    .src(config.src.fonts + '/*.{ttf,eot,woff,woff2,svg}')
    .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:pdf', function() {
  return gulp
    .src(config.src.pdf + '/*.pdf')
    .pipe(gulp.dest(config.dest.pdf));
});

gulp.task('copy:quote', function() {
  return gulp
    .src(config.src.quote + '/**')
    .pipe(gulp.dest(config.dest.quote));
});


gulp.task('copy:addJS', function() {
  return gulp
    .src(config.src.addJs + '/**')
    .pipe(gulp.dest(config.dest.addJs));
});

gulp.task('copy:vendor', function() {
  return gulp
    .src(config.src.vendor + '/**/*.*')
    .pipe(gulp.dest(config.dest.vendor));
});

gulp.task('copy:rootfiles', function() {
  return gulp
    .src(config.src.root + '/*.*')
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy', [
  // 'copy:rootfiles',
  'copy:vendor',
  'copy:fonts',
  'copy:pdf',
  'copy:addJS',
  'copy:quote'
]);

gulp.task('copy:watch', function() {
  gulp.watch(config.src.vendor + '/**/*.*', ['copy:vendor']);
  gulp.watch(config.src.root + '/*.*', ['copy:rootfiles']);
});
