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
                'sku'=> 'BRG-1',
                'depth' => 48,
                'width' => 107,
            ],
            [
                'sku'=> 'BRG-2',
                'depth' => 22.5,
                'width' => 107,
            ],
        ];
        DB::table('bridges')->insert($bridges);
    }
}
