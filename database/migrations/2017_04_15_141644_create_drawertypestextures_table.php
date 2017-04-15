<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawertypestexturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawertypestextures', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('drawertypes');
            $table->unsignedInteger('texture');
            $table->boolean('left');
            $table->boolean('right');
            $table->boolean('back');
            $table->boolean('front');
            $table->boolean('background');


            $table->foreign('drawertypes', 'drawertypestextures_drawertypes_foreign')
                ->references('id')->on('drawertypes')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('texture', 'drawertypestextures_texture_foreign')
                ->references('id')->on('texture')
                ->onDelete('cascade')
                ->onUpdate('cascade');


        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drawertypestextures');
    }
}
