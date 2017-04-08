const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */


var paths = {
    'jquery': './vendor/bower_components/jquery/dist/',
    'bootstrap': './vendor/bower_components/bootstrap-sass-official/assets/',
    'material': './node_modules/bootstrap-material-design/dist/',
    'two': './vendor/bower_components/two.js/build/',
    'pace': './vendor/bower_components/PACE/',
    'lightgallery': './vendor/bower_components/lightgallery/dist/',
    'lightgallerythumb': './vendor/bower_components/lg-thumbnail/dist/'
};

elixir(function(mix) {

    //Build Application logic
    mix.webpack('app.js');


    //Copy resurces
    mix.copy('./resources/assets/css/pdf.css', 'public/css' );
    mix.copy('./resources/images', 'public/images');
    mix.copy('./resources/pdf/brochure.pdf', 'public/pdf/brochure.pdf');
    mix.copy( paths.pace + 'themes/black/**', 'public/css');
    mix.copy( paths.lightgallery + 'css/lightgallery.min.css', 'public/css');
    mix.copy( paths.lightgallery + 'img/**', 'public/img');
    mix.copy( paths.lightgallery + 'fonts/**', 'public/fonts');
    mix.copy( paths.material + 'css/**', 'public/css');
    mix.copy( paths.material + 'js/**', 'public/js');


    // Salice Fonts
    mix.copy('./resources/assets/salicefonts/**', 'public/salicefonts' );



    //Compile scss and build vendor.js
    mix.sass("app.scss", 'public/css/')
        .copy(paths.bootstrap + 'fonts/bootstrap/**', 'public/fonts')
        .scripts([
            paths.jquery + "jquery.min.js",
            paths.two + "two.js",
            paths.pace + "pace.min.js",
            paths.lightgallery + "js/lightgallery.min.js",
            paths.lightgallerythumb + "lg-thumbnail.min.js",
        ], 'public/js/vendor.js', './');

    //Join css and scripts
    mix.styles([
        'public/css/app.css',
        'public/css/pace-theme-loading-bar.css',
        'public/css/lightgallery.min.css'
    ], 'public/css/split.css', './');
    mix.scripts(['public/js/vendor.js','public/js/app.js'],'public/js/split.js','./');

    //Versiong files

  /*  mix.version('public/css/split.css');
    mix.version(['public/css/split.css', 'public/js/split.js']);*/


});
