<?php
/**
 * Created by PhpStorm.
 * User: davidoff
 * Date: 21/02/17
 * Time: 10.31
 */

namespace App\Http\Controllers;

use App\Models\Divider;
use App\Models\Drawer;
use App\Models\PdfDrawer;
use App\Models\Support;
use Mail;
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
        $data = $request->json()->all();
        $output = $this->save($data);
        return response()->json($output, ($output['id'] != -1) ? 200 : 400);
    }

    /**
     * Esegue il salvataggio/update di un cassetto
     * @param $data
     * @return array
     */
    private function save($data)
    {


        //2 Inizializzo l'oggetto (sia save che update)
        $drawer = $this->loadModel(isset($data['drawerId'])?$data['drawerId']:null);
        //3 Aggiorno i campi di model (fake)
        $drawer->length = (int)$data['dimensions']['length'];
        $drawer->width = (int)$data['dimensions']['width'];
        $drawer->depth = (int)$data['dimensions']['shoulder_height'];
        $drawer->drawertypes_id = $data['drawertype'];
        if ($data['canvasSvg']) {
            $drawer->svg=$data['canvasSvg'];
        }
        $saved = false;
        $error = "";
        try {
            $saved = $drawer->saveOrFail();
            // Gestisco svg



            //4 Gestisco i dividers ....(PER ORA SOLO PER IL NOSTRO TEST!)
            //TODO: CONTROLLARE CHE SUCCEDE SE RIMANE MA CAMBIO I CAMPI X/Y
            $dividers = [];
            foreach ($data['dividers_selected'] as $divider) {
                $curDividerId= $this->getDividerIdBySku($divider['sku']);
                $dividers[$curDividerId] = ['x' => $divider['x'], 'y' => $divider['y']];
            }
            $drawer->drawerdividers()->sync($dividers);

            //5 Gestisco i bridges
            $bridges = [];
            $_bridgeLength = ($data['bridge_orientation']=="V")?$data['dimensions']['length']:$data['dimensions']['width'];
            foreach ($data['bridges_selected'] as $bridge) {
                $bridges[] = [
                    'bridge'=>$bridge['id'],
                    'orientation' => $data['bridge_orientation'],
                    'length' => $_bridgeLength,
                    // 'color' => 1,
                ];
            }
            $drawer->drawerbridges()->sync($bridges);
            //6 Gestisco i supports
            $supports = [];
            $_supportLength = ($data['bridge_orientation']!="V")?$data['dimensions']['length']:$data['dimensions']['width'];
            foreach ($data['bridge_supports_selected'] as $support) {
                $supports[]  = [
                    'support' => $this->getSupportIdBySku($support['sku']) ,

                    'orientation'=>$data['bridge_orientation'],
                    'length'=> $_supportLength
                ];
            }
            $drawer->drawersupports()->sync($supports);


        } catch (\Exception $ex) {
            $error = $ex->getMessage();
        }

        //6 Gestisco Mail
        if ($data['pdf']['send']) {
           $dest = $data['pdf']['email'];
            $drawerId = $drawer->id;
            $brochure = $data['pdf']['brochure'];
            $language = $data['language'];

            Mail::send('split.mail.mail', [], function($message) use ($dest,$drawerId,$brochure,$language)
            {
                $message->to($dest)
                    ->subject('Il suo cassetto!')
                    ->attachData(file_get_contents(route('split.export.topdf',['id'=>$drawerId,'brochure'=>0,'lang'=>$language])),"cassetto.pdf")
                    ->attach(resource_path('/pdf/brochure.pdf'))
                ;
            });
        }

        //7 Ritorno un oggetto in json con l'id del cassetto salvato in db
        $out = [];
        if ($saved) {
            $out['status'] = 'ok';
            $out['id'] = $drawer->id;
            $out['pdfpath']= route('split.export.topdf',['id'=>$drawer->id,'brochure'=>($data['pdf']['brochure'])?1:0,'lang'=>$data['language']]);
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


    private function getDividerIdBySku($sku) {
         $model = Divider::where('sku',$sku)->get()->first();
         if (!$model) {return false;}
         return $model->id;
    }

    private function getSupportIdBySku($sku) {
        $model = Support::where('sku',$sku)->get()->first();
        if (!$model) {return false;}
        return $model->id;
    }

}
