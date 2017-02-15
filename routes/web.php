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
    //ONE PAGE
    Route::get('/onepage', ['as'=>'split.onepage','uses'=>function () {
        return view('split.onepage');
    }]);
    Route::get('pdf', array( 'as' => 'split.pdf', 'uses' => 'PDFController@out' ) );

    //PAGES --DEPRECATED
	Route::get('step1', array( 'as' => 'split.step1', 'uses' => 'SplitController@step1' ) );
	Route::get('step2', array( 'as' => 'split.step2', 'uses' => 'SplitController@step2' ) );
	Route::post('step3', array( 'as' => 'split.step3', 'uses' => 'SplitController@step3' ) );
	Route::post('step4',  array( 'as' => 'split.step4', 'uses' => 'SplitController@step4' ) );
	Route::get('step5',  array( 'as' => 'split.step5', 'uses' => 'SplitController@step5' ) );


});