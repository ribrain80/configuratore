<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $drawertypes_id
 * @property integer $edgecolor_id
 * @property integer $width
 * @property integer $length
 * @property integer depth
 * @property integer $side_num
 * @property string $created_at
 * @property string $updated_at
 * @property Drawertype $drawertype
 * @property Edgecolor $edgecolor
 */
class Drawer extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['drawertypes_id', 'edgecolor_id', 'width', 'length', 'depth', 'side_num', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function drawertype()
    {
        return $this->belongsTo('App\Models\Drawertype', 'drawertypes_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function edgecolor()
    {
        return $this->belongsTo('App\Models\Edgecolor', 'edgecolor_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drawerbridges()
    {
        return $this->belongsToMany('App\Models\Bridge', 'drawerbridge','drawer','bridge')
            ->withPivot(['x','y']);
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drawerdividers()
    {
        return $this->belongsToMany('App\Models\Divider', 'drawerdivider','drawer','divider')
            ->withPivot(['color','texture','divider','x','y']);
    }
}
