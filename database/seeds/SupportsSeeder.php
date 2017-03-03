<?php

use Illuminate\Database\Seeder;

class SupportsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $supports = [
            [
                'height'=>45.5
            ],
            [
                'height'=>89.5
            ],
        ];
        DB::table('supports')->insert($supports);
    }
}
