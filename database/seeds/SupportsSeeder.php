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
        $supports = [];
        $csvFile = file(resource_path('data/supports.csv'));
        foreach ($csvFile as $line) {
            $tmp = str_getcsv($line);
            $toInsert['sku'] = trim($tmp[0]);
            $toInsert['height'] = trim($tmp[1]);
            $toInsert['color'] = trim($tmp[2]);
            $toInsert['description'] = trim($tmp[3]);

            $supports[]=$toInsert;
        }

        DB::table('supports')->insert($supports);
    }
}
