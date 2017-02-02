@extends( "split.master" )

@section( "content" )

	<h2 lang="it">Dimensioni cassetto</h2>
	
	<form action='{{ route( "split.step4" ) }}' method="POST" v-on:submit.prevent="checkChoice" id="drawertypes">
		
		<div class="row" id="drawer_dimensions">
			<div class="col-lg-8"> 
				<div class="row">

					<div class="input-group input-group-lg col-lg-3">
					  <span class="input-group-addon" id="basic-addon3">Lun</span>
					  <input type="text" class="form-control" aria-describedby="basic-addon3" v-model.lazy="length">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-lg col-lg-2">
					  <span class="input-group-addon" id="basic-addon3">Larg</span>
					  <input type="text" class="form-control" aria-describedby="basic-addon3" v-model.lazy="width">
					</div>

				</div>

				<div class="row">

					<div class="input-group input-group-lg col-lg-3">
					  <span class="input-group-addon" id="basic-addon3">Prof</span>
					  <input type="text" class="form-control" aria-describedby="basic-addon3" v-model.lazy="depth">
					</div>						

				</div>
			</div>

			<div class="col-lg-3" id="animation" style="width: 300px; height: 300px;border: 1px solid #000;"></div>
		</div>

		<div class="row">
			<div class="col-lg-3"><input lang="it" type="submit" id="step2-next" class="btn btn-info" value="Avanti" /></div>
		</div>		
	</form>
	
	<script>
		
		var step2 = new Vue({
		  el: '#drawer_dimensions',
		  data: {
		    length: 0,
		    width: 0,
		    depth: 0
		  },
		  methods: {
		    inittwo: function () {
		      var elem = document.getElementById('animation');
		      var two = new Two({ width: 285, height: 200 }).appendTo(elem);
		      var rect = two.makeRectangle(150, 70, 100, 100);
		      rect.linewidth = 7;
		      rect.stroke = '#1C75BC';
			  rect.fill = 'rgba(0, 200, 255, 0.75)';
			  two.play();
		    }
		  },
		  ready() {
  				this.inittwo()
			}
		});

	</script>

	
@endsection