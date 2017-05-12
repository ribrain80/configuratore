<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="{{ asset('css/pdf.css') }}">
</head>
<body>

<div class="container-fluid" id="hc" style="">
    <div class="row">
        <div class="col-sm-12">
            <img src="{{asset("images/testatapdf.jpg")}}" style="">
        </div>
    </div>
</div>
<div class="container-fluid" style="height: auto !important;min-height: 0">
<div class="wrap" style="height: auto !important;min-height: 0">

        <div class="row">
            <div class="col-lg-12">
                <table class="headertable table table-condensed table-bordered">
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
                        <td id="spondatd">
                            {{ $model->sponda_left ? \App\Models\Texture::where('id',$model->sponda_left)->get()->first()->name:'n.d.' }}
                             /
                            {{ $model->sponda_right ? \App\Models\Texture::where('id',$model->sponda_right)->get()->first()->name:'n.d.' }}
                        </td>
                        <td>{{ $model->sponda_back ? \App\Models\Texture::where('id',$model->sponda_back)->get()->first()->name:'n.d.' }}</td>
                        <td>{{ $model->background ? \App\Models\Texture::where('id',$model->background)->get()->first()->name:'n.d.' }}</td>
                        <td>{{ $model->sponda_front ? \App\Models\Texture::where('id',$model->sponda_front)->get()->first()->name:'n.d.' }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    <div class="row">
        <div class="col-lg-12">
            <table class="headertable table table-condensed table-bordered">
                <thead>
                <tr>
                    <th>Larghezza Interna Cassetto (mm) </th>
                    <th>Profondità Interna Cassetto (mm) </th>
                    <th>Altezza Interna Cassetto (mm) </th>


                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $model->width }}</td>
                        <td>{{ $model->length }}</td>
                        <td>{{ $model->depth }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</div>





</body>
</html>