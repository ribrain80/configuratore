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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function actionApplication() {
        return view('split.onepage');
    }

    public function actionLoad(){
        throw new \Symfony\Component\HttpKernel\Exception\HttpException('403','Non implementata');
    }

}