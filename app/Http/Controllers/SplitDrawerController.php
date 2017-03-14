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
        sleep(5);
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
        $saved = false;
        $error = "";
        try {
            $saved = $drawer->saveOrFail();
            //4 Gestisco i dividers ....(PER ORA SOLO PER IL NOSTRO TEST!)
            //TODO: CONTROLLARE CHE SUCCEDE SE RIMANE MA CAMBIO I CAMPI X/Y
            $dividers = [];
            foreach ($data['dividers_selected'] as $divider) {
                $dividers[$divider] = ['x' => 0, 'y' => 0];
            }
            $drawer->drawerdividers()->sync($dividers);

            //5 Gestisco i bridges
            $bridges = [];
            foreach ($data['bridges_selected'] as $bridge) {
                $bridges[$bridge['id']] = [
                    'orientation' => $data['bridge_orientation'],
                    'length' => $bridge['length'],
                    // 'color' => 1,
                ];
            }
            $drawer->drawerbridges()->sync($bridges);
            //6 Gestisco i supports
            $supports = [];
            foreach ($data['bridge_supports_selected'] as $support) {
                $supports[$support['id']]  = [
                    'orientation'=>$support['orientation'],
                    'length'=>0 //TODO
                ];
            }
            $drawer->drawersupports()->sync($supports);


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
