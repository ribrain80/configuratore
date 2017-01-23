<html>
	<head>
		
		<link rel="stylesheet" type="text/css" href="asset('css/style.css');">
	</head>
	<body>
		<h3>SPLIT HP</h3>
		<div>
			@lang('messages.chooselanguage') 

			@foreach ( $available_langs as $lang )
				<a href="{{ $lang }}">{{ $lang }}</a> 
			@endforeach

		</div>
		@yield( "content" )
	</body>
</html>