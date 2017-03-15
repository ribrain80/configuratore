<?php
/**
 * Created by PhpStorm.
 * User: davidoff
 * Date: 23/02/17
 * Time: 12.43
 */

namespace App\Http\Controllers;

use App\Models\PdfDrawer;
use Illuminate\Database\Eloquent\Collection;
use LynX39\LaraPdfMerger\PdfManage;
use PDF;
use App;

class ExportController extends Controller
{
    public function actionRiepilogo($id,$brochure=false,$language='it') {
        app()->setLocale($language);
        $model = App\Models\Drawer::with(['drawertype','edgecolor','drawerbridges','drawerdividers'])->findOrFail($id);
        $dividers = $this->handleDividers($model->drawerdividers,$model->drawerbridges);

        $drawerPdf = App::make('snappy.pdf.wrapper');
        $drawerPdf->setOption('header-html',route('split.pdf.header',['drawer'=>$id],true));
        $drawerPdf->loadView('split.pdf.riepilogo', ['model'=>$model,'dividers'=>$dividers]);



        if (!$brochure) {
            return $drawerPdf->inline();
        }
        $openingFile = resource_path('pdf/brochure.pdf' );
        $pdf = new PdfManage();
        $pdf->addPDF($openingFile);
        //SALVO TEMPORANEAMENTE IL FILE
        $temp = tempnam(sys_get_temp_dir(), 'drawer_'.$id);
        $drawerPdf->save($temp,true);
        //FINE SALVATAGGIO
        $pdf->addPDF($temp);
        $pdf->merge();
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


    private function handleDividers(Collection $dividers,Collection $bridges) {
        $total = [];
        foreach ($dividers as $cur) {
            $total[]=$cur;
        }
        foreach ($bridges as $cur) {
            $total[]=$cur;
        }
        $first = [];
        $pages = [];
        $cont=0;
        foreach ($total as $elem) {
            if ($cont < 4) {
                $first[]=$elem;
                $cont++;
            } else {
                $pages[]=$elem;
            }
        }
        $pages = array_chunk($pages,6);

        //GESTIONE PAD CON null

        $first = array_pad($first,4,null);

        if (count($pages)) {
            $tmp = array_pop($pages);
            $tmp = array_pad($tmp,6,null);
            $pages[]=$tmp;
        }

        return [
            'first'=>$first,
            'pages'=>$pages
        ];
    }
}