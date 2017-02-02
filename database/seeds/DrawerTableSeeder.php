<?php

use Illuminate\Database\Seeder;

class DrawerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('drawers')->insert([
            'width' => rand(10, 200),
            'height' => rand(10, 20),
            'side_num' => 4,
        ]);
    }
}
