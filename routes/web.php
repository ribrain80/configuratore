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



Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'm50'], function () { 

	Route::get('step1', function () {
	    return view('m50.step1');
	});

	Route::get('step2', function () {
	    return view('m50.step2');
	});

	Route::get('step3', function () {
	    return view('m50.step3');
	});

	Route::get('step4', function () {
	    return view('m50.step4');
	});

	Route::get('step5', function () {
	    return view('m50.step5');
	});

	Route::get('step6', function () {
	    return view('m50.step6');
	});
});

Route::group(['prefix' => 'split'], function () {

    //API
    Route::get('drawerstypes',['as'=>'split.api.drawerstypes','uses'=>'ApiController@actionDrawersType']);
    Route::get('dividers',['as'=>'split.api.dividers','uses'=>'ApiController@actionDividers']);
    Route::get('bridges',['as'=>'split.api.bridges','uses'=>'ApiController@actionBridges']);
    Route::get('supports',['as'=>'split.api.bridges','uses'=>'ApiController@actionSupports']);
    Route::post('savedrawer',['as'=>'split.api.savedrawer','uses'=>'SplitDrawerController@actionSave']);
    //EXPORT TO PDF
    Route::get('topdf/debug/{drawer}',['as'=>'split.export.topdf.debug','uses'=>'ExportController@actionDebug']);
    Route::get('topdf/header/{drawer}',['as'=>'split.pdf.header','uses'=>'ExportController@actionHeader']);
    Route::get('topdf/{id}/{brochure?}/{lang?}',['as'=>'split.export.topdf','uses'=>'ExportController@actionRiepilogo']);

    //FABRIC
    Route::get('fabric',['uses'=>function () {
        return view('fabric');
    }]);





    Route::get('/{catchall?}', function () {
        return response()->view('split.application');
    })->where('catchall', '(.*)');
});

