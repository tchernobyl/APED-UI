var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    rev = require('gulp-rev'),
    rsync = require('rsyncwrapper').rsync
argv = require('yargs').argv;
var rename = require("gulp-rename");


var config = {
    path: {
        tmp: '.tmp',
        app: 'app',
        appData: 'app-data',
        build: 'build'
    }
};

gulp.task('connect', function () {
    connect.server({
        root: [__dirname, config.path.app, config.path.appData, config.path.tmp],
        livereload: true
    });
});

gulp.task('sass', function () {
    return gulp.src('app/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.path.tmp));
});

gulp.task('livereload', function () {
    gulp.src(['app/**/*.js', 'app/**/*.html', '.tmp/app.css'])
        .pipe(watch())
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('serve', ['sass', 'connect', /*'livereload',*/ 'watch', 'loginServe']);

gulp.task('clean', function (cb) {
    return rimraf(config.path.build, cb);
});

gulp.task('loginServe', function () {
    gulp.src(['config.local.php'])
        .pipe(rename('config.php'))
        .pipe(imagemin())
        .pipe(gulp.dest(''));
});

gulp.task('loginCrossDomain', function () {
    var buildEnv = argv.env || 'production';
    gulp.src(['login.php'])
        .pipe(imagemin())
        .pipe(gulp.dest(config.path.build + '/php'));

    gulp.src(['config.' + buildEnv + '.php'])
        .pipe(rename('config.php'))
        .pipe(imagemin())
        .pipe(gulp.dest(config.path.build + '/php'));
});

gulp.task('usemin', function () {
    var buildEnv = argv.env || 'production';

    gulp.src('app/index.html')
        .pipe(replace('app.css', '../.tmp/app.css'))
        .pipe(replace('<script src="app.js"></script>',
            '<script src="app.js"></script><script src="../.tmp/templates.js"></script>'))
        .pipe(replace('<script src="app-config.local.js"></script>',
            '<script src="app-config.' + buildEnv + '.js"></script>'))
        .pipe(replace('../bower_components/ckeditor/ckeditor.js', '/ckeditor/ckeditor.js'))
        .pipe(usemin({
            css: [
                minifyCss(),
                'concat',
                rev(),
                replace('../images', 'images'),
                replace('select2.png', 'images/select2.png'),
                replace('select2-spinner.gif', 'images/select2-spinner.gif')
            ],
            html: [minifyHtml({empty: true})],
            js: [
                uglify(),
                rev(),
                replace('../bower_components/zeroclipboard/dist/ZeroClipboard.swf', 'ZeroClipboard.swf')
            ]
        }))
        .pipe(gulp.dest(config.path.build));
});


gulp.task('images', function () {
    gulp.src('themes/supr/images/**/*')
//        .pipe(imagemin())
        .pipe(gulp.dest(config.path.build + '/css/images'));

    gulp.src('app/images/**/*')
//        .pipe(imagemin())
        .pipe(gulp.dest(config.path.build + '/images'));

    gulp.src(['bower_components/select2/*.png', 'bower_components/select2/*.gif'])
//        .pipe(imagemin())
        .pipe(gulp.dest(config.path.build + '/css/images'));
});


gulp.task('fonts', function () {
    gulp.src(['bower_components/font-awesome/fonts/**/*', 'bower_components/bootstrap/fonts/**/*'])
        .pipe(gulp.dest(config.path.build + '/fonts'));
});

gulp.task('template', function () {
    return gulp.src(['app/**/*.html', '!app/index.html', '!app/page-editor/**/*.html'])
        .pipe(templateCache({module: 'app'}))
        .pipe(gulp.dest(config.path.tmp));
});

gulp.task('template-editor', function () {
    return gulp.src(['app/page-editor/**/*.html', 'app/components/elements/**/*.html'])
        .pipe(templateCache({module: 'pageEditor', root: '../components/elements'}))
        .pipe(gulp.dest(config.path.tmp + '/page-editor'));
});

gulp.task('swf', function () {
    gulp.src('bower_components/zeroclipboard/dist/ZeroClipboard.swf')
        .pipe(gulp.dest(config.path.build));
});

gulp.task('build', function (callback) {
    runSequence('clean',
        ['sass', 'template', 'template-editor', 'fonts', 'images', 'swf', 'loginCrossDomain'],
        [ 'usemin' ],
        callback
    );
});

gulp.task('deploy', function () {
    rsync({
        ssh: true,
        src: 'build/.',
        dest: 'indra@dev.whizmarketingsystems.com:ui',
        recursive: true,
        syncDest: true,
        args: ['-avz']
    }, function (error, stdout, stderr, cmd) {
        gutil.log(stdout);
    });
});