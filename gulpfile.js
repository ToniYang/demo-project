/**
 * Created by yangyuhan on 4/10/15.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');
var es = require('event-stream');

gulp.task('coffee',function(){
    gulp.src('web-project/todo-mvc/src/coffee/**/**.coffee').pipe(coffee())
        .pipe(gulp.dest('web-project/todo-mvc/src/js'))
});

gulp.task('copy-lib' , function (){
    gulp.src('web-project/todo-mvc/src/coffee/**/**.js')
        .pipe(gulp.dest('web-project/todo-mvc/src/js'))
});

gulp.task('default' ,['coffee','copy-lib']);