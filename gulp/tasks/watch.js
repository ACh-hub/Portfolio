const   gulp = require('gulp'),
        browserSync = require('browser-sync').create();

gulp.task('watch', ()=>{

    browserSync.init({
        notify:false,
        server: {
            baseDir: "src"
        }
    });

    gulp.watch('./src/index.html',()=>{
        browserSync.reload();
    });

    gulp.watch('./src/scss/**/*.scss', ['injectCSS']);
   });

   gulp.task('injectCSS',['sass'],()=>{
       return gulp.src('./src/css/styles.css')
       .pipe(browserSync.stream());
   });