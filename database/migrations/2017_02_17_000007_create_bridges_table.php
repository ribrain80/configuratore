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
            $table->string('sku',50)->nullable()->default(null);
            $table->string('sku_short',50)->nullable()->default(null);
            $table->double('width')->nullable()->default(null);
            $table->double('depth')->nullable()->default(null);
            $table->string('image')->nullable()->default(null);
            $table->string('color')->nullable()->default(null);
            $table->string('border')->nullable()->default(null);
            $table->string('texture')->nullable()->default(null);
            $table->string('textureImg')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
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
