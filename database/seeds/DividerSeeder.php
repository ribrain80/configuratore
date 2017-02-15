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
                'height' => 445,
                'width' => 100,
                'lenght' => 200,
            ],
            [
                'height' => 445,
                'width' => 100,
                'lenght' => 267,
            ],
            [
                'height' => 445,
                'width' => 100,
                'lenght' => 317,
            ],
            [
                'height' => 445,
                'width' => 100,
                'lenght' => 367,
            ],
            [
                'height' => 445,
                'width' => 150,
                'lenght' => 367,
            ],
            [
                'height' => 445,
                'width' => 150,
                'lenght' => 417,
            ],
            [
                'height' => 705,
                'width' => 100,
                'lenght' => 300,
            ],
            [
                'height' => 705,
                'width' => 150,
                'lenght' => 300,
            ],
            [
                'height' => 705,
                'width' => 150,
                'lenght' => 267,
            ],
            [
                'height' => 705,
                'width' => 150,
                'lenght' => 317,
            ],
            [
                'height' => 705,
                'width' => 150,
                'lenght' => 367,
            ],
            [
                'height' => 705,
                'width' => 150,
                'lenght' => 467,
            ],
        ];
        DB::table('dividers')->insert($dividers);
    }
}
