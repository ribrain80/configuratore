<template>

	<!-- Container -->
    <div class="row" id="step5">
	
		<!-- Title -->
        <div class="col-lg-12">
            <h2 lang="it">Step finale</h2>
        </div>
		
		<!-- Brochure -->
		<div class="checkbox col-lg-12">
			<label lang="it">
				<input type="checkbox" name="brochure" v-model="brochure" /> Brochure
			</label>
		</div>
	
		<!-- Summary -->
		<div class="checkbox col-lg-12">
			<label lang="it"><input type="checkbox" name="summary" v-model="summary" :disabled="true" :checked="checked"/> Riepilogo</label>
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

            if( this.$store.state.pdf.brochure === false && this.$store.state.pdf.summary == false ) {

            	$( "#error-modal" ).find( '.modal-body' ).text( "è necessario scegliere almeno una delle opzioni tra Brochure e Riepilogo" );
                $( '#error-modal' ).modal();

                // # Step has errors
                this.$store.commit( "setFivecompleted", false );
                return false;
            }

            if ( event.target.id == "email" ) {

                if( this.$store.state.pdf.email.length === 0 ) {

                	$( "#error-modal" ).find( '.modal-body' ).text( "è necessario indicare un indirizzo email per la spedizione" );
	                $( '#error-modal' ).modal();

	                // # Step has errors
	                this.$store.commit( "setFivecompleted", false );
                    return false;
                }

                if( !this.validateEmail() ) {

                	$( "#error-modal" ).find( '.modal-body' ).text( "l'email indicata non è valida" );
	                $( '#error-modal' ).modal();

	                // # Step has errors
	                this.$store.commit( "setFivecompleted", false );                	
                    return false;
                }                

                this.$store.state.pdf.send = true;
                this.$store.state.pdf.download = false;

                // # DEBUG
                this.has_error = true;
                
            	$( "#error-modal" ).find( '.modal-body' ).text( "Funzionalità non testabile in homestead" );
                $( '#error-modal' ).modal();

                // # Step has errors
                this.$store.commit( "setFivecompleted", false );                	          

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

    beforeRouteEnter: (to, from, next) => {
        
        next( vm => {

            if( !vm.$store.state.onecompleted ) {
                 vm.$router.push({ path: '/split/step1' });
                 return;
            }

            if( !vm.$store.state.twocompleted ) {
                 vm.$router.push({ path: '/split/step2' });
                 return;
            }

            if( !vm.$store.state.threecompleted ) {
                 vm.$router.push({ path: '/split/step3' });
                 return;
            }

            if( !vm.$store.state.bridgecompleted ) {
                 vm.$router.push({ path: '/split/stepponte' });
                 return;
            }

            if( !vm.$store.state.fourcompleted ) {
                 vm.$router.push({ path: '/split/step4' });
                 return;
            }            

        })
    },    

    mounted () { // # Window onload eq
        console.log( "Step5 mounted!" );
    }
}

</script>