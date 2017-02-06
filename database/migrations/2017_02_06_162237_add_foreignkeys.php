<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignkeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Drawers foreigns
        Schema::table('drawers', function($table) {
            $table->foreign('drawertypes_id')->references('id')->on('drawertypes');
            $table->foreign('edgecolor')->references('id')->on('edgecolor');
        });
        //Drawer-divider foreigns
        Schema::table('drawerdivider', function($table) {
            $table->foreign('drawer')->references('id')->on('drawers');
            $table->foreign('divider')->references('id')->on('dividers');
            $table->foreign('color')->references('id')->on('detailcolor');
        });
        //Drawer-bridge foreigns
        Schema::table('drawerbridge', function($table) {
            $table->foreign('drawer')->references('id')->on('drawers');
            $table->foreign('bridge')->references('id')->on('bridges');
            $table->foreign('color')->references('id')->on('detailcolor');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('drawerbridge', function($table) {
            $table->dropForeign('drawerbridge_drawer_foreign');
            $table->dropForeign('drawerbridge_bridge_foreign');
            $table->dropForeign('drawerbridge_color_foreign');
        });

        Schema::table('drawerdivider', function($table) {
            $table->dropForeign('drawerdivider_drawer_foreign');
            $table->dropForeign('drawerdivider_divider_foreign');
            $table->dropForeign('drawerdivider_color_foreign');
        });

        Schema::table('drawers', function($table) {
            $table->dropForeign('drawers_drawertypes_id_foreign');
            $table->dropForeign('drawers_edgecolor_foreign');
        });
    }
}
