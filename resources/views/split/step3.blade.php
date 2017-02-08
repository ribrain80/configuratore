@extends( "split.master" )

@section( "content" )

	<h2 lang="it">Dimensioni cassetto</h2>
	
	<form action='{{ route( "split.step4" ) }}' method="POST" @submit.prevent="checkChoice" id="drawertypes">
		
		<div class="row" id="drawer_dimensions">

			<div class="col-lg-5"> 
				<div class="row">

					<div class="input-group input-group-md col-lg-12">
					  <span class="input-group-addon" id="basic-addon3" lang="it">Larghezza interna cassetto</span>
					  <input type="text" class="form-control" id="length" aria-describedby="basic-addon3" v-model="width" @keyup="updateDrawer">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-md col-lg-12">
					  <span class="input-group-addon" id="basic-addon3" lang="it">Profondità interna cassetto</span>
					  <input type="text" class="form-control" id="width" aria-describedby="basic-addon3" v-model="length" @keyup="updateDrawer">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-md col-lg-12">
					  <span class="input-group-addon" id="basic-addon3" lang="it">Altezza interna sponda</span>
					  <input type="text" class="form-control" id="depth" aria-describedby="basic-addon3" v-model="depth" @keyup="updateShoulder">
					</div>						

				</div>
			</div>

			<div class="col-lg-5 col-lg-offset-1" >
				<div class="col-lg-12" id="animation"></div>
			</div>

		</div>

		<div class="row">
			<div class="col-lg-3"><input lang="it" type="submit" id="step2-next" class="btn btn-info" value="Avanti" /></div>
		</div>		
	</form>

    <script src="{{ asset('js/split/step3.js') }}"></script>

	
@endsection
