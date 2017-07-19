<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// # Root route
Route::get( '/', function () {
    return redirect()->route( 'startapp' );
});




Route::get('sitemap.xml', function(){

    // create new sitemap object
    $sitemap = App::make("sitemap");

    // set cache key (string), duration in minutes (Carbon|Datetime|int), turn on/off (boolean)
    // by default cache is disabled
    $sitemap->setCache('laravel.sitemap4', 60);

    // check if there is cached sitemap and build new only if is not
    if (!$sitemap->isCached())
    {

        $container = [];

        // # Directory iterator
        $iterator = new \DirectoryIterator(  "./images/gallery/images"  );

        // # Loop through files and dir
        foreach( $iterator as $item ) {

            // # Avoid dirs
            if( is_dir( $item ) ) {
                continue;
            }

            // # Get pathname
            $path = ltrim( $item->getPathname(), "." );
            $tmp[ 'url'] = URL::to($path);
            $tmp[ 'title' ] = "Composizioni salice";
            $container[] = $tmp;
        }


        $lastModToday = \Carbon\Carbon::now()->format('y-m-d\Thh:ii:ss+02:00');
        $sitemap->add(URL::to('/'), $lastModToday, '1.0', 'daily', $container);
        $sitemap->add(URL::to('/split/step1'), $lastModToday, '0.9', 'monthly', $container);

    }

    // show your sitemap (options: 'xml' (default), 'html', 'txt', 'ror-rss', 'ror-rdf')
    return $sitemap->render('xml');

});




// # Split route
Route::group( [ 'prefix' => 'split' ], function () {

    // # API
    Route::get('drawerstypes',['as'=>'split.api.drawerstypes','uses'=>'ApiController@actionDrawersType']);
    Route::get('dividers',['as'=>'split.api.dividers','uses'=>'ApiController@actionDividers']);
    Route::get('dividersplain',['as'=>'split.api.dividersplain','uses'=>'ApiController@actionPlainDividers']);
    Route::get('bridges',['as'=>'split.api.bridges','uses'=>'ApiController@actionBridges']);
    Route::get('supports',['as'=>'split.api.bridges','uses'=>'ApiController@actionSupports']);
    Route::get('edgestextures',['as'=>'split.api.edgesTextures','uses'=>'ApiController@actionEdgesFinitures']);
    Route::post('savedrawer',['as'=>'split.api.savedrawer','uses'=>'SplitDrawerController@actionSave']);
    Route::get('gallery-images', ['as'=>'split.api.gallery-images','uses'=>'ApiController@actionGalleryImages']);
    Route::get('carousel-images', ['as'=>'split.api.carousel-images','uses'=>'ApiController@actionCarouselImages']);
    

    // # EXPORT TO PDF
    Route::get('topdf/debug/{drawer}',['as'=>'split.export.topdf.debug','uses'=>'ExportController@actionDebug']);
    Route::get('topdf/header/{drawer}/{lang?}',['as'=>'split.pdf.header','uses'=>'ExportController@actionHeader']);
    Route::get('topdf/{id}/{brochure?}/{lang?}',['as'=>'split.export.topdf','uses'=>'ExportController@actionRiepilogo']);

    // # Startapp route
    Route::get( 'step1', [
        'as' => 'startapp',
        'uses' => function () {
            return response()->view('split.application');
        }
    ] );

    // # Smartphone route
    Route::get( 'smartphone', function() {
         return response()->view('split.smartphone');
    });

    // # Vue routing hook
    Route::get( '/{catchall?}', function () {
        return response()->view('split.application');
    })->where( 'catchall', '(.*)' );
    
});

