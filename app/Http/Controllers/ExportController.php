<?php
/**
 * Created by PhpStorm.
 * User: davidoff
 * Date: 23/02/17
 * Time: 12.43
 */

namespace App\Http\Controllers;

use App\Models\PdfDrawer;
use LynX39\LaraPdfMerger\PDFManage;
use PDF;
use App;

class ExportController extends Controller
{
    public function actionRiepilogo($id,$brochure=false) {
        $drawerPdf = App::make('snappy.pdf.wrapper');
        $drawerPdf->setOption('header-html',route('split.pdf.header',[],true));
        $drawerPdf->setOption('footer-html',route('split.pdf.footer',[],true));
        $drawerPdf->loadView('split.pdf.riepilogo', ['drawer'=>PdfDrawer::getDrawerInfo($id)]);

        if (!$brochure) {
            return $drawerPdf->inline("drawer.pdf");
        } else {
            $pdf = new PDFManage();
            $pdf->addPDF(resource_path('pdf/brochure.pdf' ));
            //SALVO TEMPORANEAMENTE IL FILE
            $temp = tempnam(sys_get_temp_dir(), 'drawer_'.$id);
            $drawerPdf->save($temp,true);
            //FINE SALVATAGGIO
            $pdf->addPDF($temp);
            $pdf->merge();
        }
    }
}