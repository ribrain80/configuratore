<template>

    <div class="row" id="step5">

        <div class="col-lg-12">
            <h2 lang="it">Step finale</h2>
        </div>

		<div class="checkbox col-lg-12">
			<label>
				<input type="checkbox" v-model="$parent.brochure" /> Brochure
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
			<button class="btn btn-danger" id="email" @click="$parent.savedrawer( $event )">Invia via email</button>
		</div>

		<div class="col-lg-12">	
			<button class="btn btn-danger" id="download" @click="$parent.savedrawer( $event )">Scarica</button>	
		</div>		

    </div>

</template>