"use strict";
const   gulp = require('gulp'),
        webpack = require('webpack');

gulp.task('scripts',(done)=>{
    webpack(require('../../webpack.config'),(err, stats)=>{
        if(err) {
            console.log(`Webpack ${err}`);
        }
        console.log("Webpack finished webpacking");
    });
    done();
});

