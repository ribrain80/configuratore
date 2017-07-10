<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="{{ asset('css/pdf.css') }}">
    <style>
        
        th {
            font-weight: 500!important;
            font-family: "FranklinGothicURW-Dem", sans-serif!important;
        }
    </style>
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
                <table class="headertable table table-bordered">
                    <thead>
                    <tr>
                        <th>{!! trans( 'pdf.header_type' ) !!}</th>
                        <th>{!! trans( 'pdf.header_edges' ) !!}</th>
                        <th>{!! trans( 'pdf.header_back' ) !!}</th>
                        <th>{!! trans( 'pdf.header_background' ) !!}</th>
                        <th>{!! trans( 'pdf.header_front' ) !!}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>

                        <td>{{ $model->drawertype->description }}</td>
                        <td id="spondatd">
                            @lang('texture.'.trim(str_replace(' ','_',\App\Models\Texture::where('id',$model->sponda_left)->get()->first()->name)))
                             /
                            @lang('texture.'.trim(str_replace(' ','_',\App\Models\Texture::where('id',$model->sponda_right)->get()->first()->name)))
                        </td>
                        <td>@lang('texture.'.trim(str_replace(' ','_',\App\Models\Texture::where('id',$model->sponda_back)->get()->first()->name)))</td>
                        <td>@lang('texture.'.trim(str_replace(' ','_',\App\Models\Texture::where('id',$model->background)->get()->first()->name)))</td>
                        <td>@lang('texture.'.trim(str_replace(' ','_',\App\Models\Texture::where('id',$model->sponda_front)->get()->first()->name)))</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    <div class="row">
        <div class="col-lg-12">
            <table id ="secondhead" class="headertable table table-bordered" >
                <thead>
                <tr>
                    <th>@lang('pdf.header_internalWidth') (mm) </th>
                    <th>@lang('pdf.header_internalDepth') (mm) </th>
                    <th>@lang('pdf.header_internalHeight') (mm) </th>


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