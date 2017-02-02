<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drawertype extends Model
{
    public function drawer()
    {
        return $this->hasMany('App\Drawer');
    }    
}
