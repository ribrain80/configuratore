<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $bridge
 * @property integer $color
 * @property integer $drawer
 * @property float $x
 * @property float $y
 * @property Bridge $bridge
 * @property Detailcolor $detailcolor
 * @property Drawer $drawer
 */
class DrawerBridge extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'drawerbridge';

    /**
     * @var array
     */
    protected $fillable = ['bridge', 'color', 'drawer', 'x', 'y'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bridge()
    {
        return $this->belongsTo('App\Bridge', 'bridge');
    }

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
    public function drawer()
    {
        return $this->belongsTo('App\Drawer', 'drawer');
    }
}
