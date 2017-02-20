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
    'jquery': './vendor/bower_components/jQuery/dist/',
    'bootstrap': './vendor/bower_components/bootstrap-sass-official/assets/',
    'lang': './vendor/bower_components/jquery-lang-js/js/',
    'two': './vendor/bower_components/two.js/build/',
    'greensock': '/vendor/bower_components/gsap/src/minified/',
    'pace': './vendor/bower_components/PACE/'
};

elixir(function(mix) {

    mix.webpack('app.js');

    mix.copy('./resources/assets/js/lang/**', 'public/js/lang' );
    mix.copy('./resources/assets/js/split/**', 'public/js/split' );
    mix.copy('./resources/images', 'public/images');
    mix.copy( paths.pace + 'themes/black/**', 'public/css')

    mix.sass("app.scss", 'public/css/')
        .copy(paths.bootstrap + 'fonts/bootstrap/**', 'public/fonts')
        .scripts([
            paths.jquery + "jquery.min.js",
            paths.lang + "js.cookie.js",
            paths.lang + "jquery-lang.js",
            paths.two + "two.js",
            paths.pace + "pace.min.js"
        ], 'public/js/vendor.js', './');

});
