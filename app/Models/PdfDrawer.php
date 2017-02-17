<?php
/**
 * Created by PhpStorm.
 * User: davidoff
 * Date: 16/02/17
 * Time: 12.26
 */

namespace App\Models;


class PdfDrawer
{
    public static function getDrawerInfo($id) {
        //1 Recupero il cassetto
        /** @var Drawer $drawer  */
        $drawer = Drawer::findOrFail($id);
        $out = [];
        $out['dimensions'] = [
            'width'=>$drawer->width,
            'length'=>$drawer->length,
            'depth'=>$drawer->depth,
        ];
        $out['id']=$id;
        $out['label']='('.$drawer->width.'x'.$drawer->length.'x'.$drawer->depth.')';
        $out['type']=$drawer->drawertypes_id;
        $out['dividers']=[];
        foreach ($drawer->drawerdividers as $divider) {
            $cur['id'] = $divider->divider;
            $cur['x'] = "".$divider->x;
            $cur['y'] = "".$divider->y;
            $cur['label'] = $divider->width . "x" . $divider->length."x".$divider->depth;
            $out['dividers'][]=$cur;
        }

        return $out;
    }



}