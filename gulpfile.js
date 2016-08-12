var gulp = require('gulp');
var files = ['/mnt/code/tangular-flow/app/**/*.js', '/mnt/code/tangular-flow/app/**/*.html'];
gulp.task('copy', function() {
    var stream = gulp.src(files)
    .pipe(gulp.dest('app/'));
    return stream;
});

// Watch the source code changes
gulp.task('default', function () {
    var watcher = gulp.watch(files,
        ['copy']);
    watcher.on('change', function(event) {
        console.log('File:' + event.path + ' was ' +
            event.type + ', running tasks..');
    });
});
