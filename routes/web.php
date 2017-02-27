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
    //SPLIT APPLICATION
    Route::get('/onepage', ['as'=>'split.onepage','uses'=>'SplitController@actionApplication']);
    Route::get('/load',['as'=>'split.load','uses'=>'SplitController@actionLoad']);
    //API
    Route::get('configs',['as'=>'split.api.config', 'uses'=>'ApiController@actionConfig']);
    Route::get('drawerstypes',['as'=>'split.api.drawerstypes','uses'=>'ApiController@actionDrawersType']);
    Route::get('dividers',['as'=>'split.api.dividers','uses'=>'ApiController@actionDividers']);
    Route::get('bridges',['as'=>'split.api.bridges','uses'=>'ApiController@actionBridges']);
    Route::post('savedrawer',['as'=>'split.api.savedrawer','uses'=>'SplitDrawerController@actionSave']);
    //EXPORT TO PDF
    Route::get('topdf/header',['as'=>'split.pdf.header',function (){return view('split.pdf.header');}]);
    Route::get('topdf/footer',['as'=>'split.pdf.footer',function (){return view('split.pdf.footer');}]);
    Route::get('topdf/{id}/{brochure?}',['as'=>'split.export.topdf','uses'=>'ExportController@actionRiepilogo']);


    //TEST
    Route::get("3d",['as'=>'3d','uses'=>function(){
        return view('split.test.3d');
    }]);

});

