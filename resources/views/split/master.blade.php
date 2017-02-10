<html>
<head>
    @include('shared.masterHead')
</head>
<body>
<nav class="navbar navbar-default navbar-inverse">
  <div class="container">
    Split
  </div>
</nav>
<div class="container">
    <h3 lang="it">Benvenuti nel configuratore</h3>
    <languageselector></languageselector>
    <div class="row">
    	@yield( "content" )
  	</div>
    
</div>
    @include('shared.jsfooter')
</body>
</html>
