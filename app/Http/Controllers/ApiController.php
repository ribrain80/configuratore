<?php

namespace App\Http\Controllers;

use App\Models\Bridge;
use App\Models\Divider;
use App\Models\Drawer;
use App\Models\Drawertype;
use Illuminate\Http\Request;
use Log;

class ApiController extends Controller
{
    public function actionDrawersType() {
        return response()->json(Drawertype::all(['id','description'])->toArray());
    }
    public function actionDividers() {
        return response()->json(Divider::all(['id','width','length','depth'])->toArray());
    }
    public function actionBridges() {
        //TODO: Rename fields
        return response()->json(Bridge::all(['id','width','lenght','height'])->toArray());
    }

    public function actionConfig() {
        $out['urls']['dividers']=route('split.api.drawerstypes');
        $out['urls']['bridges']=route('split.api.bridges');
        $out['urls']['save']=route('split.api.savedrawer');
        $out['urls']['send']=route('split.api.senddrawer');
       // $out['urls']['pdf']=route('split.api.pdfdrawer');

        return response()->json($out);
    }

}
