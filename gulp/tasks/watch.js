const   gulp = require('gulp'),
        browserSync = require('browser-sync').create();

gulp.task('watch', ()=>{

    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch('./src/index.html',()=>{
        browserSync.reload();
    });

    gulp.watch('./src/scss/**/*.scss', gulp.series('injectCSS'));
   });

   gulp.task('injectCSS',gulp.series('sass'),()=>{
       return gulp.src('./src/css/styles.css')
       .pipe(browserSync.stream());
   });