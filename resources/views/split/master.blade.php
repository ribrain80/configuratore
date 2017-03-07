<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/pace-theme-loading-bar.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/lightgallery.min.css') }}">
    <script>window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]); ?></script>
    <style>

    .cover {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1999;
        background:#fff;
        opacity: .8;
    }
    .scrollspy li a.inpagenav {
        width: 30px;
        height: 30px;
        text-align: center;
        padding: 4px 0;
        font-size: 16px;
        line-height: 1.42;
        border-radius: 15px;
        color:orangered;
        font-weight: bold;
    }
    .scrollspy .nav .active {
        width: 30px;
        height: 30px;
        text-align: center;
        font-weight: bold;
        color:#fff;
        font-size: 16px;
        line-height: 1.42;
        border-radius: 15px;
        background: orangered;
    }

    li a.inpagenav:hover {
        background: orangered !important;
        color:#fff;
    }

    .scrollspy .nav .active a {
        color:#fff !important;
    }

    </style>
</head>

<body data-spy="scroll" data-target=".scrollspy" data-offset="70">
<div class="container-fluid" id="app">
    <div class="row">
        <div class="col-sm-2 col-md-1 scrollspy" >
            <ul class="nav hidden-xs affix-top" data-spy="affix" data-offset="70px" id="nav">
                <li><a href="#" class="btn btn-lg btn-danger" id="gallery-trigger">Gallery</a></li>
                <!--<li><a href="#step1" class="inpagenav" lang="it">1</a></li>-->
                <li><router-link to="/step1">Step1</router-link></li>
            </ul>
        </div>
        <div class="col-sm-10 col-md-11" id="maincontent">
            <router-view></router-view>
        </div>
    </div>
</div>

<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ elixir('js/vendor.js') }}"></script>

</body>
</html>                                		
