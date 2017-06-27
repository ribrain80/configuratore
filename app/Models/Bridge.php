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
 * @property Drawerbridge[] $drawerbridges
 */
class Bridge extends Model
{
    /**
     * @var array
     */
    protected $fillable = [ 'width', 'lenght', 'height', 'created_at', 'updated_at '];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drawerbridges()
    {
        return $this->belongsToMany('App\Models\Drawer', 'drawerbridge','bridge','drawer')
            ->withPivot( ['orientation','length'] );
    }
}
