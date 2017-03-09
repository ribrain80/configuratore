<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $hex
 * @property string $ral
 * @property Drawer[] $drawers
 */
class Edgecolor extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'edgecolor';

    /**
     * @var array
     */
    protected $fillable = ['name', 'hex', 'ral'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function drawers()
    {
        return $this->hasMany('App\Models\Drawer', 'edgecolor');
    }
}
