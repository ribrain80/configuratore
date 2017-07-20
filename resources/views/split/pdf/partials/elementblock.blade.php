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
                $texture = trans('texture.'.trim(str_replace(' ','_',$obj->texture))) . " " . trans('texture.'.trim(str_replace(' ','_',$obj->color)));
                $img_src = asset($obj->image3d);
                $tex_src = asset($obj->baseTexture);
                break;
            case 'bridge':
                $l = $obj->pivot->length;
                $d = $obj->depth;
                $img_src = asset("/images/bridges/3D/".$obj->depth.".png");
                if ($l <= 600) {
                    $img_src = asset("/images/bridges/3D/".$obj->depth."_short.png");
                    $sku = $obj->sku_short;
                }
                $texture =  trans('texture.'.trim(str_replace(' ','_',$obj->texture))) . " " . trans('texture.'.trim(str_replace(' ','_',$obj->color)));
                $tex_src = asset($obj->textureImg);
                break;
            case 'support':
                $l = $obj->pivot->length;
                $d = $obj->height;
                $texture = trans('texture.'.trim(str_replace(' ','_',$obj->color)));
                $_itmp = "/images/supports/asso/supporto_ponte_". (($obj->height==455)?"basso":"alto").".png";
                $img_src = asset($_itmp);
                $tex_src = asset($obj->texture);
                break;

            default:
                $l=0;
                $d=0;
        }
        ?>
                <h3>@lang('pdf.label_'.strtolower(str_replace(' ','_',trim($element['label']))))</h3>
                <div style="width: 100%;border: 0.75pt solid black;">

                    <table>
                        <tr>
                            <td width="90%" style="width: 90%">
                                <img src="{{$img_src}}" style="width: auto;height: 100px; margin: 0 auto;display: block;padding-top: 15px">
                            </td>
                            <td>
                                <img src="{{$tex_src }}" style="width: 60px;height: 100px; margin: 0 auto;display: block;float: right;border: 1pt solid black">
                            </td>
                        </tr>
                    </table>

                </div>

                <p><b>@lang('pdf.nr'):</b> {{ $element['count'] }}</p>
                <p><b>@lang('pdf.code'):</b>  {{ $sku }}</p>
                <p><b>@lang('pdf.dimensions') (mm)</b>
                        @if ($w):
                                <span> {{ $w }}</span> &times;
                        @endif
                        <span class="{{ $element['type'] }}"> {{ $l }}</span> &times;
                        <span> {{ $d }}</span>

                <p><b>@lang('pdf.finish'):</b> {{ $texture }}</p>
        @else
                <h3>&nbsp;</h3>
        <div style="width: 100%;border: 0.75pt solid black;">
            <table>
                <tr>
                    <td width="87%" style="width: 84%"> &nbsp;
                    </td>
                    <td width="60px" style="border-left: 1pt solid  black;height: 100px">
                    </td>
                </tr>
            </table>
        </div>
                <p><b>@lang('pdf.nr'):</b></p>
                <p><b>@lang('pdf.code'):</b></p>
                <p><b>@lang('pdf.dimensions') (mm)</b></p>
                <p><b>@lang('pdf.finish'):</b> </p>
        @endif


</div>