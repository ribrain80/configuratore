<html>
<head>
    @include('shared.masterHead')
</head>
<body>
<div class="container">
    <h3 lang="it">Benvenuti nel configuratore</h3>
    <languageselector></languageselector>
    @yield( "content" )
</div>
    @include('shared.jsfooter')
</body>
</html>
