<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Divider extends Model
{
    public function drawers()
    {
        return $this->belongsToMany('App\Drawer', 'drawer_divider')->withTimestamps();
    }
}
