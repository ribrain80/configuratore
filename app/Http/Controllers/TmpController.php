<?php

namespace App\Http\Controllers;

use App\Models\PdfDrawer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use PDF;

class TmpController extends Controller
{
    public function actionSendMail() {
        $title = "ciao ";
        $content = "che mail fica";
        Mail::send('tmp.send', ['title' => $title, 'content' => $content], function ($message)
        {

            $message->from('giuseppe.liberati.1977@gmail.com', 'Configuratore split salice');

            $message->to('giuseppe.liberati.1977@gmail.com');

            class_exists('TCPDF', true);
            // initiate FPDI
            $pdf = new \FPDI();

            // get the page count
            $pageCount = $pdf->setSourceFile( resource_path('pdf/empty.pdf') );
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

                $content = print_r(PdfDrawer::getDrawerInfo(1),true);

                $pdf->Write(8, $content);
            }

            // Output the new PDF


            $message->attachData($pdf->output('cassetto.pdf', 'S'),'cassetto.pdf');
            //Add a subject
            $message->subject("Il tuo cassetto");

        });
    }

    public function actionSnappy() {
        return $pdf = PDF::loadView('welcome', [])->inline("test");
    }



}
