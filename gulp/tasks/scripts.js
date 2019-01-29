"use strict";
const   gulp = require('gulp'),
        webpack = require('webpack');

gulp.task('scripts',(done)=>{
    webpack(require('../../webpack.config'),()=>{
        console.log("Webpack finished webpacking");
    });
    done();
});

