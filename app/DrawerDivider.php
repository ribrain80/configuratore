<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $color
 * @property integer $divider
 * @property integer $drawer
 * @property float $x
 * @property float $y
 * @property Detailcolor $detailcolor
 * @property Divider $divider
 * @property Drawer $drawer
 */
class DrawerDivider extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'drawerdivider';

    /**
     * @var array
     */
    protected $fillable = ['color', 'divider', 'drawer', 'x', 'y'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function detailcolor()
    {
        return $this->belongsTo('App\Detailcolor', 'color');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function divider()
    {
        return $this->belongsTo('App\Divider', 'divider');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function drawer()
    {
        return $this->belongsTo('App\Drawer', 'drawer');
    }
}
