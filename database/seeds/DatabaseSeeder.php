<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DrawerTableSeeder::class);
        $this->call(DrawertypesTableSeeder::class);
        $this->call(DividerSeeder::class);
    }
}
