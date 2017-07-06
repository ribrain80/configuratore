<?php
namespace App\Http\Controllers;

use App\Models\Bridge;
use App\Models\Divider;
use App\Models\Drawertype;
use App\Models\Drawertypestexture;
use App\Models\Support;
use Log;
use Cache;

/**
 * TODO comment
 */
class ApiController extends Controller {

    /**
     * Return a json with all drawer types grouped by category.
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionDrawersType() {

        // # Cache result forever
        $cached = Cache::rememberForever( "actionDrawersType", function () {

            // # Container init
            $out = [];

            // # Getting results grouped and ordered 
            $collection = Drawertype::all( [ "id", "description", "category" ] )
                          ->groupBy( "category" )
                          ->sortBy( ["category" => "desc" ] )
                          ->toArray();
            
            // # Revert values
            foreach ( $collection as $k => $v ) {
                $out[ $k ] = array_reverse( $v );
            }

            // # toJson
            return json_encode( $out );

        });

        return response()->make( $cached );
    }


    /**
     * Return a json with all dividers grouped by depth and a second array with all depth.
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionDividers() {

        // # Cache result forever
        $cached = Cache::rememberForever( 'actionDividers', function () {
            
            // # Container init
            $grouped = [];

            // loop through all dividers and group them by depth
            foreach ( Divider::all( ['id','sku','width','length','depth','imageH','imageV','color','border','texture','description','textureH','textureV','image3d','textureImg','model3d','baseTexture'] ) as $curDivider ) {

                // # TODO COMMENT
                $curSecondaryKey = $curDivider['width'].'X'.$curDivider['length'];
                $grouped[$curDivider['depth']][$curSecondaryKey]['items'][]=$curDivider;
                $grouped[$curDivider['depth']][$curSecondaryKey]['imageH']=$curDivider['imageH'];
                $grouped[$curDivider['depth']][$curSecondaryKey]['imageV']=$curDivider['imageV'];
                $grouped[$curDivider['depth']][$curSecondaryKey]['image3d']=$curDivider['image3d'];
                $grouped[$curDivider['depth']][$curSecondaryKey]['width']=$curDivider['width'];
                $grouped[$curDivider['depth']][$curSecondaryKey]['length']=$curDivider['length'];
                $grouped[$curDivider['depth']][$curSecondaryKey]['sku']=$curDivider['sku'];
            }

            // # toJson
            return json_encode( [ 'dividersCategories' => array_keys( $grouped ), 'dividers'=>$grouped ] );
        });


        // # Extract the dividers depth (Array keys) and build an array to transform in json
        return response()->make( $cached );
    }

    /**
     * TODO COMMENT
     * @return [type] [description]
     */
    public function actionPlainDividers() {

        // # Cache result forever
        $cached = Cache::rememberForever( 'actionPlainDividers', function () {

            // # Container init
            $out = [];

            // # Get all dividers grouped by sku
            $collection = Divider::all()->groupBy( 'sku' );

            // # Loop through all dividers 
            foreach ( $collection as $sku => $cur ) {
                $out[ $sku ] = $cur[ 0 ];
            }

            // # toJson
            return json_encode($out);
        });

        return response()->make($cached);
    }


    /**
     * Return a json with all supports
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionSupports() {

        // # Cache result forever
        $cached = Cache::rememberForever( 'actionSupports', function () {

            // # Container init
            $grouped = [];

            // # Get all supports
            $collection = Support::all();

            // # Loop through all supports 
            foreach ( $collection as $curSupport ) {

                $key = "" . $curSupport[ 'height' ];
                $grouped[ $key ][ 'items' ][] = $curSupport;
                $grouped[ $key ][ 'height' ] = ( double ) ( $curSupport['height'] / 10 );
                $grouped[ $key ][ 'id' ] = ( $curSupport['height'] == 455 ? 1 : 2 );

            }

            // # toJson
            return json_encode($grouped);
        });

        return response()->make($cached);
    }

    /**
     * Return all bridge elements as json
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionBridges() {

        // # Cache result forever
        $cached = Cache::rememberForever( 'actionBridges', function () {

            // # Container init
            $grouped = [];

            // # Get all bridges
            $collection = Bridge::all( [ 'id', 'sku', 'sku_short', 'width', 'depth', 'image', 
                                        'color', 'border', 'texture', 'description','textureImg'] )
                                ->sortBy( 'depth' );

            // # Loop through all bridges
            foreach ( $collection as $curBridge) {

                $key = "".$curBridge['depth'];
                $grouped[ $key ][ 'image' ] = $curBridge['image'];
                $grouped[ $key ][ 'depth' ] = $curBridge['depth'];
                $grouped[ $key ][ 'id' ] = $curBridge['depth'];
                $grouped[ $key ][ 'width' ] = $curBridge['width'];

                $grouped[ $key ][ 'items' ][] = $curBridge;
            }

            // # toJson
            return json_encode($grouped);
        });

        return response()->make($cached);
    }


    /**
     * TODO COMMENT
     * @return [type] [description]
     */
    public function actionEdgesFinitures() {

        // # Cache result forever
        $cached = Cache::rememberForever( 'actionEdgesFinitures', function () {

            // # Container init
            $output = [];

            // # Get all bridges
            $collection = Drawertypestexture::all();

            foreach ( $collection as $curRel ) {

                $cur[ 'textureId' ]   = $curRel->texture;
                $cur[ 'textureImg' ]  = $curRel->rTexture()->first()->image;
                $cur[ 'textureName' ] = $curRel->rTexture()->first()->name;

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

            // # toJson
            return json_encode($output);
        });

        return response()->make($cached);
    }

    /**
     * Retrieve all galleries images from the server
     * @return Response
     */
    public function actionGalleryImages() {

        // # Cache result forever
        $cached = Cache::rememberForever( 'actionGalleryImages', function () {

            // # Conatiner init
            $container = [];

            // # Directory iterator
            $iterator = new \DirectoryIterator(  "./images/gallery/images"  );

            // # Loop through files and dir
            foreach( $iterator as $item ) {

                // # Avoid dirs
                if( is_dir( $item ) ) {
                    continue;
                }

                // # Get pathname
                $path = ltrim( $item->getPathname(), "." );
                $tmp[ 'src' ] =  $path;
                $tmp[ 'thumb' ] = $path;
                $container[] = $tmp;
            }

            // # toJson
            return json_encode($container);
        });

        return response()->make( $cached );

    }

    /**
     * Retrieve all carousel images from the server
     * @return Response
     */
    public function actionCarouselImages() {

        // # Cache result forever
        $cached = Cache::rememberForever( 'actionCarouselImages', function () {

            // # Conatiner init
            $container = [];

            // # Directory iterator
            $iterator = new \DirectoryIterator(  "./images/carousel"  );

            // # Loop through files and dir
            foreach( $iterator as $item ) {

                // # Avoid dirs
                if( is_dir( $item ) ) {
                    continue;
                }

                // # Get pathname
                $path = ltrim( $item->getPathname(), "." );
                $tmp[ 'src' ] =  $path;
                $tmp[ 'thumb' ] = $path;
                $container[] = $tmp;
            }

            // # toJson
            return json_encode($container);
        });

        return response()->make( $cached );

    }    

}
