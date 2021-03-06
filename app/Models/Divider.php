<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $width
 * @property integer $lenght
 * @property integer $height
 * @property string $created_at
 * @property string $updated_at
 * @property Drawerdivider[] $drawerdividers
 */
class Divider extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['id','width', 'lenght', 'height', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drawerdividers()
    {
        return $this->belongsToMany('App\Models\Drawers', 'drawerdivider','divider','drawer')
            ->withPivot(['x','y']);
    }
}
