<template>

<div class="container-fluid" id="step5">
    
    <!-- User reset advice Modal -->
    <div class="modal fade" id="reset-advice-modal" tabindex="-1" role="dialog" aria-labelledby="">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">{{ $t( 'attenzione' ) }}</h4>
                </div>
                <div class="modal-body">{{ "step5.resetadvice" | translate }}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-back" data-dismiss="modal">{{ $t( 'cancel' ) }}</button>
                    <button type="button" class="btn btn-danger" @click="back2Four()">{{ $t( "dont-mind-go" ) }}</button>
                </div>
            </div>
        </div>
    </div>

    <div id="step5-content" class="content-flex content-flex-scrollable content-flex-padding">
    	<!-- Container -->
        <div class="row" >

    		<!-- Summary -->
            <div class="row top2">
        		<div class="checkbox col-lg-12 col-md-12 col-sm-12">
        			<div class="col-lg-3 col-md-4 col-sm-4">
                        <label>{{ "step5.summary_label" | translate }}</label>
                    </div>
                    <div class="col-lg-9 col-md-8 col-sm-8">
                        <button class="btn btn-danger" @click="savedrawer( $event )">{{  "step5.download" | translate }}</button> 
                    </div>
        		</div>
            </div>

            <hr />

            <!-- Brochure -->
            <div class="row top2">
                <div class="checkbox col-lg-12 col-md-12 col-sm-12">
                    <div class="col-lg-3 col-md-4 col-sm-4">
                        <label>{{ $t( "step5.brochure" ) }}</label>
                    </div>
                    <div class="col-lg-9 col-md-8 col-sm-8">
                        <a class="btn btn-danger" href="/pdf/brochure.pdf" target="_blank">{{ "step5.download" | translate }}</a>
                    </div>
                </div>
            </div>

            <hr />
    	
    		<!-- Email -->
    		<div class="row top2">

                <div class="checkbox col-lg-12 col-md-12 col-sm-12">
                    
                    <!-- Mail input -->
                    <div class="col-lg-5 col-md-8 col-sm-8">
                        <div class="col-lg-3 col-md-4 col-sm-4 no-padding-left lh-34"><label>{{  "step5.email_label" | translate }}</label></div>
                        <div class="col-lg-9 col-md-8 col-sm-8">
                            <input type="text" name="email" class="form-control text-center" v-model="$store.state.pdf.email" placeholder="Email" />
                        </div>
                    </div>

                    <!-- Send button -->
                    <div class="col-lg-3 col-md-4 col-sm-4">
                        <button class="btn btn-danger btn-lg" id="email" @click="savedrawer( $event )">{{ "step5.email_send" | translate }}</button>
                    </div>   
                               
                </div>
    		</div>

        </div>
    </div>
    <div class="row actions-toolbar">

        <!-- Prev button -->
        <div class="col-sm-4 col-md-3 col-lg-2">
            <button  @click="backAdvice()" class="btn btn-danger btn-back">{{ 'back' | translate }}</button>
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

                	$( "#error-modal" ).find( '.modal-body' ).text( Vue.i18n.translate( "step5.no-mail" ) );
	                $( '#error-modal' ).modal();

	                // # Step has errors
	                this.$store.commit( "setFivecompleted", false );

                    return false;
                }

                // # Check email validity
                if( !this.validateEmail_() ) {

                	$( "#error-modal" ).find( '.modal-body' ).text( Vue.i18n.translate( "step5.invalid-mail" ) );
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
                        $( "#error-modal" ).find( '.modal-body' ).text( Vue.i18n.translate( "step5.mail-sent" ) );
                        $( '#error-modal' ).modal();
					}

                }, response => {
                    $( "#error-modal" ).find( '.modal-body' ).text( Vue.i18n.translate( "step5.error-occurred" ) );
                    $( '#error-modal' ).modal();
                });
            });
        },

        /**
         * [backAdvice description]
         * @return {[type]} [description]
         */
        backAdvice: function () {

            $( "#reset-advice-modal" ).modal();
        },

        /**
         * Takes the user back to step4 ( after an advice has been accepted )
         * @return {void}
         */
        back2Four: function () {

            $( "#reset-advice-modal" ).modal( 'hide' );
            
            // # Take the user back
            this.$router.push({ path: '/split/step4' });
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
        this.$store.commit( "setCurrentStep", 5 );

        // ---------------------------------------------
        // SET SIDEBAR ITEM ACTIVE - BEGIN
        
        let pos = 0;
        let $pointer = $(".navigator .pointer-navigator"); 
        let $nav = $(".navigator #nav").find("li");
        let $active = $nav.find("a.router-link-active");
        
        pos = parseInt($active.parent("li").position().top);
        $pointer.removeAttr("style").attr("style","transform: translateY(" + pos.toString() + "px)");
        
        // SET SIDEBAR ITEM ACTIVE - END 
        // ---------------------------------------------
    }
}

</script>
