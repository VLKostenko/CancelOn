'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  reload = browserSync.reload,
  clip = require('gulp-clip-empty-files'),
  saveLicense = require('uglify-save-license'),
  lessToScss = require('gulp-less-to-scss'),
  imgRetina = require('gulp-img-retina'),
  pug = require('gulp-pug'),
  gutil = require('gulp-util');

var retinaOpts = {};

var folders = {
  src: 'src/',
  dst: ''
};

var path = {
  build: {
    html: folders.dst,
    partHtml: folders.dst + 'partial/',
    js_bootstrap: folders.dst + 'js/',
    js_ds_custom: folders.dst + 'js/',
    js_ds_plugins: folders.dst + 'js/',
    js_ds_scripts: folders.dst + 'js/',
    css: folders.dst + 'css/',
    css_template: folders.dst + 'css/',
    css_base_sizing: folders.dst + 'css/',
    css_custom: folders.dst + 'css/',
    css_ds_components: folders.dst + 'css/',
    css_bootstrap: folders.dst + 'css/',
    img: folders.dst + 'images/',
    fonts: folders.dst + 'assets/font/',
    less: folders.src + 'styles/'
  },
  src: {
    html: folders.src + '*.html',
    pug: folders.src + '*.pug',
    pugPart: folders.src + 'parts/partial/*.pug',
    //js
    js_bootstrap: folders.src + 'js/bootstrap.js',
    js_ds_custom: folders.src + 'js/ds-custom.js',
    js_ds_plugins: folders.src + 'js/ds-plugins.js',
    js_ds_scripts: folders.src + 'js/**/*.js',
    //css
    css: folders.src + 'styles/**/*.scss',
    less: folders.src + 'styles/**/*.less',
    img: [
      folders.src + 'images/**/*.*'
    ],
    fonts: folders.src + 'fonts/**/*.*'
  },
  watch: {
    html: folders.src + '**/*.html',
    pug: folders.src + '**/*.pug',
    css: folders.src + 'styles/**/*.scss',
    less: folders.src + 'styles/**/*.less',
    js_bootstrap: folders.src + 'js/**/*.js',
    js_ds_custom: folders.src + 'js/**/*.js',
    js_ds_plugins: folders.src + 'js/**/*.js',
    js_ds_scripts: folders.src + 'js/**/*.js',
    img: [
      folders.src + 'images/**/*.*'
    ],
    fonts: folders.src + 'fonts/**/*.*'
  }
};

gulp.task('lessToScss',function(){
  gulp.src(path.src.less)
    .pipe(lessToScss())
    .pipe(gulp.dest(path.build.less));
});

gulp.task('browser:sync', function() {
  browserSync.init({
    server: {
      baseDir: path.build.html
    },
    open: false
  });
  gulp.watch(path.src.css).on("end", reload);
});

gulp.task('html:build', function () {
  gulp.src(path.src.pugPart)
    .pipe(rigger())
    .pipe(pug({ pretty: true }).on('error', gutil.log))
    .pipe(imgRetina(retinaOpts))
    .pipe(gulp.dest(path.build.partHtml));
});

gulp.task('pug:build', function () {
  gulp.src(path.src.pug)
    .pipe(rigger())
    .pipe(pug({ pretty: true }).on('error', gutil.log))
    .pipe(imgRetina(retinaOpts))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js_bootstrap)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_bootstrap))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest(path.build.js_bootstrap));

  gulp.src(path.src.js_ds_custom)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_ds_custom))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest(path.build.js_ds_custom));

  gulp.src(path.src.js_ds_plugins)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_ds_plugins))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest(path.build.js_ds_plugins));

  gulp.src(path.src.js_ds_scripts)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_ds_scripts))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }).on('error', gutil.log))
    .pipe(gulp.dest(path.build.js_ds_scripts));
});

gulp.task('styles:build', function () {
  gulp.src(path.src.css)
    .pipe(clip())
    .pipe(sass({
      includePaths: ['src/styles/'],
      outputStyle: 'expanded',
      sourceMap: true,
      errLogToConsole: true
    }).on('error', gutil.log))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css_template))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css_template));
    // .pipe(reload({ stream:true }))
});


gulp.task('images:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'pug:build',
  'html:build',
  'styles:build',
  'js:build',
  'fonts:build',
  'images:build',
  'browser:sync'
]);

gulp.task('watch', function () {
  gulp.watch([path.watch.pug], function (event, cb) {
    gulp.start('pug:build', 'html:build');
  });
  //css
  gulp.watch([path.watch.css], function (event, cb) {
    gulp.start('styles:build');
  });
  //js
  gulp.watch([path.watch.js_bootstrap], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.js_ds_custom], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.js_ds_plugins], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.js_ds_scripts], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.img], function (event, cb) {
    gulp.start('images:build');
  });
  gulp.watch([path.watch.fonts], function (event, cb) {
    gulp.start('fonts:build');
  });
});


gulp.task('default', ['build', 'watch', 'browser:sync']);