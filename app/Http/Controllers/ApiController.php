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
        foreach ( Divider::all( ['id','sku','width','length','depth','image','color','border','texture','description'] )->sortBy( "depth" ) as $curDivider ) {
            $curSecondaryKey = $curDivider['width'].'X'.$curDivider['length'];
            $grouped[$curDivider['depth']][$curSecondaryKey]['items'][]=$curDivider;
            $grouped[$curDivider['depth']][$curSecondaryKey]['image']=$curDivider['image'];
            $grouped[$curDivider['depth']][$curSecondaryKey]['width']=$curDivider['width'];
            $grouped[$curDivider['depth']][$curSecondaryKey]['length']=$curDivider['length'];
            $grouped[$curDivider['depth']][$curSecondaryKey]['sku']=$curDivider['sku'];
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

        $grouped = [];

        foreach (Bridge::all(['id','sku','sku_short','width','depth','image','color','border','texture','description'])->sortBy('depth') as $curBridge) {
            $grouped[$curBridge['depth']]['image'] = $curBridge['image'];
            $grouped[$curBridge['depth']]['depth'] = $curBridge['depth'];   //redundant
            $grouped[$curBridge['depth']]['width'] = $curBridge['width'];   //redundant
            $grouped[$curBridge['depth']]['items'][] = $curBridge;
        }

        return response()->json($grouped);
    }

}
