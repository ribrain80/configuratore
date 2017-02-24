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
            $table->string('category', 45)->nullable()->default(null);
            $table->tinyInteger('sponda_front')->nullable()->default('0');
            $table->tinyInteger('sponda_back')->nullable()->default('0');
            $table->tinyInteger('sponda_left')->nullable()->default('0');
            $table->string('sponda_right', 45)->nullable()->default('0');
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
