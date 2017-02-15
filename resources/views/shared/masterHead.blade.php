<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">

<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ elixir('js/vendor.js') }}"></script>
<script>window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]); ?></script>
@yield( "page-related-js" )