<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawersTable extends Migration
{
    /**
     * Run the migrations.
     * @table drawers
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawers', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('width')->nullable()->default(null);
            $table->integer('length')->nullable()->default(null);
            $table->integer('depth')->nullable()->default(null);
            $table->integer('side_num')->nullable()->default(null);
            $table->unsignedInteger('drawertypes_id')->nullable()->default(null);
            $table->unsignedInteger('edgecolor_id')->nullable()->default(null);
            $table->nullableTimestamps();


            $table->foreign('drawertypes_id', 'drawers_drawertypes_id_foreign')
                ->references('id')->on('drawertypes');

            $table->foreign('edgecolor_id', 'drawers_edgecolor_id_foreign')
                ->references('id')->on('edgecolor');
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
