<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawertypesTable extends Migration
{
    /**
     * Run the migrations.
     * @table drawertypes
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawertypes', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('description')->nullable()->default(null);
            $table->nullableTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
       Schema::dropIfExists('drawertypes');
     }
}
