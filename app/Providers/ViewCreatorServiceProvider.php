<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

/**
 * ViewCreator provider
 * @see App\Http\ViewCreators\DeviceDetectorCreator
 */
class ViewCreatorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Using class based composers...
        View::creator(
            '*', 'App\Http\ViewCreators\DeviceDetectorCreator'
        );
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() { }
}
