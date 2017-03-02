<?php

use Illuminate\Database\Seeder;

class BridgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bridges = [
            [
                'depth' => 48,
                'width' => 107,
            ],
            [
                'depth' => 22.5,
                'width' => 107,
            ],
        ];
        DB::table('bridges')->insert($bridges);
    }
}
