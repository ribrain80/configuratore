<template>

	<!-- Container -->
    <div class="row" id="step5">
	
		<!-- Title -->
        <div class="col-lg-12">
            <h2 lang="it">Step finale</h2>
        </div>
		
		<!-- Alerts: User Warning -->
		<div class="col-lg-12" v-show="has_error">
            <div class="alert alert-danger alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> {{ alert_message }}
            </div>
        </div>
		
		<!-- Brochure -->
		<div class="checkbox col-lg-12">
			<label lang="it">
				<input type="checkbox" v-model="brochure" /> Brochure
			</label>
		</div>
	
		<!-- Summary -->
		<div class="checkbox col-lg-12">
			<label lang="it">
				<input type="checkbox" v-model="summary" :disabled="true"/> Riepilogo
			</label>
		</div>
	
		<!-- Email -->
		<div class="col-lg-12">
			<label lang="it">
				<input type="text" v-model="email" /> Indirizzo email 
			</label>
		</div>

		<!-- Email send -->
		<div class="col-lg-12">
			<button class="btn btn-danger" id="email" @click="savedrawer( $event )" lang="it">Invia via email</button>
		</div>

		<div class="col-lg-12" lang="it">
			Oppure 
		</div>
		
		<!-- Download -->
		<div class="col-lg-12">	
			<button class="btn btn-danger" id="download" @click="savedrawer( $event )" lang="it">Scarica</button>	
		</div>		

    </div>

</template>

<script type="text/javascript">
	
/**
 * Vue object managing bridge / bridge support choice
 * @type {Vue}
 */
export default {

    /**
     * Object data
     * @type {Object}
     */
    data: function() { 

        return {

        	/**
        	 * [alert_message description]
        	 * @type {String}
        	 */
	        alert_message: '',

	        /**
	         * [has_error description]
	         * @type {Boolean}
	         */
	        has_error: false
	    }
    },

    methods: {

        savedrawer: function() {
            
            this.has_error = true;

            if( this.$store.state.drawertype < 1 ) {
                this.alert_message = "Non hai selezionato la tipologia del cassetto";
            	// # Take the user to the step to be fixed
            	this.$router.push({ path: '/split/step2' });
                return false;
            }

            if( !this.$store.state.dimensions.width || !this.$store.state.dimensions.length || !this.$store.state.dimensions.shoulder_height) {
                this.alert_message = "Controlla le dimensioni del cassetto";
            	// # Take the user to the step to be fixed
            	this.$router.push({ path: '/split/step3' });
                return false;
            }

            if( !this.$store.state.dividers_selected.length ) {
                this.alert_message = "Non hai scelto alcun divisorio";
            	// # Take the user to the step to be fixed
            	this.$router.push({ path: '/split/step4' });
                return false;
            }            

            if( this.$store.state.pdf.brochure === false && this.$store.state.pdf.summary == false ) {
                this.alert_message = "è necessario scegliere almeno una delle opzioni tra Brochure e Riepilogo";
                return false;
            }

            if ( event.target.id == "email" ) {

                if( this.$store.state.pdf.email.length === 0 ) {
                    this.alert_message = "è necessario indicare un indirizzo email per la spedizione";
                    return false;
                }

                if( !this.validateEmail() ) {
                    this.alert_message = "l'email indicata non è valida";
                    return false;
                }                

                this.$store.state.pdf.send = true;
                this.$store.state.pdf.download = false;

                // # DEBUG
                this.has_error = true;
                this.alert_message = "Funzionalità non testabile in homestead";

                return false;
            }


            if ( event.target.id == "download" ) {
                this.$store.state.pdf.send = false;
                this.$store.state.pdf.download = true;
            }

            var self = this;

            Pace.track( function() {



                self.$http.post( '/split/savedrawer', self.$store.state ).then( response => {
                    self.has_error = false;
                    window.open( response.body.pdfpath, '_blank' );
                }, response => {
                    self.alert_message = "impossibile completare l'operazione, si prega di riprovare più tardi";
                    self.has_error = true;
                });
            });
        },

        validateEmail: function() {
            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test( this.$store.state.email );
        }
    },

    mounted () { // # Window onload eq
        console.log( "Step5 mounted!" );
    }
}

</script>