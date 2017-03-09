<?php

use Illuminate\Database\Seeder;

class DividerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dividers = [
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 100,
                'length' => 200,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 100,
                'length' => 267,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 100,
                'length' => 317,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 100,
                'length' => 367,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 150,
                'length' => 367,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 150,
                'length' => 417,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 100,
                'length' => 300,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 300,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 267,
            ],
            ['sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 317,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 367,
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 467,
            ],
        ];
        DB::table('dividers')->insert($dividers);
    }
}
