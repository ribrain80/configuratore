<template>

<div class="container-fluid" id="step5">

	<!-- Container -->
    <div class="row" >

		<!-- Summary -->
        <div class="row top2">
    		<div class="checkbox col-lg-12 col-md-12 col-sm-12">
    			<div class="col-lg-3 col-md-3 col-sm-3">
                    <label>{{ "step5.summary_label" | translate }}</label>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2">
                    <button class="btn btn-danger" @click="savedrawer( $event )">{{  "step5.download" | translate }}</button> 
                </div>
    		</div>
        </div>

        <hr />

        <!-- Brochure -->
        <div class="row top2">
            <div class="checkbox col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-3 col-md-3 col-sm-3">
                    <label>Brochure</label>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2">
                    <a class="btn btn-danger" href="/pdf/brochure.pdf" target="_blank">{{ "step5.download" | translate }}</a>
                </div>
            </div>
        </div>

        <hr />
	
		<!-- Email -->
		<div class="row top2">
            <div class="checkbox col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-5 col-md-3 col-sm-3">
                    <div class="col-lg-3 no-padding-left lh-34"><label>{{  "step5.email_label" | translate }}</label></div>
                    <div class="col-lg-8"><input type="text" name="email" class="form-control text-center" v-model="$store.state.pdf.email" /></div>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2">
                    <button class="btn btn-danger" id="email" @click="savedrawer( $event )">{{ "step5.email_send" | translate }}</button>
                </div>
            </div>
		</div>

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
        return {}
    },

    methods: {

        /**
         * [savedrawer description]
         * @return {[type]} [description]
         */
        savedrawer: function( event ) {

            // # Mail mangement
            if ( event.target.id == "email" ) {

                // # Check email length
                if( this.$store.state.pdf.email.length === 0 ) {

                	$( "#error-modal" ).find( '.modal-body' ).text( "è necessario indicare un indirizzo email per la spedizione" );
	                $( '#error-modal' ).modal();

	                // # Step has errors
	                this.$store.commit( "setFivecompleted", false );

                    return false;
                }

                // # Check email validity
                if( !this.validateEmail_() ) {

                	$( "#error-modal" ).find( '.modal-body' ).text( "l'email indicata non è valida" );
	                $( '#error-modal' ).modal();

	                // # Step has errors
	                this.$store.commit( "setFivecompleted", false );   

                    return false;
                }                

                this.$store.state.pdf.send = true;
                this.$store.state.pdf.download = false;        	          
            }

            // # Download mangement
            if ( event.target.id == "download" ) {
                this.$store.state.pdf.send = false;
                this.$store.state.pdf.download = true;
            }
            
            // # Step has errors
            this.$store.commit( "setFivecompleted", true );   

            // # Scope fix
            var self = this;

            // # Let Pace track loading
            Pace.track( function() {

                console.log( self.$store.getters.exported );

                Axios.post( '/split/savedrawer', self.$store.getters.exported ).then( response => {

                    // # Got drawerID from server
                    self.$store.state.drawerId = response.data.id;

                    if ( event.target.id != 'email' ) {
                        window.open( response.data.pdfpath, '_blank' );
					} else {
                        alert( "Email inviata!" );
					}

                }, response => {
                    alert( "Si è verificato un errore!" );
                });
            });
        },

        /**
         * [validateEmail_ description]
         * @return {[type]} [description]
         */
        validateEmail_: function() {
            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test( this.$store.state.pdf.email );
        },

    },

    /**
     * Route guard: disallow route entering if previuos data has not been submitted
     * 
     * @param  {string}   to   [description]
     * @param  {string}   from [description]
     * @param  {string}   next [description]
     * @return {void} 
     */
    beforeRouteEnter: ( to, from, next ) => {
        
        next( vm => {

            // # is Step 1 completed ?
            if( !vm.$store.state.onecompleted ) {
                 vm.$router.push({ path: '/split/step1' });
                 return;
            }

            // # is Step 2 completed ?
            if( !vm.$store.state.twocompleted ) {
                 vm.$router.push({ path: '/split/step2' });
                 return;
            }

            // # is Step 3 completed ?
            if( !vm.$store.state.threecompleted ) {
                 vm.$router.push({ path: '/split/step3' });
                 return;
            }

            // # is Bridge step completed ?
            if( !vm.$store.state.bridgecompleted ) {
                 vm.$router.push({ path: '/split/stepponte' });
                 return;
            }

            // # is Step5 completed?
            if( !vm.$store.state.fourcompleted ) {
                 vm.$router.push({ path: '/split/step4' });
                 return;
            }            
        })
    },    

    /**
     * [mounted description]
     * @return {[type]} [description]
     */
    mounted () { // # Window onload eq
        console.log( "Step5 mounted!" );
        this.$store.commit( "setComponentHeader", "step5.header-title" );
    }
}

</script>
