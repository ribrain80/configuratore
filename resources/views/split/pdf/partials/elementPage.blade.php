<div class="container-fluid keeptogether additionalpages always-page-break-after" >
    <div class="row">
        @foreach($page as $item)
            @include('split.pdf.partials.elementblock',['element'=>$item])
        @endforeach
    </div>
    <br>
</div>