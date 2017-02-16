<?php

namespace App\Http\Controllers;

use App\Divider;
use App\Drawer;
use App\Drawers;
use App\Drawertype;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function actionDrawersType() {
        return response()->json(Drawertype::all(['id','description'])->toArray());
    }

    public function actionDividers() {
        return response()->json(Divider::all(['id','width','lenght','height'])->toArray());
    }

    public function actionSavedrawer(Request $request) {
        return json_encode(['status'=>'ko','id'=>-1]);

        //1 Recupero del json
        $data = $request->json()->all();
        //2 Inizializzo l'oggetto (sia save che update)
        $id = (isset($data->drawerId))?$data>drawerId:null;
        $drawer = $this->loadDrawerById($id);
        //3 Aggiorno i campi di model (fake)
        $drawer->lenght=100;
        $drawer->width=100;
        $drawer->height=10;
        $drawer->drawertypes_id=1;
        //4 Gestisco i dividers ....
        $dividers = [1=>['x'=>0.0,'y'=>0.0]];
        $drawer->save();
        $drawer->drawerdividers()->sync($dividers);
        //5 Gestisco i bridges
        $bridges = [];
        //2 Salvataggio
        $saved = $drawer->save();

        //3 Ritorno un oggetto in json con l'id del cassetto salvato in db
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