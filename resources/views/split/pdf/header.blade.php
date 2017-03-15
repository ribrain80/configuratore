<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/pdf.css') }}">
</head>
<body>

<div class="container-fluid" id="hc">
    <div class="row">
        <div class="col-sm-12">
            <img src="{{asset("images/testatapdf.jpg")}}" style="">
        </div>
    </div>
</div>
<div class="wrap">
    <div class="container-fluid" >
        <div class="row">
            <div class="col-lg-12">
                <table class="headertable">
                    <thead>
                    <tr>
                        <th>{!! trans( 'pdf.header_type' ) !!} </th>
                        <th>FINITURA<br/>SPONDE</th>
                        <th>FINITURA<br/>RETRO</th>
                        <th>FINITURA<br/>FONDO</th>
                        <th>FINITURA<br/>FRONTALE</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{ $model->drawertype->description }}</td>
                        <td>{{ $model->edgecolor ? $model->edgecolor:'n.d.' }}</td>
                        <td>TODO</td>
                        <td>TODO</td>
                        <td>TODO</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>



</body>
</html>