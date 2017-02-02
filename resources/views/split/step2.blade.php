@extends( "split.master" )

@section( "content" )

	<h2 lang="it">Tipologia di cassetto</h2>

	<form action='{{ route( "split.step3" ) }}' method="POST" v-on:submit.prevent="checkChoice" id="drawertypes">
		
		<div class="row" v-show="showAlert">
			<div class="col-lg-12 alert alert-warning alert-dismissible fade in" id="alert" lang="it">
				<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> E' necessario selezionare una tipologia di cassetto 
			</div>
		</div>

		<div class="row">
			
			@foreach( $drawerTypes as $type ) 
				<div class="panel panel-default col-lg-3" v-on:click="panelChoice">
				  <div class="panel-body" v-on:click="selectType" id="{{ $type->id }}" lang="it">
				    {{ $type->description }}
				  </div>
				</div>			
			@endforeach

			<input type='hidden' name="typeID" v-model="typeID" />
			<input type='hidden' name="drawerID" value="{{ $drawerID }}" />
			<input type="hidden" name="_token" value="{{ csrf_token() }}" />

		</div>

		<div class="row">
			<div class="col-lg-3"><input lang="it" type="submit" id="step2-next" class="btn btn-info" value="Avanti" /></div>
		</div>		
	</form>
	
	<script>

		var step2 = new Vue({
		  el: '#drawertypes',
		  data: {
		    typeID: '',
		    showAlert: false
		  },
		  methods: {

		    selectType: function ( event ) {
		      this.typeID = event.target.id;
		    },

		    checkChoice: function() {
		  
		    	if( this.typeID == "" ) {
		    		this.showAlert = true;
		    		return false;
		    	}

		    	document.forms[ 0 ].submit();
		    },

		    panelChoice: function( event ) {
		    	this.showAlert = false;
		    	$( event.target ).parent().toggleClass( "bg-success" );
		    	$( event.target ).parent().siblings().removeClass( "bg-success" );
		    }
		  }
		});

	</script>

	
@endsection