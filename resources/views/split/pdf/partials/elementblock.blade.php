

<div class="col-xs-6 boxelem">
        @if($element)
        <?php
        //Prepare dimension values
        $obj = $element['item'];
        $w = $obj->width;
        $l = 0;
        $d = 0;

        switch ($element['type']) {
            case 'divider':
                $l = $obj->length;
                $d = $obj->depth;
                break;
            case 'bridge':
                $l = $obj->pivot->length;
                $d = $obj->depth;
                break;
            case 'support':
                $l = $obj->pivot->length;
                $d = $obj->height;
                break;

            default:
                $l=0;
                $d=0;
        }

        ?>
                <h3>{{ $element['label'] }}</h3>
                <img src="http://placehold.it/350x120" class="img-responsive">
                <p><b>NR</b> {{ $element['count'] }}</p>
                <p><b>CODICE</b>  {{ $element['sku'] }}</p>
                <p><b>DIMENSIONI (mm)</b>
                        @if ($w):
                                <span> {{ $w }}</span> &times;
                        @endif
                        <span class="{{ $element['type'] }}"> {{ $l }}</span> &times;
                        <span> {{ $d }}</span>

                <p><b>FINITURA</b> TODO</p>
        @else
                <h3>&nbsp;</h3>
                <img src="http://placehold.it/350x120" class="img-responsive">
                <p><b>NR</b></p>
                <p><b>CODICE</b></p>
                <p><b>DIMENSIONI (mm)</b></p>
                <p><b>FINITURA</b> </p>
        @endif


</div>