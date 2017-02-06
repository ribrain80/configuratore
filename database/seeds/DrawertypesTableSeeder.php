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
        	['description' => "LineaBox"],
        	['description' => "Cassetto in legno"],
        	['description' => "Spondine metalliche"]
        ]);
    }
}
