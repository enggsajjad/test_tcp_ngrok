var gulp = require('gulp');

var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "192.168.33.21"
  });
});