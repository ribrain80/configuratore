@extends( "split.master" )

@section( "content" )

	<h2 lang="it">Dimensioni cassetto</h2>
	
	<form action='{{ route( "split.step4" ) }}' method="POST" v-on:submit.prevent="checkChoice" id="drawertypes">
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />
		<div class="row" id="drawer_dimensions">
			<div class="col-lg-8"> 
				<div class="row">

					<div class="input-group input-group-lg col-lg-3">
					  <span class="input-group-addon" id="basic-addon3">Lun</span>
					  <input type="text" class="form-control" id="length" aria-describedby="basic-addon3" v-model.lazy="length" v-on:keyup="updateDrawer">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-lg col-lg-3">
					  <span class="input-group-addon" id="basic-addon3">Larg</span>
					  <input type="text" class="form-control" id="width" aria-describedby="basic-addon3" v-model.lazy="width" v-on:keyup="updateDrawer">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-lg col-lg-3">
					  <span class="input-group-addon" id="basic-addon3">Prof</span>
					  <input type="text" class="form-control" id="depth" aria-describedby="basic-addon3" v-model.lazy="depth" v-on:keyup="updateShoulder">
					</div>						

				</div>
			</div>

			<div class="col-lg-3" id="animation" style="width: 300px; height: 300px; border: 1px solid #000;"></div>
		</div>

		<div class="row">
			<div class="col-lg-3"><input lang="it" type="submit" id="step2-next" class="btn btn-info" value="Avanti" /></div>
		</div>		
	</form>

    <script src="{{ asset('js/split/step3.js') }}"></script>

	
@endsection