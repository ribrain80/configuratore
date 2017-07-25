<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Fix367x150 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $models = \App\Models\Divider::where('width',367)
            ->where('length',150)
            ->where('depth',445)
            ->get();

        foreach ($models as $model) {
            $model->imageH = str_replace("367x150","367x150d",$model->imageH);
            $model->imageV = str_replace("367x150","367x150d",$model->imageV);

            $model->textureH = str_replace("367x150","367x150_diviso",$model->textureH);
            $model->textureV = str_replace("367x150","367x150_diviso",$model->textureV);
            $model->save();


        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
