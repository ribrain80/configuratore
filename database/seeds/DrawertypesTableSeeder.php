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
        	['category' => "Lineabox", 'description' => "Lineabox 4 lati"],
        	['category' => "Lineabox", 'description' => "Lineabox 3 lati"],
        	['category' => "Lineabox", 'description' => "Lineabox 2 lati"],
        	['category' => "Cassetto", 'description' => "Cassetto"],
        ]);
    }
}
