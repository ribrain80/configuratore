<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Log;
use App\Drawer;
use App\DrawerType;

class PDFController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function out()
    {
        class_exists('TCPDF', true);
        // initiate FPDI
        $pdf = new \FPDI();

        // get the page count
        $pageCount = $pdf->setSourceFile( base_path() . '/resources/pdf/Split_flusso.pdf');
        $style4 = array('L' => 0,
                'T' => array('width' => 0.25, 'cap' => 'butt', 'join' => 'miter', 'dash' => '20,10', 'phase' => 10, 'color' => array(255, 255, 255)),
                'R' => array('width' => 0.50, 'cap' => 'round', 'join' => 'miter', 'dash' => 0, 'color' => array(255, 255, 255)),
                'B' => array('width' => 0.75, 'cap' => 'square', 'join' => 'miter'));

        // iterate through all pages
        for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {

            
            // import a page
            $templateId = $pdf->importPage($pageNo);
            
            // get the size of the imported page
            $size = $pdf->getTemplateSize($templateId);

            // create a page (landscape or portrait depending on the imported page size)
            if ($size['w'] > $size['h']) {
                $pdf->AddPage('L', array($size['w'], $size['h']));
            } else {
                $pdf->AddPage('P', array($size['w'], $size['h']));
            }

            // use the imported page
            $pdf->useTemplate($templateId);
            $pdf->Rect(4, 3, 120, 8, 'DF', $style4, array(255, 255, 255));

            $pdf->SetFont('Helvetica');
            $pdf->SetXY(5, 5);
            $pdf->Write(8, 'Qui ci mettiamo i valori presi da DB');
        }

        // Output the new PDF
        $pdf->Output();        



    }

}