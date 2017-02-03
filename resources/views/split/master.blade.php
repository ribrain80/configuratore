<html>
	<head>
		
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
		<script src="{{ elixir('js/vendor.js') }}"></script>
		<script src="{{ asset('js/app.js') }}"></script>
		<script>
			var lang = new Lang();
			//TODO: USARE UN VETTORE DI INIZIALIZZAZIONE
            @foreach(config("languages") as $isoCode=>$langName)
            	@if($isoCode!="it")
            		lang.dynamic('{{$isoCode}}', '{{ asset("js/lang/en.json") }}');
            	@endif
            @endforeach
			lang.init({
			    defaultLang: 'it',
                allowCookieOverride: true
			});
		</script>
		@yield( "page-related-js" )
	</head>
	<body>
		<div class="container">
			<h3 lang="it">Benvenuti nel configuratore</h3>
			@include('shared.languageselector')
			@yield( "content" )
		</div>
		<script>
			//TODO: METTERE BENE STA ROBBA dentro un file
            $( document ).ready(function() {
               $('.langlink').on('click',function (e) {
                   $('li a.active').removeClass('active');
                   $(this).addClass("active");
				   window.lang.change($(this).data("langcode"))
				   e.preventDefault();
               })
            });
		</script>
	</body>
</html>
