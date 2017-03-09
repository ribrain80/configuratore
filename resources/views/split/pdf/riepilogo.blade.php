<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/pdf.css') }}">
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
                <?php for($i=0;$i<4;$i++):?>
                <div class="col-xs-6 boxelem">
                    <h3>CONTENITORE</h3>
                    <img src="http://placehold.it/350x120" class="img-responsive">
                    <p><b>NR</b></p>
                    <p><b>CODICE</b></p>
                    <p><b>DIMENSIONI (mm)</b></p>
                    <p><b>FINITURA</b></p>
                </div>
                <?php endfor;?>
            </div>
        </div>
        <div class="container-fluid keeptogether additionalpages" >
            <div class="row">
                <?php for($i=0;$i<6;$i++):?>
                <div class="col-xs-6 boxelem">
                    <h3>CONTENITORE</h3>
                    <img src="http://placehold.it/350x120" class="img-responsive">
                    <p><b>NR</b></p>
                    <p><b>CODICE</b></p>
                    <p><b>DIMENSIONI (mm)</b></p>
                    <p><b>FINITURA</b></p>
                </div>
                <?php endfor;?>
            </div>
        </div>
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
                <div class="col-xs-6" style="float: right">
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