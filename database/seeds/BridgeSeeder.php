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

        $dividers = [];


        $csvFile = file(resource_path('data/bridges.csv'));

        foreach ($csvFile as $line) {
            $tmp = str_getcsv($line);
            $toInsert['sku'] = trim($tmp[0]);
            $toInsert['sku_short'] = trim($tmp[1]);
            $toInsert['depth'] = (str_pad(trim(str_replace(",","",$tmp[2])),3,'0',STR_PAD_RIGHT)/10) ;
            $dim = explode("x",$tmp[3]);
            $toInsert['width'] = trim($dim[1]);
            $toInsert['image']='/images/bridges/' . $toInsert['depth'] . DIRECTORY_SEPARATOR .  "bridge.png";
            $toInsert['color'] = trim($tmp[4]);
            $toInsert['border'] = trim($tmp[5]);
            $toInsert['texture'] = trim($tmp[6]);
            $toInsert['description'] = trim($tmp[7]);
            $toInsert['textureImg'] = '/images/bridges/textures/'.$this->buildTextureImgName( $toInsert['color'], $toInsert['texture'] );
            $dividers[]=$toInsert;
        }


        DB::table('bridges')->insert($dividers);
    }


    private function buildTextureImgName ($color,$texture) {
        $color = str_replace(" ","",$color);
        $color = strtolower($color);
        $texture = str_replace(" ","",$texture);
        $texture = str_replace("(","-",$texture);
        $texture = str_replace(")","",$texture);
        $texture = str_replace("Spazzolata","Spazzolato",$texture);
        $texture = strtolower($texture);
        return $color . "_" . $texture . ".jpg";

    }

}
