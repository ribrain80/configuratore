<html>
	<head>
		
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ elixir('css/all.css') }}">
		<script src="{{ elixir('js/vendor.js') }}"></script>
		<script src="{{ asset('js/app.js') }}"></script>
		<script>
			var lang = new Lang();
			lang.dynamic('en', '{{ asset("js/lang/en.json") }}');
			lang.init({
			    defaultLang: 'it',
			    currentLang: 'it'
			});
		</script>
		@yield( "page-related-js" )
	</head>
	<body>
		<div class="container">
			<h3 lang="it">Benvenuti nel configuratore</h3>
			<div>
			<a href="#en" onclick="window.lang.change('en'); return false;">English</a> | <a href="#it" onclick="window.lang.change('it'); return false;">Italiano</a>
			</div>
			@yield( "content" )
		</div>
		
	</body>
</html>