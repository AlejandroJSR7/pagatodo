var gulp       = require( 'gulp' ),                // gulp
    plumber    = require( 'gulp-plumber' ),        // Show errors in console
    uglify     = require( 'gulp-uglify' ),         // Compress files js and css
    concat     = require( 'gulp-concat' ),         // Concatenate files js
    stylus     = require( 'gulp-stylus' ),         // Stylus
    http       = require( 'http' ),                // Server http
    connect    = require( 'gulp-connect' ),        // Server static
    livereload = require( 'gulp-livereload' ),     // Syng with browser
    includer   = require( 'gulp-htmlincluder' ),   // Html Includer (Code or components)
    imagemin   = require( 'gulp-imagemin' ),        // Optimize images
    changed = require('gulp-changed')
;

gulp.task('htmlIncluder', function(){
  gulp.src('html/**/*.html') 
      .pipe(includer())
      .pipe(gulp.dest('dist/'));
});

 
gulp.task('stylus2css', function(){
  gulp.src(['styles/pagatodo.styl'])
    .pipe(plumber())
    .pipe(stylus({ compress: false }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload());
});

gulp.task('pluginsjs', function(){
    return gulp.src([
      'scripts/vendors/jquery.min.js',
      'scripts/vendors/jqueryUI.min.js',
      'scripts/vendors/parallax.min.js',
      'scripts/vendors/slick.min.js',
      'scripts/vendors/mCustomScrollbar.min.js',
      'scripts/pagatodo.js',
      'scripts/components/fixed-menu.js',
      'scripts/vendors/retina.min.js'
    ])
      .pipe(plumber()) 
      .pipe(concat('pagatodo.js'))
//      .pipe(uglify())
      .pipe(gulp.dest('dist/js/'))
      .pipe(livereload());
});

gulp.task('assets', function() {
  var assets = {
    src: './assets/**/*',
    dest: './dist'
  };

  return gulp.src(assets.src)
    .pipe(changed(assets.dest))
    .pipe(gulp.dest(assets.dest))
    .pipe(livereload());

});


gulp.task('imagemin', function () {
  var images = {
    src: './images/**/*',
    dest: './dist/images'
  };

  return gulp.src(images.src)
    .pipe(changed(images.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(images.dest))
    .pipe(livereload());
});

gulp.task('connectServer', function(){
  connect.server({
    root: 'dist',
    port: 8888,
    livereload: true
  });
});

gulp.task('reloadHTML', function(){
  gulp.src('dist/')
      .pipe(livereload('dist/*.html'));
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(['./html/**/*.html'], ['htmlIncluder'])
  gulp.watch(['./dist/**/*.html'], ['reloadHTML'])
  gulp.watch(['./scripts/**/*.js'], ['pluginsjs']);
  gulp.watch(['./assets/**/*'], ['assets']);
  gulp.watch(['./images/**/*'], ['imagemin'])
  gulp.watch(['./styles/**/*.styl'], ['stylus2css'])
});

gulp.task('default', [ 'htmlIncluder', 'stylus2css', 'pluginsjs', 'assets', 'imagemin', 'connectServer', 'watch']);
