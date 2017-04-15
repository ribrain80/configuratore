<?php

use Illuminate\Database\Seeder;

class TexturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $textures = [];
        $csvFile = file(resource_path('data/alltextures.csv'));
        foreach ($csvFile as $line) {
            $tmp = str_getcsv($line);
            $part1 = trim($tmp[0]);

            if (strpos($part1,'_')===false) {
                $toInsert['universal'] = false;
                $toInsert['name'] = $part1;
                $toInsert['image'] = '/images/textures/'.$part1.'.jpg';
            } else {
                $toInsert['universal'] = true;
                $name = trim(explode("_",$part1)[1]);
                $toInsert['name'] = str_replace('.jpg','',$name);
                $toInsert['image'] = '/images/textures/'.$part1;
            }



            /*$toInsert['sku'] = trim($tmp[0]);
            $toInsert['height'] = trim($tmp[1]);
            $toInsert['color'] = trim($tmp[2]);
            $toInsert['description'] = trim($tmp[3]);
            $toInsert['texture'] = '/images/supports/textures/'.trim($tmp[4]);*/

            $textures[]=$toInsert;
        }

        DB::table('texture')->insert($textures);
    }
}
