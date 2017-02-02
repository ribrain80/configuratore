<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $lang_path = base_path() . "/resources/lang/";
        
        foreach (new \DirectoryIterator( $lang_path ) as $fileInfo) {
            if(!$fileInfo->isDot()) {
                $paths[$fileInfo->getFilename()] = $lang_path . $fileInfo->getFilename() . "/messages.php";
            }   
        }

        foreach( $paths as $key => $path ) {
            $ok[ $key ] = include $path;
        }

        Log::info( json_encode( $ok, JSON_HEX_AMP ) );
        View::share('lang', json_encode( $ok ) );
        // View::share('available_langs', [ "it", "en", "fr", "de", "es", "pt" ] );
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
