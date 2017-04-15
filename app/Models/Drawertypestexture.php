<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drawertypestexture extends Model
{
    protected $table = "drawertypestextures";

    public function rTexture()
    {
        return $this->belongsTo('App\Models\Texture', 'texture');
    }


}
