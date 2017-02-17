<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEdgecolorTable extends Migration
{
    /**
     * Run the migrations.
     * @table edgecolor
     *
     * @return void
     */
    public function up()
    {
        Schema::create('edgecolor', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('hex');
            $table->string('ral');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
       Schema::dropIfExists('edgecolor');
     }
}
