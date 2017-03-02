<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDividersTable extends Migration
{
    /**
     * Run the migrations.
     * @table dividers
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dividers', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->double('width')->nullable()->default(null);
            $table->double('length')->nullable()->default(null);
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
       Schema::dropIfExists('dividers');
     }
}
