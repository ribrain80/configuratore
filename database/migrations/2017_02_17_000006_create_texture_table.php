<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTextureTable extends Migration
{
    /**
     * Run the migrations.
     * @table texture
     *
     * @return void
     */
    public function up()
    {
        Schema::create('texture', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 70);
            $table->string('image');
            $table->boolean('universal');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
       Schema::dropIfExists('texture');
     }
}
