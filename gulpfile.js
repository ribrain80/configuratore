const elixir = require('laravel-elixir');

//require('laravel-elixir-vue-2');

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


elixir((mix) => {

    /*mix.sass('app.scss')
       .webpack('app.js');*/

	mix.scripts([
	    './resources/assets/bower/jquery/dist/jquery.js',
	    './resources/assets/bower/jquery-lang-js/js/jquery-lang.js',
	    './resources/assets/bower/js-cookie/src/js.cookie.js',
	    './resources/assets/bower/bootstrap/dist/js/bootstrap.js',
	    './resources/assets/bower/two.js/build/two.min.js'
	], 'public/js/vendor.js' ).version('js/vendor.js');

	mix.scripts('./resources/assets/js/lang/en.json', 'public/js/lang/en.json' );
	mix.scripts('./resources/assets/js/split/step1.js', 'public/js/split/step1.js' );

	mix.styles([
        'main.css'
    ]).version( 'css/all.css');

});
