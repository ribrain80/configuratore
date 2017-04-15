<?php

use Illuminate\Database\Seeder;

class DrawerTypesTexturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $elements = [];
        echo "qua";
        foreach (\App\Models\Texture::all() as $cur) {
            //DrawerType 1 Lineabox 4 lati
            $lb4["drawertypes"]=1;
            $lb4["texture"]=$cur->id;
            $lb4["background"] = ($cur->universal==true);
            $lb4["left"] = ($cur->universal==false);
            $lb4["right"] = ($cur->universal==false);
            $lb4["front"] = ($cur->universal==false);
            $lb4["back"] = ($cur->universal==false);

            //DrawerType 2 Lineabox 3 lati
            $lb3["drawertypes"]=2;
            $lb3["texture"]=$cur->id;
            $lb3["background"] = ($cur->universal==true);
            $lb3["left"] = ($cur->universal==false);
            $lb3["right"] = ($cur->universal==false);
            $lb3["front"] = ($cur->universal==true);
            $lb3["back"] = ($cur->universal==false);

            //DrawerType 3 Lineabox 2 lati
            $lb2["drawertypes"]=3;
            $lb2["texture"]=$cur->id;
            $lb2["background"] = ($cur->universal==true);
            $lb2["left"] = ($cur->universal==false);
            $lb2["right"] = ($cur->universal==false);
            $lb2["front"] = ($cur->universal==true);
            $lb2["back"] = ($cur->universal==true);


            //DrawerType 4 cassetto
            $cas["drawertypes"]=4;
            $cas["texture"]=$cur->id;
            $cas["background"] = ($cur->universal==true);
            $cas["left"] = ($cur->universal==true);
            $cas["right"] = ($cur->universal==true);
            $cas["front"] = ($cur->universal==true);
            $cas["back"] = ($cur->universal==true);



            $elements[]=$lb4;
            $elements[]=$lb3;
            $elements[]=$lb2;
            $elements[]=$cas;
        }


        DB::table('drawertypestextures')->insert($elements);
    }
}
