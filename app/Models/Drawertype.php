<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drawertype extends Model
{
    public function drawer()
    {
        return $this->hasMany('App\Models\Drawer');
    }    
}
