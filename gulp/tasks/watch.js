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

    gulp.watch('./src/scss/**/*.scss', gulp.series('injectCSS'));
   });

   gulp.task('injectCSS',gulp.series('sass'),()=>{
       return gulp.src('./src/css/styles.css')
       .pipe(browserSync.stream())
       .on('error',()=>{
           this.emit('end');
       });
       
   });