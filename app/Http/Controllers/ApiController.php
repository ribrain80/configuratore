<?php

namespace App\Http\Controllers;

use App\Divider;
use App\Drawer;
use App\Drawers;
use App\Drawertype;
use Illuminate\Http\Request;
use Log;

class ApiController extends Controller
{
    public function actionDrawersType() {
        return response()->json(Drawertype::all(['id','description'])->toArray());
    }

    public function actionDividers() {
        return response()->json(Divider::all(['id','width','lenght','height'])->toArray());
    }

    public function actionSavedrawer(Request $request) {
        //TODO: Usare una transazione!!!
        //1 Recupero del json
        $data = $request->json()->all();
        //2 Inizializzo l'oggetto (sia save che update)
        $drawer = $this->loadDrawerById($data['drawerId']);
        //3 Aggiorno i campi di model (fake)
        $drawer->lenght=(int)$data['dimensions']['length'];
        $drawer->width=(int)$data['dimensions']['width'];
        $drawer->height=(int)$data['dimensions']['depth'];
        $drawer->drawertypes_id=$data['drawertype'];
        $saved=$drawer->save();
        //4 Gestisco i dividers ....(PER ORA SOLO PER IL NOSTRO TEST!)
        //TODO: CONTROLLARE CHE SUCCEDE SE RIMANE MA CAMBIO I CAMPI X/Y
        $dividers=[];
        foreach ($data['dividers'] as $divider) {
            $dividers[$divider]=['x'=>0.0,'y'=>0.0];
        }
        $drawer->drawerdividers()->sync($dividers);
        //5 TODO: Gestisco i bridges
        $bridges = [];

        //6 Ritorno un oggetto in json con l'id del cassetto salvato in db
        $out = [];
        if ($saved) {
            $out['status']='ok';
            $out['id']=$drawer->id;
        } else {
            $out['status']='ko';
            $out['id']=-1;
        }

        return response()->json($out);
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


    /*
    public function actionListDrawer() {
        return response()->json(Drawer::all()->toArray());
    }


    public function actionGetDrawer($id) {
        $model= Drawer::findOrFail($id);
        return response()->json($model);

    }

    public function actionSaveDrawer(Request $request) {
        //TODO: Validazione !!!!
        $model = new Drawer();
        $model->drawertypes_id=$request->input("type");
        $model->width=$request->input("width");
        $model->height=$request->input("depth");
        $model->lenght=$request->input("length");
        $model->save();
        //TODO: Migliorare output
        return response()->json($model->id);
    }*/

}