<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('width')->nullable();
            $table->integer('length')->nullable();
            $table->integer('depth')->nullable();
            $table->integer('side_num')->nullable();
            $table->integer('drawertypes_id')->unsigned()->nullable();
            $table->integer('edgecolor_id')->unsigned()->nullable();
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drawers');
    }
}
