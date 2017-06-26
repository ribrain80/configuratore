<!doctype html>
<html lang="en">
<head>
    
    <!-- Viewport meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    
    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset( 'images/salice.ico' ) }}">   
     
    <!-- App Css -->
    <link rel="stylesheet" type="text/css" href="{{ elixir('css/split.css') }}">

    <!-- Laravl csrf token -->
    <script>window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]); ?></script>
    <script>window.isPhone = {{ $isPhone }};</script>

</head>
<body>
    
    <!-- PACE.js cover -->
    <div id="cover"></div>

    <!-- Application Container -->
    <div class="container-fluid" id="app">

        <!-- New configration alert Modal -->
        <div class="modal fade" id="new-conf-modal" tabindex="-1" role="dialog" aria-labelledby="">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header alert-danger">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">@{{ $t( 'attenzione' ) }}</h4>
                    </div>
                    <div class="modal-body">@{{ $t( 'data-loose-advice' ) }}</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-back" data-dismiss="modal">@{{ $t( 'cancel' ) }}</button>
                        <button type="button" class="btn btn-danger" onclick="window.location = location.protocol+'//'+location.host+'/split/step1'">@{{ $t( "dont-mind-go" ) }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Generic error Modal -->
        <div class="modal fade" id="error-modal" tabindex="-1" role="dialog" aria-labelledby="">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header alert-danger">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">@{{ $t( 'attenzione' ) }}</h4>
                    </div>
                    <div class="modal-body" id="generic-alert-message">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Ok!</button>
                    </div>
                </div>
            </div>
        </div>        

        <div class="row wrapper">
            <sidebar></sidebar>
            <div class="col-sm-9 col-md-9 col-lg-10 content flexer">
                <appnavbar></appnavbar>
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>


    </div>

    <!-- Js Scripts -->
    <script src="/js/lib/fabric/fabric.js"></script>
    <script src="{{ elixir('js/split.js') }}"></script>
    <!-- Analytics -->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-99670688-1', 'auto');
        ga('send', 'pageview');

    </script>
    
</body>
</html>