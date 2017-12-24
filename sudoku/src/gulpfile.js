const gulp = require('gulp')

//转译 JavaScript
gulp.task('webpack', () => {
    const webpack = require('webpack-stream')
    const config = require('./webpack.config.js')
    gulp.src('./js/**/*.js')
        .pipe(webpack(config))
        .pipe(gulp.dest('../www/js'))
})

//编译 sass -> css
gulp.task('sass', () => {
    const sass = require('gulp-sass')
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../www/css'))
})

gulp.task('default', ['webpack', 'sass'])

gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', ['sass'])
    gulp.watch('js/**/*.js', ['webpack'])
})
