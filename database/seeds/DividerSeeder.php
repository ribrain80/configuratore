<?php

use Illuminate\Database\Seeder;

class DividerSeeder eXtends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $dividers = [];


        $csvFile = file(resource_path('data/dividers_reduced.csv'));

        foreach ($csvFile as $line) {
            $tmp = str_getcsv($line);
            $toInsert['sku'] = trim($tmp[0]);
            $toInsert['depth'] = trim(str_replace(",","",$tmp[1]));
            $dim = explode("x",$tmp[2]);
            $toInsert['width'] = trim($dim[0]);
            $toInsert['length'] = trim($dim[1]);
            $toInsert['image']='/images/dividers/' . $toInsert['depth'] . DIRECTORY_SEPARATOR . $toInsert['width'] . "X" . $toInsert['length'].".png";
            $toInsert['color'] = trim($tmp[3]);
            $toInsert['border'] = trim($tmp[4]);
            $toInsert['texture'] = trim($tmp[5]);
            $toInsert['description'] = trim($tmp[6]);
            $dividers[]=$toInsert;
        }


        DB::table('dividers')->insert($dividers);
    }
}
