let gulp = require('gulp');
let browserSync = require('browser-sync');

gulp.task('default', function(){
    browserSync.create().init({
        server: "./"
    });
    browserSync.stream();
});

 