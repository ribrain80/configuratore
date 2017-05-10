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
    'lightgallerythumb': './vendor/bower_components/lg-thumbnail/dist/',
    'fabric': './resources/assets/js/lib/'
};

elixir(function(mix) {

    //Build Application logic
    mix.webpack('app.js');

    //Copy resurces
    mix.copy('./resources/assets/css/pdf.css', 'public/css' );
    mix.copy('./resources/images', 'public/images');
    mix.copy('./resources/pdf/brochure.pdf', 'public/pdf/brochure.pdf');
    mix.copy('./resources/pdf/help.pdf', 'public/pdf/help.pdf');
    mix.copy( paths.pace + 'themes/orange/**', 'public/css');
    mix.copy( paths.lightgallery + 'css/lightgallery.css', 'public/css');
    mix.copy( paths.lightgallery + 'img/**', 'public/img');
    mix.copy( paths.lightgallery + 'fonts/**', 'public/fonts');
    mix.copy( paths.fabric + 'fabric.js', 'public/js/lib/fabric');

    // Salice Fonts
    mix.copy('./resources/assets/salicefonts/**', 'public/salicefonts' );

    //Compile scss and build vendor.js
    mix.sass("app.scss", 'public/css/')
        .copy(paths.bootstrap + 'fonts/bootstrap/**', 'public/fonts')
        .scripts([
            paths.jquery + "jquery.js",
            paths.two + "two.js",
            paths.pace + "pace.js",
            paths.lightgallery + "js/lightgallery.js",
            paths.lightgallerythumb + "lg-thumbnail.js",
        ], 'public/js/vendor.js', './');

    //Join css and scripts
    mix.styles([
        'public/css/pace-theme-loading-bar.css',
        'public/css/lightgallery.css',
        'public/css/app.css'
    ], 'public/css/split.css', './');

    // Combine vendor and app js
    mix.scripts(['public/js/vendor.js','public/js/app.js'],'public/js/split.js','./');

    //Versiong files

    mix.version(['public/css/split.css', 'public/js/split.js']);

});
