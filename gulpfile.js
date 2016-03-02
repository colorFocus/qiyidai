var gulp = require("gulp");
var del = require('del');
var jshint = require('gulp-jshint');
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require("watchify");
var imagemin = require('gulp-imagemin');
var gulpif = require('gulp-if');
var cache = require('gulp-cache');
var rename = require('gulp-rename');
var glob = require('glob');
var es = require('event-stream');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat");
var copy = require('gulp-copy');

var VERSION = '20160220';

//dev
var FILE = {
    entries: ['./scripts/project/demo/tab_demo.js'],
    debug: true,
    cache: {},
    packageCache: {},
    plugin: [watchify]
};

function doBundle(bundler){
    return bundler
        .bundle()
        .pipe(source(FILE.entries[0]))
        .pipe(rename({
            extname: '.bundle.js'
        }))
        .pipe(gulp.dest('./dist'));
}

gulp.task('bundleone', function(){
    var b = browserify(FILE);
    b.on('update', function(){doBundle(b)});
    return doBundle(b);
});

gulp.task('concat', function () {
    return gulp.src('./scripts/lib/*.js')
        .pipe(concat('common.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('devstyles', function() {
  return gulp.src('./styles/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('copy', function(){
    return gulp.src(['./fonts/*','./images/**/*'])
        .pipe(copy('./dist'));
});

gulp.task('watch', function(){
    gulp.watch('./styles/**/*.scss', ['devstyles']);
    gulp.watch('./scripts/lib/*.js', ['concat']);
    gulp.watch('./images/**/*', ['copy']);
});


//prod
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('jshint', function() {
    return gulp.src(['./scripts/**/*.js', '!./scripts/lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('bundle', function(done) {
    glob('./scripts/project/**/*.js', function(err, files) {
        if(err) done(err);
        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(rename({
                    extname: '.bundle.js'
                }))
                .pipe(gulp.dest('./dist'));
            });
        es.merge(tasks).on('end', done);
    });
});

gulp.task('images', function() {
  return gulp.src('./images/**/*')
    .pipe(gulpif(gulpif.isFile, cache(imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
        console.log(err);
        this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
  return gulp.src('./fonts/*.{eot,svg,ttf,woff}')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', function() {
  return gulp.src('./styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass.sync({
        outputStyle: '',
        precision: 10,
        includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe(gulp.dest('dist/styles'))
});




gulp.task('dev', ['bundleone', 'concat', 'devstyles', 'copy', 'watch']);
gulp.task('build', ['images', 'fonts', 'styles', 'jshint', 'bundle', 'concat']);
gulp.task('default', ['clean', 'build']);