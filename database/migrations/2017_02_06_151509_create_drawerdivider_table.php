<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawerdividerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawerdivider', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('drawer')->unsigned();
            $table->integer('divider')->unsigned();
            $table->integer('x')->unsigned();
            $table->integer('y')->unsigned();
            $table->integer('color')->nullable()->unsigned();



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drawerdivider');
    }
}
