<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ elixir('css/all.css') }}">
		<script src="{{ elixir('js/vendor.js') }}"></script>
		
		@yield( "page-related-js" )
	</head>
	<body>
		<div class="container">
			<h3>SPLIT</h3>
			<div>
				@lang('messages.chooselanguage') 
				@foreach ( $available_langs as $lang )
					<a href="{{ $lang }}">{{ $lang }}</a> 
				@endforeach
			</div>
			@yield( "content" )
		</div>
		<script src="{{ asset('/js/app.js') }}"></script>
		<script>
		this.$http.get('api/lang').success( function(lang) {
		  this.$set('lang', lang);
		}).error(function(error) {
		  console.log(error);
		});		

	</script>
	</body>
</html>