<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
        <style>
            .container {
                padding-bottom: 50px;
                padding-top: 50px;
            }
            .keeptogether {page-break-inside:avoid;margin-top: 150px}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h3>{{$drawer['id']}} - {{\App\Models\Drawertype::findOrFail($drawer['type'])->description}} - {{$drawer['label']}}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <table class="table table-bordered table-bordered table-condensed">
                        <thead>
                        <tr>
                            <th colspan="2">Dimensions</th>
                        </tr>
                        </thead>
                        <tr>
                            <td>Width</td>
                            <td>{{$drawer['dimensions']['width']}} mm</td>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td>{{$drawer['dimensions']['length']}} mm</td>
                        </tr>
                        <tr>
                            <td>Depth</td>
                            <td>{{$drawer['dimensions']['depth']}} mm</td>
                        </tr>
                    </table>
                </div>
                <div class="col-xs-8">
                    <table class="table table-bordered table-bordered table-condensed">
                        <thead>
                        <tr>
                            <th colspan="5">Dividers</th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>DESC</th>
                            <th>POS</th>
                            <th>TEXTURE</th>
                            <th>COLOR</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($drawer['dividers'] as $divider)
                            <tr>
                                <td>{{$divider['id']}}</td>
                                <td>{{$divider['label']}}</td>
                                <td>{{$divider['x']}} x {{$divider['y']}}</td>
                                <td>{{$divider['texture']}}</td>
                                <td>{{$divider['color']}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="col-xs-8 pull-right">
                    <table class="table table-bordered table-bordered table-condensed">
                        <thead>
                        <tr>
                            <th colspan="5">Bridges</th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>DESC</th>
                            <th>POS</th>
                            <th>TEXTURE</th>
                            <th>COLOR</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row keeptogether" style="">
                <div class="col-xs-12">
                    <h4>PIANTA</h4>
                    <img src="http://placehold.it/1200?text=Pianta" class="img-responsive"/>
                </div>
            </div>
            <div class="row keeptogether">
                <div class="col-xs-12">
                    <h4>RENDERING</h4>
                    <img src="http://placehold.it/1200?text=Rendering" class="img-responsive"/>
                </div>
            </div>
        </div>
    </body>
</html>