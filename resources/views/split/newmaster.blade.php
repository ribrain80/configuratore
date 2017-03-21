<!DOCTYPE html>
<html lang="en">

<head>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/pace-theme-loading-bar.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/lightgallery.min.css') }}">
    <script>window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]); ?></script>

</head>
<body>
{{-- Application Container--}}
    <div class="container-fluid" id="app">
        <div class="wrapper">

            <div class="col-md-1 col-lg-2 sidebar">
                <div class="row">
                    <div class="col-xs-12 logo orange sidebar-elem">
                        SALICE
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 nuovaconf sidebar-elem">
                        nuova
                    </div>
                </div>
            </div>

            <div class="col-md-11 col-md-offset-1 col-lg-10 col-lg-offset-2 content">
                <router-view></router-view>
            </div>

        </div>
    </div>
   {{-- Js Scripts --}}
    <script src="{{ elixir('js/vendor.js') }}"></script>
    <script src="{{ elixir('js/app.js') }}"></script>
</body>
</html>