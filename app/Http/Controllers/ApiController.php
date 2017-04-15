<?php

namespace App\Http\Controllers;

use App\Models\Bridge;
use App\Models\Divider;
use App\Models\Drawertype;
use App\Models\Drawertypestexture;
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
        foreach ( Divider::all( ['id','sku','width','length','depth','imageH','imageV','color','border','description','textureH','textureV','image3d','textureImg'] )->sortBy( "depth" ) as $curDivider ) {
            $curSecondaryKey = $curDivider['width'].'X'.$curDivider['length'];
            $grouped[$curDivider['depth']][$curSecondaryKey]['items'][]=$curDivider;
            $grouped[$curDivider['depth']][$curSecondaryKey]['imageH']=$curDivider['imageH'];
            $grouped[$curDivider['depth']][$curSecondaryKey]['imageV']=$curDivider['imageV'];
            $grouped[$curDivider['depth']][$curSecondaryKey]['image3d']=$curDivider['image3d'];
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

        $grouped = [];
        foreach (Support::all() as $curSupport) {
            $key = "" . $curSupport['height'];
            $grouped[$key]['items'][] = $curSupport;
            $grouped[$key]['height'] = (double)($curSupport['height']/10);
            $grouped[$key]['id'] = ($curSupport['height']==456?1:2);

        }

        return response()->json($grouped);
    }

    /**
     * Return all bridge elements as json
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionBridges() {

        $grouped = [];

        foreach (Bridge::all(['id','sku','sku_short','width','depth','image','color','border','texture','description','textureImg'])->sortBy('depth') as $curBridge) {
            $key = "".$curBridge['depth'];
            $grouped[$key]['image'] = $curBridge['image'];
            $grouped[$key]['depth'] = $curBridge['depth'];
            $grouped[$key]['id'] = $curBridge['depth'];
            $grouped[$key]['width'] = $curBridge['width'];

            $grouped[$key]['items'][] = $curBridge;
        }

        return response()->json($grouped);
    }


    public function actionEdgesFinitures() {
        $output = [];
        //Logic here
        return response()->json(Drawertypestexture::all());
    }

}
