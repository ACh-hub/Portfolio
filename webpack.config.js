"use strict";
const path = require('path');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: path.resolve(__dirname, "./src/temp/scripts"),
        filename: "app.js"
    }
}
