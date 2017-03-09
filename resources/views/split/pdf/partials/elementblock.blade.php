<?php
$isBridge = (get_class($element)=='App\Models\Bridge');
?>

<div class="col-xs-6 boxelem">
    <h3>{{ $isBridge?"Elemento Ponte":"Contenitore" }}</h3>
    <img src="http://placehold.it/350x120" class="img-responsive">
    <p><b>NR</b> 1</p>
    <p><b>CODICE</b>  {{ $element->sku }}</p>
    <p><b>DIMENSIONI (mm)</b>
        {{ $element->width }} x
        <?php if ($isBridge):?>
        <span style="color:red">{{ $element->pivot->length }}</span>
        <?php else: ?>
        {{ $element->length }}
        <?php endif;?>
         x {{ $element->depth }}</p>
    <p><b>FINITURA</b> TODO</p>
</div>