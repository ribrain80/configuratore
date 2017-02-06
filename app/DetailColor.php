<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $hex
 * @property string $ral
 * @property Drawerbridge[] $drawerbridges
 * @property Drawerdivider[] $drawerdividers
 */
class DetailColor extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'detailcolor';

    /**
     * @var array
     */
    protected $fillable = ['name', 'hex', 'ral'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function drawerbridges()
    {
        return $this->hasMany('App\Drawerbridge', 'color');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function drawerdividers()
    {
        return $this->hasMany('App\Drawerdivider', 'color');
    }
}
