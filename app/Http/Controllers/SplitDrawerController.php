<?php
/**
 * Created by PhpStorm.
 * User: davidoff
 * Date: 21/02/17
 * Time: 10.31
 */

namespace App\Http\Controllers;

use App\Models\Drawer;
use App\Models\PdfDrawer;
use Illuminate\Http\Request;


/**
 * Controller per la gestione delle operazioni sui cassetti
 * Class SplitDrawerController
 * @package App\Http\Controllers
 */
class SplitDrawerController extends Controller
{
    /**
     * Save/Update di un cassetto
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionSave(Request $request)
    {
        sleep(10);
        $data = $request->json()->all();
        $output = $this->save($data);
        return response()->json($output, ($output['id'] != -1) ? 200 : 400);
    }

    /**
     * Invia una mail contenente un cassetto (PDF ALLEGATO)
     * @todo Recuperare id/brochre da request, testare invio mail, preparare view per la mail
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function actionSend(Request $request)
    {
        $data = $request->json()->all();
        $id=$data['drawerId'];
        $brochure=$data['brochure'];
        Mail::send('tmp.send', ['title' => "ABC", 'content' => "CONTENT TODO"], function ($message,$id,$brochure) {
            $message->from('giuseppe.liberati.1977@gmail.com', 'Configuratore split salice');
            $message->to('giuseppe.liberati.1977@gmail.com');
            $message->subject("Il tuo cassetto");
            $message->attachData(PdfDrawer::genPDF($id,$brochure)->merge('string'),"cassetto-split-$id-.pdf");
            //Add a subject
        });

        return response()->json("DUMMY-SENT", 200);
    }

    /**
     * Permette il download del pdf di un cassetto
     * @param $id
     * @param bool $brochure
     * @return \LynX39\LaraPdfMerger\PDF
     */
    public function actionPdf($id, $brochure = false)
    {
        return PdfDrawer::genPDF($id, $brochure)->merge();
    }

    /**
     * Esegue il salvataggio/update di un cassetto
     * @param $data
     * @return array
     */
    private function save($data)
    {
        //2 Inizializzo l'oggetto (sia save che update)
        $drawer = $this->loadModel($data['drawerId']);
        //3 Aggiorno i campi di model (fake)
        $drawer->length = (int)$data['dimensions']['length'];
        $drawer->width = (int)$data['dimensions']['width'];
        $drawer->depth = (int)$data['dimensions']['depth'];
        $drawer->drawertypes_id = $data['drawertype'];
        $saved = false;
        $error = "";
        try {
            $saved = $drawer->saveOrFail();
            //4 Gestisco i dividers ....(PER ORA SOLO PER IL NOSTRO TEST!)
            //TODO: CONTROLLARE CHE SUCCEDE SE RIMANE MA CAMBIO I CAMPI X/Y
            $dividers = [];
            foreach ($data['dividers'] as $divider) {
                $dividers[$divider] = ['x' => 0, 'y' => 0];
            }
            $drawer->drawerdividers()->sync($dividers);
            //5 TODO: Gestisco i bridges
            $bridges = [];
        } catch (\Exception $ex) {
            $error = $ex->getMessage();
        }

        //6 Ritorno un oggetto in json con l'id del cassetto salvato in db
        $out = [];
        if ($saved) {
            $out['status'] = 'ok';
            $out['id'] = $drawer->id;
            $out['pdfpath']= route('split.export.topdf',['id'=>$drawer->id,'brochure'=>$data['pdf']['brochure']]);
        } else {
            $out['status'] = 'ko';
            $out['error'] = $error;
            $out['id'] = -1;
        }
        return $out;
    }

    /**
     * Carica un Cassetto dal DB, Se parametro $id==null allora torna un nuovo oggetto Drawer
     * @param null $id
     * @return Drawer|null
     */
    private function loadModel($id = null)
    {
        $drawer = null;
        if (!$id) {
            $drawer = new Drawer();
        } else {
            $drawer = Drawer::findOrFail($id);
        }
        return $drawer;
    }
}
