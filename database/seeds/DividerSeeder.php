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
                'image' => '/images/dividers/h44_5/200x100.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 100,
                'length' => 267,
                'image' => '/images/dividers/h44_5/267x100.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 100,
                'length' => 317,
                'image' => '/images/dividers/h44_5/317x100.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 100,
                'length' => 367,
                'image' => '/images/dividers/h44_5/367x100.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 150,
                'length' => 367,
                'image' => '/images/dividers/h44_5/367x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 445,
                'width' => 150,
                'length' => 417,
                'image' => '/images/dividers/h44_5/417x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 100,
                'length' => 300,
                'image' => '/images/dividers/h70_5/300x100.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 300,
                'image' => '/images/dividers/h70_5/300x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 267,
                'image' => '/images/dividers/h70_5/267x150.png'
            ],
            ['sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 317,
                'image' => '/images/dividers/h70_5/317x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 705,
                'width' => 150,
                'length' => 367,
                'image' => '/images/dividers/h70_5/367x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 885,
                'width' => 150,
                'length' => 267,
                'image' => '/images/dividers/h88_5/267x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 885,
                'width' => 100,
                'length' => 300,
                'image' => '/images/dividers/h88_5/300x100.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 885,
                'width' => 150,
                'length' => 300,
                'image' => '/images/dividers/h88_5/300x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 885,
                'width' => 150,
                'length' => 317,
                'image' => '/images/dividers/h88_5/317x150.png'
            ],
            [
                'sku' => rand(10000, 99999),
                'depth' => 885,
                'width' => 150,
                'length' => 317,
                'image' => '/images/dividers/h88_5/367x150.png'
            ],
        ];
        DB::table('dividers')->insert($dividers);
    }
}
