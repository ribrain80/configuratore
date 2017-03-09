<div class="container-fluid keeptogether additionalpages" >
    <div class="row">
        @foreach($page as $item)
            @include('split.pdf.partials.elementblock',['element'=>$item])
        @endforeach
    </div>
</div>