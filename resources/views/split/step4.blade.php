@extends( "split.master" )

@section( "content" )

	<h2 lang="it">Divisori</h2>
	
	<form action='{{ route( "split.step5" ) }}' method="POST" @submit.prevent="checkChoice" id="drawertypes">
		
		<div class="row" id="drawer_dimensions">

			<div class="col-lg-6"> 

			  <!-- Nav tabs -->
			  <ul class="nav nav-tabs" role="tablist">
			    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
			    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
			    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
			    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
			  </ul>
				  <!-- Tab panes -->
			  <div class="tab-content">
			    <div role="tabpanel" class="tab-pane active" id="home">h 44.5</div>
			    <div role="tabpanel" class="tab-pane" id="profile">h 70</div>
			    <div role="tabpanel" class="tab-pane" id="messages">h 88.5</div>
			    <div role="tabpanel" class="tab-pane" id="settings">ponte</div>
			  </div>

			</div>

			<div class="col-lg-4 col-lg-offset-1" >
				
			</div>

		</div>

		<div class="row">
			<div class="col-lg-3"><input lang="it" type="submit" id="step2-next" class="btn btn-info" value="Avanti" /></div>
		</div>		
	</form>

    <script src="{{ asset('js/split/step4.js') }}"></script>

	
@endsection
