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
        $out = [];
        foreach ( $grouped as $k=>$v) {
            $out[$k] = array_reverse($v);
        }

        return response()->json($out);
    }


    /**
     * Return a json with all dividers grouped by depth and a second array with all depth.
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionDividers() {
        $grouped = [];
        // loop through all dividers and group them by depth
        foreach ( Divider::all( ['id','sku','width','length','depth','imageH','imageV','color','border','texture','description','textureH','textureV','image3d','textureImg','model3d','baseTexture'] )->sortBy( "depth" ) as $curDivider ) {
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


    public function actionPlainDividers() {
        $out = [];
        foreach (Divider::all()->groupBy('sku') as $sku => $cur) {
            $out[$sku]=$cur[0];
        }
        return response()->json($out);
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
            $grouped[$key]['id'] = ($curSupport['height']==455?1:2);

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
        foreach (Drawertypestexture::all() as $curRel ) {
            $cur['textureId'] = $curRel->texture;
            $cur['textureImg'] = $curRel->rTexture()->first()->image;
            $cur['textureName'] = $curRel->rTexture()->first()->name;

            if ($curRel->left) {
                $output[$curRel->drawertypes]['left'][]=$cur;
            }
            if ($curRel->right) {
                $output[$curRel->drawertypes]['right'][]=$cur;
            }
            if ($curRel->front) {
                $output[$curRel->drawertypes]['front'][]=$cur;
            }
            if ($curRel->back) {
                $output[$curRel->drawertypes]['back'][]=$cur;
            }
            if ($curRel->background) {
                $output[$curRel->drawertypes]['background'][]=$cur;
            }
        }
        //Logic here
        return response()->json($output);
    }

    public function actionGalleryImages() {

        $container = [];
        $iterator = new \DirectoryIterator(  "./images/gallery/images"  );
        foreach( $iterator as $item ) {

            if( !is_dir( $item) ) {
                $path = ltrim( $item->getPathname(), "." );
                $tmp['src']=  $path;
                $tmp['thumb'] = $path;
                $container[] = $tmp;
            }
        }

        return response()->json( $container );

    }

}
