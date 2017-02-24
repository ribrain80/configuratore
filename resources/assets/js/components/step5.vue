<template>

    <div class="row" id="step5">

        <div class="col-lg-12">
            <h2 lang="it">Step finale</h2>
        </div>
		
		<div class="col-lg-12" v-show="$parent.has_error">
            <div class="alert alert-danger alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> {{ $parent.alert_message }}
            </div>
        </div>

		<div class="checkbox col-lg-12">
			<label lang="it">
				<input type="checkbox" v-model="$parent.brochure" /> Brochure
			</label>
		</div>

		<div class="checkbox col-lg-12">
			<label lang="it">
				<input type="checkbox" v-model="$parent.summary" :disabled="true"/> Riepilogo
			</label>
		</div>

		<div class="col-lg-12">
			<label lang="it">
				<input type="text" v-model="$parent.email" /> Indirizzo email 
			</label>
		</div>
		<div class="col-lg-12">
			<button class="btn btn-danger" id="email" @click="$parent.savedrawer( $event )" lang="it">Invia via email</button>
		</div>
		<div class="col-lg-12" lang="it">
			Oppure 
		</div>

		<div class="col-lg-12">	
			<button class="btn btn-danger" id="download" @click="$parent.savedrawer( $event )" lang="it">Scarica</button>	
		</div>		

    </div>

</template>