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
            $table->integer('x');
            $table->integer('y');
            $table->timestamps();

            $table->foreign('drawer')->references('id')->on('drawers');
            $table->foreign('divider')->references('id')->on('dividers');

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
