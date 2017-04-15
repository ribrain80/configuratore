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
        $this->call(DrawertypesTableSeeder::class);
        $this->call(DividerSeeder::class);
        $this->call(BridgeSeeder::class);
        $this->call(SupportsSeeder::class);
        $this->call(TexturesSeeder::class);
    }
}
