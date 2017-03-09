<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/pdf.css') }}">
        <title>Salice Configuratore Split</title>
        <meta name="generator" lang="en" content="Configuratore split">
        <meta name="author" content="Salice">
        <link rel="author" href="http://www.salice.it">
    </head>
    <body>
    <div class="wrap">
        <div class="container-fluid keeptogether" id="page1">
            <div class="row">
                <div class="col-xs-12">
                    &nbsp;
                    <div id="box2d">
                        &nbsp;
                    </div>
                </div>
            </div>
            <div class="row">
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
                        &nbsp;
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xe-6"></div>
                <div class="col-xs-6" style="float: right;display: none">
                    <?php
                    QrCode::size(252);
                    ?>
                    {!! QrCode::generate('IL TESTO') !!}
                </div>
            </div>

        </div>
    </div>

    </body>
</html>