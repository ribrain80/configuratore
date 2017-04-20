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


        $csvFile = file(resource_path('data/dividers.csv'));

        foreach ($csvFile as $line) {
            $tmp = str_getcsv($line);
            $toInsert['sku'] = trim($tmp[0]);
            $toInsert['depth'] = trim(str_replace(",","",$tmp[1]));
            $dim = explode("x",$tmp[2]);
            $toInsert['width'] = trim($dim[0]);
            $toInsert['length'] = trim($dim[1]);
            $toInsert['imageH']='/images/dividers/base/' . DIRECTORY_SEPARATOR . 'H'. DIRECTORY_SEPARATOR . $toInsert['width'] . "x" . $toInsert['length'].".png";
            $toInsert['imageV']='/images/dividers/base/' . DIRECTORY_SEPARATOR . 'V'. DIRECTORY_SEPARATOR . $toInsert['width'] . "x" . $toInsert['length'].".png";
            $toInsert['color'] = trim($tmp[3]);
            $toInsert['border'] = trim($tmp[4]);
            $toInsert['texture'] = trim($tmp[5]);
            $toInsert['description'] = trim($tmp[6]);
            $toInsert['textureH'] = $this->buildTexture(
                    $toInsert['width'],
                    $toInsert['length'],
                    $toInsert['color'],
                    $toInsert['texture'],
                    'H'
                );
            $toInsert['textureV'] = $this->buildTexture(
                    $toInsert['width'],
                    $toInsert['length'],
                    $toInsert['color'],
                    $toInsert['texture'],
                    'V'
                );
            $toInsert['textureImg'] = '/images/dividers/textures/base/'.$this->buildTextureImgName( $toInsert['color'], $toInsert['texture'] );
            $toInsert['baseTexture'] = '/images/dividers/3dtextures/'.$this->buildTextureImgName( $toInsert['color'], $toInsert['texture'] );
            $toInsert['image3d'] = '/images/dividers/3d' . DIRECTORY_SEPARATOR . $toInsert['depth'] .'x'. $toInsert['width'] . "x" . $toInsert['length'].".png";
            $toInsert['model3d']='/images/dividers/models' . DIRECTORY_SEPARATOR .  $toInsert['length'] . "x" . $toInsert['width']."x" . $toInsert['depth'] . ".obj";
            $dividers[]=$toInsert;
        }




        DB::table('dividers')->insert($dividers);
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

    private function buildTexture($w,$l,$c,$t,$orr) {
        $out[] = '/images/dividers/textures';
        $out[] = $w . "X" . $l;
        $out[] = $orr;
        $out[] = $c.'_'.$t.'.png';
        $tmpPath = implode(DIRECTORY_SEPARATOR,$out);

        $tmpPath= strtolower($tmpPath);
        $tmpPath = str_replace(" ","",$tmpPath);
        $tmpPath = str_replace("(","-",$tmpPath);
        $tmpPath = str_replace(")","",$tmpPath);
        $tmpPath = str_replace("spazzolata","spazzolato",$tmpPath);

        return $tmpPath;

    }
}
