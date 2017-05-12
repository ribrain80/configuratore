<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/pdf.css') }}">
    <title>Salice Configuratore Split</title>
    <meta name="generator" lang="en" content="Configuratore split">
    <meta name="author" content="Salice">
    <link rel="author" href="http://www.salice.it">
    <style>
        svg {
            width: 50%;
            max-width: 50%;
            max-height: 80%;
            border:1px solid black;
            margin: 0  auto;
            display: block
        }
    </style>
</head>
<body>
<div class="wrap">
    <div class="container-fluid keeptogether" id="page1">
        <div class="row">
            <div class="col-xs-12">
                &nbsp;
                <div id="box2d">
                    &nbsp;{!! $model->svg !!}
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 0">
            @foreach($dividers['first'] as $divider)
                @include('split.pdf.partials.elementblock',['element'=>$divider])
            @endforeach

        </div>
    </div>
    @foreach($dividers['pages'] as $page)
        @include('split.pdf.partials.elementPage',['page'=>$page])
    @endforeach

    <div class="container-fluid keeptogether" id="last">
        <div class="row">
            <div class="col-xs-12">
                &nbsp;
                <div id="box3d">
                    <img src="{!! $model->png !!}"/>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 50px">
            <div class="col-xs-6 pull-right" style="">
                <img src="{{asset('images/qrcode.png')}}" class="img img-responsive">
                <div class="push"></div>
            </div>
        </div>

    </div>
</div>

</body>
</html>
