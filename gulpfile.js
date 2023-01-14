"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const pug = require("gulp-pug");

/* Зпауск через OpenServer чтобы работала отправка данных, например на странице stoks и stockItem */
// const dist = "c:/OpenServer/domains/SmartProject/dist/"; 
const dist = "./dist/";
const prod = "./build/";

/* Настраиваю pug (шаблонизатор).Pug сразу отправляет html страницу в dist */
gulp.task("build-pug", function () {
  return gulp.src('src/pug/pages/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest(dist))
      .pipe(browsersync.stream());
});
// 
/* Если делаем одностраничник то ниже закоментированный код включем, а pug выключаем и наоборот если делаем многостраничник то включаем pug, код тот что выше данного комментария и выключаем "copy-html"*/
/* gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
}); */

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("build-sass", () => {
    return gulp.src("./src/sass/style.scss")
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/pug/**/*.*", gulp.parallel("build-pug"));
    // gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/sass/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel(/* "copy-html", */ "copy-assets", "build-sass", "build-js", "build-pug"));

gulp.task("prod", () => {
    gulp.src("./src/index.html")
        .pipe(gulp.dest(prod));
    gulp.src("./src/assets/**/*.*")
        .pipe(gulp.dest(prod + "/assets"));

    gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [['@babel/preset-env', {
                            debug: false,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                      }
                    }
                  }
                ]
              }
        }))
        .pipe(gulp.dest(prod));
    
    return gulp.src("./src/sass/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(prod));
});

gulp.task("default", gulp.parallel("watch", "build"));