<?php

namespace App\Http\Controllers;

use App\Models\Divider;
use App\Models\Drawer;
use App\Models\Drawers;
use App\Models\Drawertype;
use Illuminate\Http\Request;
use Log;

class ApiController extends Controller
{
    public function actionDrawersType() {
        return response()->json(Drawertype::all(['id','description'])->toArray());
    }

    public function actionDividers() {
        return response()->json(Divider::all(['id','width','length','depth'])->toArray());
    }

    public function actionSavedrawer(Request $request) {
        //TODO: Usare una transazione!!!
        //1 Recupero del json
        $data = $request->json()->all();
        //2 Inizializzo l'oggetto (sia save che update)
        $drawer = $this->loadDrawerById($data['drawerId']);
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
            $out['id']=-1;
        }

        return response()->json($out,($saved)?200:400);
    }


    private function loadDrawerById($id=null) {
        $drawer = null;
        if (!$id) {
            $drawer =  new Drawer();
        } else {
            $drawer = Drawer::findOrFail($id);
        }
        return $drawer;
    }



}
