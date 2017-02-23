<?php

namespace App\Http\Controllers;

use Log;

/**
 * Class SplitController
 * @package App\Http\Controllers
 */
class SplitController extends Controller
{
    /**
     * Punto di accesso all'applicazione Split
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function actionApplication() {
        return view('split.onepage');
    }

    /**
     * @todo: Da implementare
     * Servirà per il load dei cassetti
     */
    public function actionLoad(){
        abort('403','Non Implementata');
    }

}