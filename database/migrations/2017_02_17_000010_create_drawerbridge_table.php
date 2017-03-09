<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawerbridgeTable extends Migration
{
    /**
     * Run the migrations.
     * @table drawerbridge
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawerbridge', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('drawer');
            $table->unsignedInteger('bridge');
            $table->double('length');
            $table->enum('orientation',['H','V']);
            $table->unsignedInteger('color')->nullable()->default(null);


            $table->foreign('bridge', 'drawerbridge_bridge_foreign')
                ->references('id')->on('bridges')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('color', 'drawerbridge_color_foreign')
                ->references('id')->on('detailcolor');

            $table->foreign('drawer', 'drawerbridge_drawer_foreign')
                ->references('id')->on('drawers')
                ->onDelete('cascade')
                ->onUpdate('cascade');
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
