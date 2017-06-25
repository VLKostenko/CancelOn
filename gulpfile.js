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
  gutil = require('gulp-util'),
  concat = require('gulp-concat');

var retinaOpts = {};

var folders = {
  assets: 'assets/plugins/',
  src: 'src/',
  dst: ''
};

var path = {
  build: {
    html: folders.dst,
    partHtml: folders.dst + 'partial/',
    js_scripts: folders.dst + 'js/',
    js_assets: folders.dst + 'js/',
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
    js_scripts: folders.src + 'js/**/*.js',
    // js_assets: folders.assets + '**/*.min.js',
    js_assets: [
      'assets/plugins/jquery/dist/jquery.min.js',
      'assets/plugins/bootstrap/dist/js/bootstrap.js',
      'assets/plugins/moment/min/moment.min.js',
      'assets/plugins/datarangepicker/jquery.datarangepicker.js',
      'assets/plugins/bootstrap-dropdown-hover/dist/jquery.bootstrap-dropdown-hover.min.js',
      'assets/plugins/bootstrap-select/dist/js/bootstrap-select.js',
      'assets/plugins/bootstrap-validator/dist/validator.min.js',
      'assets/plugins/jquery-ui/jquery-ui.min.js',
      'assets/plugins/owl.carousel/dist/owl.carousel.min.js',
      'assets/plugins/owl.carousel2.thumbs/dist/owl.carousel2.thumbs.js',
      'assets/plugins/matchHeight/dist/jquery.matchHeight-min.js',
      'assets/plugins/modernizr/modernizr.js',
      'assets/plugins/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
      'assets/plugins/aos/dist/aos.js',
      'assets/plugins/photoswipe/dist/photoswipe.min.js',
      'assets/plugins/photoswipe/dist/photoswipe-ui-default.min.js',
      'assets/plugins/semantic-ui/semantic.min.js',
      'assets/plugins/disableScroll/jquery.disablescroll.min.js',
      'assets/plugins/chart.js/dist/Chart.min.js'
    ],
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
    js_scripts: folders.src + 'js/**/*.js',
    js_assets: folders.assets + '**/*.js',
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

gulp.task('js-assets:build', function() {
  gulp.src(path.src.js_assets)
    .pipe(concat('assets.min.js'))
    .pipe(gulp.dest(path.build.js_assets));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js_scripts)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_scripts))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }).on('error', gutil.log))
    .pipe(gulp.dest(path.build.js_scripts));
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
    // .pipe(imagemin({
    //   progressive: true,
    //   svgoPlugins: [{removeViewBox: false}],
    //   use: [pngquant()],
    //   interlaced: true
    // }))
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
  'js-assets:build',
  'js:build',
  'fonts:build',
  'images:build',
  'browser:sync'
]);

gulp.task('watch', function () {
  gulp.watch([path.watch.pug], function (event, cb) {
    gulp.start('pug:build', 'html:build');
  });
  gulp.watch([path.watch.css], function (event, cb) {
    gulp.start('styles:build');
  });
  gulp.watch([path.watch.js_assets], function (event, cb) {
    gulp.start('js-assets:build');
  });
  gulp.watch([path.watch.js_scripts], function (event, cb) {
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