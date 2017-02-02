<?php

use Illuminate\Database\Seeder;

class DrawertypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('drawertypes')->insert([
        	['description' => "drawertype_box"],
        	['description' => "drawertype_wood"],
        	['description' => "drawertype_metallic"]
        ]);
    }
}
