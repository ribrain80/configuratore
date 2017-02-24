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
        	['category' => "LineaBox", 'description' => "LineaBox 4 lati"],
        	['category' => "LineaBox", 'description' => "LineaBox 3 lati"],
        	['category' => "LineaBox", 'description' => "LineaBox 2 lati"],
        	['category' => "Cassetto", 'description' => "Cassetto"],
        ]);
    }
}
