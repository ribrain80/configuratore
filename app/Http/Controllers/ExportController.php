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

/**
 * This controller handle all the export requests
 * Class ExportController
 * @package App\Http\Controllers
 */
class ExportController extends Controller
{
    const FIRST_PAGE_ITEMS_NUMBER = 4;
    const OTHER_PAGES_ITEMS_NUMBER = 6;
    
    /**
     * Return a pdf file for a drawer with a starting brochure if needed
     * @param $id
     * @param bool $brochure
     * @param string $language
     * @return mixed
     */
    public function actionRiepilogo($id,$brochure=false,$language='it') {
        //Set application locale from the request param language
        app()->setLocale($language);
        
        //Load the Drawer from db, if throw an exception if the drawer dont exist
        $model = App\Models\Drawer::with(['drawertype','edgecolor','drawerbridges','drawerdividers'])->findOrFail($id);
        
        //Handle all kind of dividers,bridges and supports
        $elements = $this->handleElements($model->drawerdividers,$model->drawerbridges);

        //Get a Pdf builder instance
        $drawerPdf = App::make('snappy.pdf.wrapper');
        //Set the route for the default page header 
        $drawerPdf->setOption('header-html',route('split.pdf.header',['drawer'=>$id],true));
        //Load a view into the Pdf Builder
        $drawerPdf->loadView('split.pdf.riepilogo', ['model'=>$model,'dividers'=>$elements]);
        
        //If the request parameter brochure is false just return the pdf
        if (!$brochure) {
            return $drawerPdf->inline();
        }
        
        //Otherwise get an Instance of PdfManage for concat brochure and generated pdf
        $pdf = new PdfManage();
        
        //Add the bruchure to the resulting pdf
        $pdf->addPDF(resource_path('pdf/brochure.pdf' ));
        
        //Get an unique temp file for save the drawer pdf
        $temp = tempnam(sys_get_temp_dir(), 'drawer_'.$id);
        
        //Save the generated pdf in a temp file
        $drawerPdf->save($temp,true);
        
        //Add the saved drawer pdf to the result
        $pdf->addPDF($temp);
        
        //Merge brochure and drawer pdf then return
        $pdf->merge();
    }

    
    /**
     * It generate the header for all pdf pages.
     * @param $drawer
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function actionHeader($drawer) {
        $model = App\Models\Drawer::with(['drawertype','edgecolor'])->findOrFail($drawer);
        return view('split.pdf.header',['model'=>$model]);
    }


    /**
     * Interna function that reduce Dividers, Bridges and Supports in a more usefull structure
     * When needed it pad the pages with null objects
     * @todo Refactor for group items by sku
     * @param Collection $dividers
     * @param Collection $bridges
     * @return array
     */
    private function handleElements(Collection $dividers,Collection $bridges) {
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
            if ($cont < self::FIRST_PAGE_ITEMS_NUMBER) {
                $first[]=$elem;
                $cont++;
            } else {
                $pages[]=$elem;
            }
        }
        $pages = array_chunk($pages,self::OTHER_PAGES_ITEMS_NUMBER);

        //GESTIONE PAD CON null

        $first = array_pad($first,self::FIRST_PAGE_ITEMS_NUMBER,null);

        if (count($pages)) {
            $tmp = array_pop($pages);
            $tmp = array_pad($tmp,self::OTHER_PAGES_ITEMS_NUMBER,null);
            $pages[]=$tmp;
        }

        return [
            'first'=>$first,
            'pages'=>$pages
        ];
    }
}