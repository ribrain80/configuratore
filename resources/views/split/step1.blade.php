@extends( "split.master" )

@section( "page-related-js" )
	<script src="{{ asset('/js/split/step1.js') }}"></script>
@endsection

@section( "content" )
	
	<h2>Step0</h2>
	
	<div><a lang="it" id="newone" class="btn btn-info" href='{{ route( "split.step2")  }}'>Nuova configurazione</a></div>
	<div><a lang="it" id="oldone" class="btn btn-info" href='{{ route( "split.step4" ) }}'>Carica configurazione salvata in precedenza</a></div>
	
@endsection
