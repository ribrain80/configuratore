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
            $table->integer('lenght')->nullable();
            $table->integer('height')->nullable();
            $table->integer('side_num')->nullable();
            $table->integer('drawertypes_id')->unsigned()->nullable();
            $table->timestamps();
        });

       Schema::table('drawers', function($table) {
            $table->foreign('drawertypes_id')->references('id')->on('drawertypes');
       });        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropForeign('drawertypes_id');
        Schema::dropIfExists('drawers');
    }
}
