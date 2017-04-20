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
            $table->string('sku',50)->nullable()->default(null);
            $table->double('width')->nullable()->default(null);
            $table->double('length')->nullable()->default(null);
            $table->double('depth')->nullable()->default(null);
            $table->string('imageH')->nullable()->default(null);
            $table->string('imageV')->nullable()->default(null);
            $table->string('image3d')->nullable()->default(null);
            $table->string('color')->nullable()->default(null);
            $table->string('border')->nullable()->default(null);
            $table->string('texture')->nullable()->default(null);
            $table->string('textureH')->nullable()->default(null);
            $table->string('textureV')->nullable()->default(null);
            $table->string('textureImg')->nullable()->default(null);
            $table->string('model3d')->nullable()->default(null);
            $table->string('baseTexture')->nullable()->default(null);
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
       Schema::dropIfExists('dividers');
     }
}
