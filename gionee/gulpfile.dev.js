// console.log("生产环境")

// 生产环境 dev

// 1. 文件转存 : html , scss , js 
// html : 1. 转存  2. 压缩;
// scss : 1. 编译成 css  2. 压缩 3. 转存;
// js   : 1. (ES6) 编译成 ES5 : babel  2. 压缩  3. 转存;

// 2. 监听 : watch 让 gulp 监视文件是否改变，如果文件改变执行指令;

const gulp = require("gulp");
// const htmlmin = require('gulp-htmlmin');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const cleanCSS = require('gulp-clean-css');
// gulp-sass 免翻墙版;
const sass = require('gulp-sass-china');
// sass解析工具 不使用 node-sass 使用 sass;
sass.compiler = require('sass');
// 服务器工具
const connect = require("gulp-connect");
// 服务器代理工具
let proxy = require("http-proxy-middleware").createProxyMiddleware;
// html 拼接工具
const fileinclude = require('gulp-file-include');


// html 操作执行;
gulp.task("html", async() => {
    // 1. 找到html的源文件;
    // 2. 数据放到pipe() 之中;
    // 3. 转存到 dist 文件之中;
    gulp.src(["./src/html/**/*.html", "!./src/html/template/**/*.html"])
        // html 压缩; 使用的时候有可能传入配置参数;
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist/html"))
        //  转存结束之后自动刷新浏览器;
        .pipe(connect.reload())
})

gulp.task("js", async() => {
        gulp.src(["./src/js/**/*.js", "!./src/js/libs/**/*.js"])
            // .pipe(babel({
            //     presets: ['@babel/env']
            // }))
            // .pipe(uglify())
            .pipe(gulp.dest("./dist/js"))
            .pipe(connect.reload())
    })
    // 对大文件进行一次转存;
gulp.task("libs", async() => {
    gulp.src(["./src/js/libs/**/*.js"])
        .pipe(gulp.dest("./dist/js/libs"))
        .pipe(connect.reload())
})

gulp.task("scss", async() => {
    gulp.src(["./src/scss/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        // .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload())
})

gulp.task("images", async() => {
    gulp.src(["./src/images/**/*.{png,jpg,jpeg,gif,ico}"])
        .pipe(gulp.dest("./dist/images"))
        .pipe(connect.reload())
        //  转存结束之后自动刷新浏览器;
})

// 测试指令是否好用，如果好用再继续进行整合操作;

// 1. 监听 :  watch 

gulp.task("watch", async() => {
    // 检测文件改变，如果改变就执行指令;
    gulp.watch(["./src/html/**/*.html"], gulp.parallel("html"));
    gulp.watch(["./src/js/**/*.js"], gulp.parallel("js"));
    gulp.watch(["./src/scss/**/*.scss"], gulp.parallel("scss"));
    gulp.watch(["./src/images/**/*.{png,jpg,jpeg,gif,ico}"], gulp.parallel("images"));
})

// 测试watch指令;

// 2. 默认指令 ;
// gulp.task("default" , gulp.parallel("watch" , "libs"))

// 插件使用 : 
// 1. 下载;
// 2. 引入;
// 3. 使用;

// gulp 服务器 : 

// 1. 测试服务器; => 主动刷新功能;  文件更改，浏览器自动刷新;
// 2. 代理功能; 代理可以不使用 nginx 使用nodejs 

// 服务器指令 
// 我们在nodejs服务器之中不能执行php!;
// 所有后缀为.php 的文件在这个服务器下无法执行;  http://localhost:3000

gulp.task("connect", async() => {
    connect.server({
        root: "./dist",
        port: 3000,
        // 开启自动刷新功能
        livereload: true,
        middleware: function() {
            return [
                // pxx 不能和路径里面的任意数据重合
                // proxy (代理的路径 , 配置的参数)
                proxy("/pxx", {
                    // 代理目标;
                    target: "https://apiv2.pinduoduo.com/api/gindex/subject/limited/goods",
                    // 必须切换源内容;
                    changeOrigin: true,
                    // 重写源上的部分内容;
                    pathRewrite: {
                        "/pxx": ""
                    }
                }),
                proxy("/dt", {
                    target: "https://www.duitang.com/napi/blog/list/by_filter_id/",
                    changeOrigin: true,
                    pathRewrite: {
                        "/dt": ""
                    }
                }),
            ]
        }

    });
});

// 执行顺序 : 
// 1. 先让libs进行转存
// 2. 开启 watch 和 connect ;
gulp.task("dev", gulp.series("libs", "html", "js", "scss", "images", gulp.parallel("watch", "connect")));