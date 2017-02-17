<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawerdividerTable extends Migration
{
    /**
     * Run the migrations.
     * @table drawerdivider
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drawerdivider', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('drawer');
            $table->unsignedInteger('divider');
            $table->unsignedInteger('x');
            $table->unsignedInteger('y');
            $table->unsignedInteger('color')->nullable()->default(null);
            $table->unsignedInteger('texture')->nullable()->default(null);


            $table->foreign('color', 'drawerdivider_color_foreign')
                ->references('id')->on('detailcolor');

            $table->foreign('divider', 'drawerdivider_divider_foreign')
                ->references('id')->on('dividers')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('drawer', 'drawerdivider_drawer_foreign')
                ->references('id')->on('drawers')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('texture', 'drawerdivider_texture_foreign')
                ->references('id')->on('texture')
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
       Schema::dropIfExists('drawerdivider');
     }
}
