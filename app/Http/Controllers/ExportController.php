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
        $model = App\Models\Drawer::with(['drawertype','edgecolor','drawerbridges','drawerdividers'])->findOrFail($id);
        $drawerPdf = App::make('snappy.pdf.wrapper');
        $drawerPdf->setOption('header-html',route('split.pdf.header',['drawer'=>$id],true));
       // $drawerPdf->setOption('footer-html',route('split.pdf.footer',[],true));
        $drawerPdf->loadView('split.pdf.riepilogo', ['model'=>$model]);

        return $drawerPdf->inline();
        /*
        exit();
        $openingFile = ($brochure)?resource_path('pdf/brochure.pdf' ):resource_path('pdf/cover.pdf');

        $pdf = new PDFManage();
        $pdf->addPDF($openingFile);
        //SALVO TEMPORANEAMENTE IL FILE
        $temp = tempnam(sys_get_temp_dir(), 'drawer_'.$id);
        $drawerPdf->save($temp,true);
        //FINE SALVATAGGIO
        $pdf->addPDF($temp);
        $pdf->merge();*/
    }

    /**
     * Azione che genera l'html per la costruzione del pdf
     * @param $drawer
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function actionHeader($drawer) {
        $model = App\Models\Drawer::with(['drawertype','edgecolor'])->findOrFail($drawer);
        return view('split.pdf.header',['model'=>$model]);
    }
}