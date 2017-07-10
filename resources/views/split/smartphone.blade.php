<!doctype html>
<html lang="en">
<head>
    
    <!-- Viewport meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    
    <!-- Title -->
    <title>Salice | Configuratore Split</title>

    <!-- Meta Description -->
    <meta name="description" content="Configuratore Split cassetti Salice" />
        
    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset( 'images/salice.ico' ) }}">   
     
    <!-- App Css -->
    <link rel="stylesheet" type="text/css" href="{{ elixir('css/split.css') }}">

    <!-- Laravl csrf token -->
    <script>window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]); ?></script>
    <script>window.isPhone = {{ $isPhone }};</script>

</head>
<body>

    <!-- Application Container -->
    <div class="container-fluid" id="app">

        <div class="row wrapper">
            <div class="row logocontainer">
                <div class="col-sm-12 logo orange sidebar-elem logo text-center">
                    <img src="/images/logos/salice.png"/>
                </div>
            </div>
            <div class="col-sm-12 content flexer">
                <appnavbar></appnavbar>
                <transition name="fade">
                    <smartphone></smartphone>
                </transition>
            </div>
        </div>


    </div>

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