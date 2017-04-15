<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Texture extends Model
{
    protected $table = "texture";


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function drawerstypes()
    {
        return $this->hasMany('App\Models\Drawertypestexture', 'texture');
    }

}
