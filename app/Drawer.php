<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drawer extends Model
{

    /**
     * Get the post that owns the comment.
     */
    public function drawertypes()
    {
        return $this->belongsTo('App\Drawertype');
    }

    public function dividers()
    {
        return $this->belongsToMany('App\Divider', 'drawer_divider')->withTimestamps();
    }
}
