<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawersupportTable extends Migration
{
    /**
     * Run the migrations.
     * @table drawersupport
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawersupport', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('drawer');
            $table->unsignedInteger('support');
            $table->enum('orientation',['H','V']);
            $table->double('length');

            $table->foreign('support', 'drawersupport_support_foreign')
                ->references('id')->on('supports')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('drawer', 'drawersupport_drawer_foreign')
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
       Schema::dropIfExists('drawersupport');
     }
}
