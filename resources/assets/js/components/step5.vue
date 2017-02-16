<template>

    <div class="row" id="step5">

        <div class="col-lg-12">
            <h2 lang="it">Step finale</h2>
        </div>

		<div class="checkbox col-lg-12">
			<label>
				<input type="checkbox" @click="$parent.addBrochure2PDF( $event )" /> Brochure
			</label>
		</div>

		<div class="checkbox col-lg-12">
			<label>
				<input type="checkbox" v-model="$parent.summary" /> Riepilogo
			</label>
		</div>

		<div class="col-lg-12">
			<label>
				<input type="text" v-model="$parent.email" /> Indirizzo email 
			</label>
			<button class="btn btn-default" id="email" @click="$parent.savedrawer( $event )">Invia via email</button>
		</div>

		<div class="col-lg-12">	
			<button class="btn btn-default" id="download" @click="$parent.savedrawer( $event )">Scarica</button>	
		</div>		

    </div>

</template>