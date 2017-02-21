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
    //PAGE APPLICATION
    Route::get('/onepage', ['as'=>'split.onepage','uses'=>function () {return view('split.onepage');}]);
    //API
    Route::get('configs',['as'=>'split.api.config', 'uses'=>'ApiController@actionConfig']);
    Route::get('drawerstypes',['as'=>'split.api.drawerstypes','uses'=>'ApiController@actionDrawersType']);
    Route::get('dividers',['as'=>'split.api.dividers','uses'=>'ApiController@actionDividers']);
    Route::get('bridges',['as'=>'split.api.bridges','uses'=>'ApiController@actionBridges']);
    Route::post('savedrawer',['as'=>'split.api.savedrawer','uses'=>'SplitDrawerController@actionSave']);
    Route::post('send',['as'=>'split.api.senddrawer','uses'=>'SplitDrawerController@actionPdf']);
    Route::get('pdf/{id}/{brochure?}',['as'=>'split.api.pdfdrawer','uses'=>'SplitDrawerController@actionPdf']);





    Route::get('/load',['as'=>'split.load','uses'=>function() {
        throw new \Symfony\Component\HttpKernel\Exception\HttpException('403','Non implementata');
    }]);

    Route::get('pdf', array( 'as' => 'split.pdf', 'uses' => 'PDFController@out' ) );
});

//Rotte per studio/test
Route::get('send',['as'=>'testmail','uses'=>'TmpController@actionSendMail']);