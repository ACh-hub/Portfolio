"use strict"

const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer');
        
sass.compiler = require('node-sass');
        
gulp.task('sass', ()=>{
    return gulp.src('./src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .on('error', ()=>{
        this.emit('end');
    })
    .pipe(gulp.dest('./src/temp/css/'));
});