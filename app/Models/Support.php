<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Support extends Model
{

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drawerdividers()
    {
        return $this->belongsToMany('App\Models\Drawers', 'drawersupport','support','drawer')
            ->withPivot(['orientation','length']);
    }
}
