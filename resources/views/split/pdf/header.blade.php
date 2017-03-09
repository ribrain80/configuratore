<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <style>
        /**RESETS*/
        body {
            margin:0;
            background: #dadada;
        }
        .container-fluid {
            padding:0;
        }
        .headertable {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: 0;
            margin-right: 0;
        }
        .headertable thead {
            border-bottom: 0.25pt solid #000;
        }
        .headertable th {
            text-align: center;
            font-weight: bold;
            color: #000000;
            border-right: 0.25pt solid #000000;
            min-height: 40px;
            height: 40px;
        }

        .headertable th:last-child {
            border-right: none;
        }

        .headertable td {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            color: #000000;
            border-right: 0.5pt solid #000000;
            min-height: 50px;
            height: 50px;
        }

        .headertable td:last-child {
            border-right: none;
        }

        .wrap {
            padding-left: 20px;
            padding-right: 20px;
            width: 95%;
            margin-left: 5%;
            background: #fff;
        }

    </style>
</head>
<body>

<div class="container-fluid" >
    <div class="row">
        <div class="col-sm-12">
            <img src="{{asset("images/testatapdf.jpg")}}" style="width: 100%;">
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
                        <th>TIPOLOGIA<br/>CASSETTO</th>
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