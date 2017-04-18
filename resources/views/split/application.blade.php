<!doctype html>
<html lang="en">
<head>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <!-- App Css -->
    <link rel="stylesheet" type="text/css" href="{{ elixir('css/split.css') }}">

    <!-- Laravl csrf token -->
    <script>window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]); ?></script>

</head>
<body>
    
    <div id="cover"></div>

    <!-- New configration alert Modal -->
    <div class="modal fade" id="new-conf-modal" tabindex="-1" role="dialog" aria-labelledby="">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Attenzione</h4>
                </div>
                <div class="modal-body">Se clicchi su continua i dati inseriti andranno persi.</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Annulla!</button>
                    <button type="button" class="btn btn-primary" onclick="window.location = location.protocol+'//'+location.host+'/split/step1'">Continua</button>
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
                    <h4 class="modal-title" id="myModalLabel">Attenzione</h4>
                </div>
                <div class="modal-body"  id="generic-alert-message">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Ok!</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Application Container -->
    <div class="container-fluid" id="app">
        <div class="row wrapper">
            <sidebar></sidebar>
            <div class="col-md-11 col-lg-10 content ">
                <appnavbar></appnavbar>
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>

    <!-- Js Scripts -->
    <script src="{{ elixir('js/split.js') }}"></script>
    <script>
    
    </script>

</body>
</html>