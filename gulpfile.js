var gulp = require("gulp");
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task("compileTs", async function () {
    const bundle = await rollup.rollup({
        input: './src/script/main.ts',
        plugins: [
            rollupTypescript({
                tsconfig: "tsconfig.json"
            })
        ]
    });

    await bundle.write({
        file: './dist/script/main.js',
        format: 'iife',
        name: 'library',
        sourcemap: "inline"
    });
})

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  });


gulp.task("default", ["compileTs", "sass"], function () {
    gulp.watch("src/script/*.ts", ["compileTs"])
    gulp.watch('src/sass/**/*.scss', ['sass']);
    
    
    
    gulp.watch(["dist/**/*", "index.html"]).on("change", browserSync.reload)
    browserSync.init({
        proxy: "localhost:3000"
    });
});