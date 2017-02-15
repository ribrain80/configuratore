<?php

namespace App\Http\Controllers;

use App\Drawer;
use App\Drawertype;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function actionDrawersType() {
        return response()->json(Drawertype::all(['id','description'])->toArray());
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