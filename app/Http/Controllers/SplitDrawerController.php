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

class SplitDrawerController extends Controller
{
    public function actionSave(Request $request) {
        $data = $request->json()->all();
        $output = $this->save($data);
        return response()->json($output,($output['id'!=-1])?200:400);
    }

    public function actionSend(Request $request) {
        $data = $request->json()->all();
        $output = $this->save($data);
        return response()->json("DUMMY-SENT",200);
    }

    public function actionPdf($id) {
        $data = PdfDrawer::getDrawerInfo($id);
        return response()->json($data,200);
    }


    private function save($data) {
        //2 Inizializzo l'oggetto (sia save che update)
        $drawer = $this->loadModel($data['drawerId']);
        //3 Aggiorno i campi di model (fake)
        $drawer->length=(int)$data['dimensions']['length'];
        $drawer->width=(int)$data['dimensions']['width'];
        $drawer->depth=(int)$data['dimensions']['depth'];
        $drawer->drawertypes_id=$data['drawertype'];
        $saved = false;
        $error = "";
        try {
            $saved=$drawer->saveOrFail();
            //4 Gestisco i dividers ....(PER ORA SOLO PER IL NOSTRO TEST!)
            //TODO: CONTROLLARE CHE SUCCEDE SE RIMANE MA CAMBIO I CAMPI X/Y
            $dividers=[];
            foreach ($data['dividers'] as $divider) {
                $dividers[$divider]=['x'=>0,'y'=>0];
            }
            $drawer->drawerdividers()->sync($dividers);
            //5 TODO: Gestisco i bridges
            $bridges = [];
        } catch (\Exception $ex) {
            $error=$ex->getMessage();
        }

        //6 Ritorno un oggetto in json con l'id del cassetto salvato in db
        $out = [];
        if ($saved) {
            $out['status']='ok';
            $out['id']=$drawer->id;
        } else {
            $out['status']='ko';
            $out['error']=$error;
            $out['id']=-1;
        }
        return $out;
    }

    private function loadModel($id=null) {
        $drawer = null;
        if (!$id) {
            $drawer =  new Drawer();
        } else {
            $drawer = Drawer::findOrFail($id);
        }
        return $drawer;
    }
}