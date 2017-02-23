<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/pace-theme-loading-bar.css') }}">
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

    </style>
</head>

<body data-spy="scroll" data-target=".scrollspy" data-offset="70">

<div class="cover"></div>

<nav role="navigation" class="navbar navbar-default navbar-fixed-top navbar-inverse">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <img alt="Brand" class="navbar-brand" src="{{ asset('/images/salice.jpg') }}">
        </div>
        <!-- Collection of nav links and other content for toggling -->
        <div id="navbarCollapse" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a lang="it" id="newone" href='{{route('split.onepage')}}'>Nuova configurazione</a></li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Scelta lingua <span class="caret"></span></a>
                    <languageselector></languageselector>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-2 col-md-1 scrollspy" >
            <ul class="nav hidden-xs hidden-sm affix-top" data-spy="affix" data-offset="70px" id="nav">
                <li><a href="#step1" class="inpagenav" lang="it">Step1</a></li>
                <li><a href="#step2" class="inpagenav" lang="it">Step2</a></li>
                <li><a href="#step3" class="inpagenav" lang="it">Step3</a></li>
                <li><a href="#step4" class="inpagenav" lang="it">Step4</a></li>
                <li><a href="#step5" class="inpagenav" lang="it">Step finale</a></li>
            </ul>
        </div>
        <div class="col-sm-10 col-md-11" id="maincontent">
            @yield( "content" )
        </div>
    </div>
</div>

<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ elixir('js/vendor.js') }}"></script>
    <script src="{{asset('js/lang/i18n.js')}}"></script>
    @stack('jsfooter')
    <script>
        /*var shiftWindow = function() { scrollBy(0, -$('body').data('offset')) };
        if (location.hash) shiftWindow();
        window.addEventListener("hashchange", shiftWindow);*/
        var h = document.body.clientHeight;
        var hn = $('nav').outerHeight();
        $('section').outerHeight(h-hn);

        Pace.on("start", function(){
            $(".cover").show();
        });

        Pace.on("done", function(){
            $(".cover").fadeOut(2000);
        });

        var navOffset = $('.navbar').height();

        $('a.inpagenav').click(function(event) {
            var href = $(this).attr('href');

            // Don't let the browser scroll, but still update the current address
            // in the browser.
            event.preventDefault();
            window.location.hash = href;

            // Explicitly scroll to where the browser thinks the element
            // is, but apply the offset.
            $(href)[0].scrollIntoView();
            window.scrollBy(0, -navOffset);
        });
    </script>
</body>
</html>                                		
