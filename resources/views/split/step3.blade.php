@extends( "split.master" )

@section( "content" )

	<h2 lang="it">Dimensioni cassetto</h2>
	
	<form action='{{ route( "split.step4" ) }}' method="POST" v-on:submit.prevent="checkChoice" id="drawertypes">
		
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
	
	<script>

		var step2 = new Vue({

		  el: '#drawer_dimensions',

		  data: {
		    length: 100,
		    width: 100,
		    depth: 10,
		    two: {},
		    shouder: {},
		    rect: {},
		    hor_line: {}
		  },

		  methods: {

		    inittwo: function () {

		      	var elem = document.getElementById('animation');

			  	this.two = new Two({ width: 300, height: 300, autostart: true }).appendTo(elem);

			  	this.rect = this.two.makeRectangle(this.two.width/2 - 30, this.two.height/2 -30, 100, 100);
		      	this.rect.linewidth = 7;
		      	this.rect.stroke = '#1C75BC';
			  	this.rect.fill = 'rgba(0, 200, 255, 0.75)'; 

			  	var line = this.two.makeLine(this.two.width/2 - 30, this.two.height/2 -60, this.two.width/2 +30, this.two.height/2 -60);
			  	line.stroke = '#000000';



			  	this.shoulder = this.two.makeRectangle(this.two.width/2 - 30,  this.two.height/2 + 100, 100, 30);
		      	this.shoulder.linewidth = 2;
		      	this.shoulder.stroke = '#1C75BC';
			  	this.shoulder.fill = 'rgba(0, 200, 255, 0.75)'; 
		    },

		   	updateDrawer: function() {	
		   		this.two.remove( this.rect );
				this.rect = this.two.makeRectangle(this.two.width/2 - 30, this.two.height/2 -30, this.width, this.length );
			    this.rect.linewidth = 7;
			    this.rect.stroke = '#1C75BC';
				this.rect.fill = 'rgba(0, 200, 255, 0.75)';
		  	},

		   	updateShoulder: function() {	
		   		this.two.remove( this.shoulder );
				this.shoulder = this.two.makeRectangle(this.two.width/2 - 30, this.two.height/2 + 100, this.depth, 30);
			    this.shoulder.linewidth = 2;
			    this.shoulder.stroke = '#1C75BC';
				this.shoulder.fill = 'rgba(0, 200, 255, 0.75)';
		  	},		  	

		  },

		  ready() {
  				this.inittwo()
		  }
		});

	</script>

	
@endsection