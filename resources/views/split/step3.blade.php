@extends( "split.master" )

@section( "content" )

	<h2 lang="it">Dimensioni cassetto</h2>
	
	<form action='{{ route( "split.step4" ) }}' method="POST" @submit.prevent="checkChoice" id="drawer_dimensions">
		
		<div class="row" v-show="showAlert">
			<div class="col-lg-12 alert alert-danger alert-dismissible fade in" id="alert">
				<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione! @{{ alert_message }} </strong>
			</div>
		</div>

		<div class="row">

			<div class="col-lg-4"> 
				<div class="row">

					<div class="input-group input-group-md col-lg-12" v-bind:class="{ 'has-error': widthOOR }">
					  <span class="input-group-addon" id="basic-addon3" lang="it">Larghezza interna cassetto</span>
					  <input type="text" class="form-control" id="length" aria-describedby="basic-addon3" v-model="width" @keyup="updateDrawer" autocomplete="off">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-md col-lg-12" v-bind:class="{ 'has-error': lengthOOR }">
					  <span class="input-group-addon" id="basic-addon3" lang="it">Profondità interna cassetto</span>
					  <input type="text" class="form-control" id="width" aria-describedby="basic-addon3" v-model="length" @keyup="updateDrawer" autocomplete="off">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-md col-lg-12" v-bind:class="{ 'has-error': depthOOR }">
					  <span class="input-group-addon" id="basic-addon3" lang="it">Altezza interna sponda</span>
					  <input type="text" class="form-control" id="depth" aria-describedby="basic-addon3" v-model="depth" @keyup="updateDrawer" autocomplete="off">
					</div>						

				</div>
			</div>

			<div class="col-lg-6 col-lg-offset-1" >
				<div class="col-lg-12" id="animation"></div>
			</div>

		</div>

		<div class="row">
			<div class="col-lg-3"><input lang="it" type="submit" id="step2-next" class="btn btn-info" value="Avanti" /></div>
		</div>	
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />	
	</form>

    <script src="{{ asset('js/split/step3.js') }}"></script>

	
@endsection
 