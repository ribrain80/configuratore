<!DOCTYPE html>
<html lang="en">

<head>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="{{ elixir('css/split.css') }}">

    <script>window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]); ?></script>

    <style>

        canvas {
            padding-left: 0;
            padding-right: 0;
            margin-left: auto;
            margin-right: auto;
            display: inline-block;
        }

        /*#canvas {
            border: 10px solid #222;
        }*/
    </style>
</head>
<body>

<!-- New configration alert Modal -->
<div class="modal fade" id="new-conf-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header alert-danger">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Attenzione</h4>
            </div>
            <div class="modal-body" >Se clicchi su continua i dati inseriti andranno persi.</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Annulla!</button>
                <button type="button" class="btn btn-primary" onclick="window.location = location.protocol+'//'+location.host+'/split/step1'">Continua</button>
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
{{-- Application Container--}}
<div class="container-fluid" id="app">
    <div class="wrapper">
        <sidebar></sidebar>
        <div class="col-md-11 col-md-offset-1 col-lg-10 col-lg-offset-2 content ">
            <appnavbar></appnavbar>
            <transition name="fade">
                <step4_3d></step4_3d>
            </transition>
        </div>
    </div>
</div>
{{-- Js Scripts --}}
<script>

    paceOptions  = {
        ajax: true,
        eventLag: true,
        document: false,
        element: false,
        restartOnPushState: false,
        restartOnRequestAfter: false
    }

</script>
<script src="{{ elixir('js/split.js') }}"></script>
<script>


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

    /* $(function() {
     $.material.init();
     });*/



</script>
</body>
</html>