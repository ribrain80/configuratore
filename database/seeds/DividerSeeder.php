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
                'depth' => 445,
                'width' => 100,
                'length' => 200,
            ],
            [
                'depth' => 445,
                'width' => 100,
                'length' => 267,
            ],
            [
                'depth' => 445,
                'width' => 100,
                'length' => 317,
            ],
            [
                'depth' => 445,
                'width' => 100,
                'length' => 367,
            ],
            [
                'depth' => 445,
                'width' => 150,
                'length' => 367,
            ],
            [
                'depth' => 445,
                'width' => 150,
                'length' => 417,
            ],
            [
                'depth' => 705,
                'width' => 100,
                'length' => 300,
            ],
            [
                'depth' => 705,
                'width' => 150,
                'length' => 300,
            ],
            [
                'depth' => 705,
                'width' => 150,
                'length' => 267,
            ],
            [
                'depth' => 705,
                'width' => 150,
                'length' => 317,
            ],
            [
                'depth' => 705,
                'width' => 150,
                'length' => 367,
            ],
            [
                'depth' => 705,
                'width' => 150,
                'length' => 467,
            ],
        ];
        DB::table('dividers')->insert($dividers);
    }
}
