var gulp = require("gulp"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    cssmin = require("gulp-cssmin"),
    del = require('del');

var nodeRoot = './node_modules/';
var targetPath = './wwwroot/lib/';

//Convert less to css
gulp.task("compile:less", function () {
    return gulp.src("Styles/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("./wwwroot//css"));
});
//Minify css
gulp.task("minify:css", function () {
    return gulp.src(["./wwwroot/css/**/*.css", "!" + "./wwwroot/css/**/*.min.css"], { base: "." })
        .pipe(cssmin())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest("."));
});
//Clean existing
gulp.task('clean', async function () {
    del([targetPath + '**/*']);
});
//Copy npm libraries to wwwroot folder
gulp.task('extract2wwwroot', async function () {
    gulp.src(nodeRoot + "bootstrap/dist/js/*").pipe(gulp.dest(targetPath + "/bootstrap/dist/js"));
    gulp.src(nodeRoot + "bootstrap/dist/css/*").pipe(gulp.dest(targetPath + "/bootstrap/dist/css"));
    gulp.src(nodeRoot + "bootstrap/dist/fonts/*").pipe(gulp.dest(targetPath + "/bootstrap/dist/fonts"));

    gulp.src(nodeRoot + "jquery/dist/jquery.js").pipe(gulp.dest(targetPath + "/jquery/dist"));
    gulp.src(nodeRoot + "jquery/dist/jquery.min.js").pipe(gulp.dest(targetPath + "/jquery/dist"));
    gulp.src(nodeRoot + "jquery/dist/jquery.min.map").pipe(gulp.dest(targetPath + "/jquery/dist"));

    gulp.src(nodeRoot + "jquery-validation/dist/*.js").pipe(gulp.dest(targetPath + "/jquery-validation/dist"));

    gulp.src(nodeRoot + "jquery-validation-unobtrusive/dist/*.js").pipe(gulp.dest(targetPath + "/jquery-validation-unobtrusive"));

    //Need version 1.11.5 which is not available on NPM.
    //gulp.src(nodeRoot + "jquery.dataTables.min.js/js/*").pipe(gulp.dest(targetPath + "/dataTables/js"));
    //gulp.src(nodeRoot + "jquery.dataTables.min.js/css/*").pipe(gulp.dest(targetPath + "/dataTables/css"));

    gulp.src(nodeRoot + "datatables.net-se/js/*").pipe(gulp.dest(targetPath + "/datatables.net-se/js"));
    gulp.src(nodeRoot + "datatables.net-se/css/*").pipe(gulp.dest(targetPath + "/datatables.net-se/css"));

    gulp.src(nodeRoot + "datatables.net-searchpanes-se/js/*").pipe(gulp.dest(targetPath + "/datatables.net-searchpanes-se/js"));
    gulp.src(nodeRoot + "datatables.net-searchpanes-se/css/*").pipe(gulp.dest(targetPath + "/datatables.net-searchpanes-se/css"));

    gulp.src(nodeRoot + "datatables.net-searchpanes/js/*").pipe(gulp.dest(targetPath + "/datatables.net-searchpanes/js"));
  
    gulp.src(nodeRoot + "moment/min/*").pipe(gulp.dest(targetPath + "/moment/min"));
});