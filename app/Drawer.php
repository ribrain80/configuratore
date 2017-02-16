<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $drawertypes_id
 * @property integer $edgecolor
 * @property integer $width
 * @property integer $lenght
 * @property integer $height
 * @property integer $side_num
 * @property string $created_at
 * @property string $updated_at
 * @property Drawertype $drawertype
 * @property Edgecolor $edgecolor
 * @property Drawerbridge[] $drawerbridges
 * @property Drawerdivider[] $drawerdividers
 */
class Drawer extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['drawertypes_id', 'edgecolor', 'width', 'lenght', 'height', 'side_num', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function drawertype()
    {
        return $this->belongsTo('App\Drawertype', 'drawertypes_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function edgecolor()
    {
        return $this->belongsTo('App\Edgecolor', 'edgecolor');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drawerbridges()
    {
        return $this->belongsToMany('App\Bridge', 'drawerbridge','drawer','bridge');
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drawerdividers()
    {
        return $this->belongsToMany('App\Divider', 'drawerdivider','drawer','divider');
    }
}
