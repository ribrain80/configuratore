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
            $table->double('width')->nullable()->default(null);
            $table->double('length')->nullable()->default(null);
            $table->double('depth')->nullable()->default(null);
            $table->tinyInteger('sponda_front')->nullable()->default('0');
            $table->tinyInteger('sponda_back')->nullable()->default('0');
            $table->tinyInteger('sponda_left')->nullable()->default('0');
            $table->string('sponda_right', 45)->nullable()->default('0');

            $table->longText('svg')->nullable();
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
