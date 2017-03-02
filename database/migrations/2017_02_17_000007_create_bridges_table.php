<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBridgesTable extends Migration
{
    /**
     * Run the migrations.
     * @table bridges
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bridges', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->double('width')->nullable()->default(null);
            $table->double('depth')->nullable()->default(null);
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
       Schema::dropIfExists('bridges');
     }
}
