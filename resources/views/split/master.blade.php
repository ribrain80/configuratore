<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/pace-theme-loading-bar.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/gridstack.min.css') }}">
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

<div class="cover"></div>

<!-- New configration alert Modal -->
<div class="modal fade" id="new-conf-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header alert-danger">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel" lang="it">Attenzione</h4>
      </div>
      <div class="modal-body" lang="it">
        Se clicchi su continua i dati inseriti andranno persi.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Annulla!</button>
        <button type="button" class="btn btn-primary" onclick="window.location.reload();">Continua</button>
      </div>
    </div>
  </div>
</div>

<!-- Generic error Modal -->
<div class="modal fade" id="error-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header alert-danger">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel" lang="it">Attenzione</h4>
      </div>
      <div class="modal-body" lang="it" id="generic-alert-message">  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Ok!</button>
      </div>
    </div>
  </div>
</div>

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
            <newconfiguration></newconfiguration>
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
            <ul class="nav hidden-xs affix-top" data-spy="affix" data-offset="70px" id="nav">
                <li><a href="#step1" class="inpagenav" lang="it">1</a></li>
                <li><a href="#step2" class="inpagenav" lang="it">2</a></li>
                <li><a href="#step3" class="inpagenav" lang="it">3</a></li>
                <li><a href="#step4" class="inpagenav" lang="it">4</a></li>
                <li><a href="#step5" class="inpagenav" lang="it">5</a></li>
            </ul>
        </div>
        <div class="col-sm-10 col-md-11" id="maincontent">
            @yield( "content" )
        </div>
    </div>
</div>

<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ elixir('js/vendor.js') }}"></script>
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
