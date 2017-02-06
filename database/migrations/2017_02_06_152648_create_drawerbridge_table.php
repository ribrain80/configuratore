<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawerbridgeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawerbridge', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('drawer')->unsigned();
            $table->integer('bridge')->unsigned();
            $table->float('x');
            $table->float('y');
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
        Schema::dropIfExists('drawerbridge');
    }
}
