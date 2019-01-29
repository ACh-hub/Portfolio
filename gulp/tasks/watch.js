const   gulp = require('gulp'),
browserSync = require('browser-sync').create();

function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('watch', ()=>{
    
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    
    gulp.watch('./src/index.html', gulp.series(reload));
    
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'));

    gulp.watch('./src/scss/**/*.scss', gulp.series('injectCSS', reload));

});
