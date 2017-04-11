<div class="col-xs-6 boxelem">
        @if($element)

        <?php
        //Prepare dimension values
        $obj = $element['item'];
        $w = $obj->width;
        $l = 0;
        $d = 0;
        $texture = "";
        $sku = $element['sku'];
        $img_src="http://placehold.it/350x100";

        switch ($element['type']) {
            case 'divider':
                $l = $obj->length;
                $d = $obj->depth;
                $texture = $obj->texture;
                $img_src = asset($obj->image3d);

                break;
            case 'bridge':
                $l = $obj->pivot->length;
                $d = $obj->depth;
                $img_src = asset("/images/bridges/3D/".$obj->depth.".png");
                $texture = $obj->texture;
                $sku = ((double)$obj->pivot->length<=600)?$obj->sku_short:$sku;
                break;
            case 'support':
                $l = $obj->pivot->length;
                $d = $obj->height;
                $texture = $obj->color;
                break;

            default:
                $l=0;
                $d=0;
        }
        ?>
                <h3>{{ $element['label'] }}</h3>
                <div class="imgContainer" style="width: 100%; height: 110px;border: 0.75pt solid black;">
                    @if ($element['type']=='divider' || $element['type']=='bridge')
                    <img src="{{$img_src}}" style="width: auto;height: 100px; margin: 5px auto;display: block">
                    @else
                    &nbsp;
                        @endif
                </div>
                <p><b>NR</b> {{ $element['count'] }}</p>
                <p><b>CODICE</b>  {{ $sku }}</p>
                <p><b>DIMENSIONI (mm)</b>
                        @if ($w):
                                <span> {{ $w }}</span> &times;
                        @endif
                        <span class="{{ $element['type'] }}"> {{ $l }}</span> &times;
                        <span> {{ $d }}</span>

                <p><b>FINITURA</b> {{ $texture }}</p>
        @else
                <h3>&nbsp;</h3>
        <div class="imgContainer" style="width: 100%; height: 110px;border: 0.75pt solid black;">
                &nbsp;
        </div>
                <p><b>NR</b></p>
                <p><b>CODICE</b></p>
                <p><b>DIMENSIONI (mm)</b></p>
                <p><b>FINITURA</b> </p>
        @endif


</div>