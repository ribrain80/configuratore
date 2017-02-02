<div>
    <ul class="languageselector">
        @foreach(config("languages") as $isoCode=>$langName)
            <li><a class="langlink" href="#_" data-langcode="{{$isoCode}}">{{$langName}}</a></li>
        @endforeach
    </ul>
</div>