<?php

namespace App\Http\Controllers;

use App\Models\Bridge;
use App\Models\Divider;
use App\Models\Drawertype;
use App\Models\Support;
use Log;

class ApiController extends Controller
{

    /**
     * Return a json with all drawer types grouped by category.
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionDrawersType() {
        $grouped = [];

        // loop through all drawertypes and group them by category
        foreach (Drawertype::all(['id','description','category'])->sortBy(['category' => 'desc' ]) as $type) {
            $grouped[$type['category']][]=$type;
        }

        return response()->json($grouped);
    }


    /**
     * Return a json with all dividers grouped by depth and a second array with all depth.
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionDividers() {
        $grouped = [];
        // loop through all dividers and group them by depth
        foreach ( Divider::all( ['id','sku','width','length','depth'] )->sortBy( "depth" ) as $curDivider ) {
            $curDivider[ 'label' ] = $curDivider['width'] . "x" . $curDivider['length']."x".$curDivider['depth'];
            $grouped[$curDivider['depth']][]=$curDivider;
        }

        //Extract the dividers depth (Array keys) and build an array to transform in json
        return response()->json(['dividersCategories'=>array_keys($grouped),'dividers'=>$grouped]);
    }


    /**
     * Return a json with all supports
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionSupports() {

        return response()->json(Support::all()->toArray());
    }

    /**
     * Return all bridge elements as json
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionBridges() {

        return response()->json(Bridge::all(['id','sku','width','depth'])->toArray());
    }

}
