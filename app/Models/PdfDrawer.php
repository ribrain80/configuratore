<?php
/**
 * Created by PhpStorm.
 * User: davidoff
 * Date: 16/02/17
 * Time: 12.26
 */

namespace App\Models;


use LynX39\LaraPdfMerger\PDFManage;

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
        $out['id']=$drawer->id;
        $out['label']='('.$drawer->width.'x'.$drawer->length.'x'.$drawer->depth.')';
        $out['type']=$drawer->drawertypes_id;
        $out['dividers']=[];
        foreach ($drawer->drawerdividers as $divider) {
            $cur['id'] = $divider->pivot->divider;
            $cur['x'] = $divider->pivot->x;
            $cur['y'] = $divider->pivot->y;
            $cur['texture'] = "".$divider->pivot->texture;
            $cur['color'] = "".$divider->pivot->color;
            $cur['label'] = $divider->width . "x" . $divider->length."x".$divider->depth;
            $out['dividers'][]=$cur;
        }

        return $out;
    }

    public static function genPDF($id,$brochure=false) {
        $data = static::getDrawerInfo($id); //ORA INUTILE MA DOVREBBE SERVIRE PER GENERARE IL NOSTRO PDF
        $pdf = new PDFManage();
        if ($brochure) {
            $pdf->addPDF(resource_path('pdf/brochure.pdf' ));
        }
        $pdf->addPDF(resource_path('pdf/empty.pdf' ));
        return $pdf;
    }



}
