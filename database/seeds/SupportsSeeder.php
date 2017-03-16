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
                'height'=>45.4,
                'sku'=>'SUP-1'
            ],
            [
                'height'=>89.5,
                'sku'=>'SUP-2'
            ],
        ];
        DB::table('supports')->insert($supports);
    }
}
