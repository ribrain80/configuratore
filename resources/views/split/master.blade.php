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

    </style>
</head>

<body>

    <!-- Pace loader cover -->
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
                <languageselector></languageselector>
            </div>
        </div>
    </nav>

    <div class="container-fluid" id="app">
        <div class="row">
            <div class="col-sm-2 col-md-1 scrollspy" >
                <ul class="nav hidden-xs affix-top" data-spy="affix" data-offset="70px" id="nav">
                    <li><a href="#" class="btn btn-lg btn-danger" id="gallery-trigger">Gallery</a></li>
                    <li><router-link to="/split/step1">1</router-link></li>
                    <li><router-link to="/split/step2">2</router-link></li>
                    <li><router-link to="/split/step3">3</router-link></li>
                    <li><router-link to="/split/step-ponte">B</router-link></li>
                    <li><router-link to="/split/step4">4</router-link></li>
                    <li><router-link to="/split/step5">5</router-link></li>
                </ul>
            </div>
            <div class="col-sm-10 col-md-11" id="maincontent">
                <router-view></router-view>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ elixir('js/vendor.js') }}"></script>
        @stack('jsfooter')
        <script>

            Pace.on("start", function(){
                $(".cover").show();
            });

            Pace.on("done", function(){
                $(".cover").fadeOut( 2000 );
            });

            $('#gallery-trigger').on('click', function() {
             
                $(this).lightGallery({
                    dynamic: true,
                    dynamicEl: [{
                        "src": 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg',
                        'thumb': 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg',
                        'subHtml': '<h4>Fading Light</h4><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                    }, {
                        "src": 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg',
                        'thumb': 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg',
                        'subHtml': '<h4>Fading Light</h4><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                    }, {
                        "src": 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg',
                        'thumb': 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg',
                        'subHtml': '<h4>Fading Light</h4><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                    }]
                })
             
            });
        </script>
</body>
</html>