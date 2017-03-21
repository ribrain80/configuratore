<template>
    
    <!-- Container -->
    <div class="row" id="step2">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2 >{{ 'step2.title' | translate }}</h2>
        </div>

        <!-- Alerts: User Warning -->
        <div class="col-lg-12" v-if="$store.state.drawertype == 0">
            <div class="alert alert-warning alert-dismissible fade in">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>{{ 'attenzione' | translate }}</strong> {{ 'step2.warning' | translate }}
            </div>
        </div>

        <!-- Drawer type choice -->
        <div class="col-lg-3" v-for="( type,category ) in $store.state.drawerTypes">
            
            <!-- Level 1 navigation -->
            <div v-if="type.length == 1">
                <div class="panel panel-default" :class="{ 'bg-success': ( type[ 0 ].id == $store.state.drawertype ) }">
                    <div class="panel-body" @click="setType( type[ 0 ].id )">{{ type[ 0 ].description  | translate}}</div>
                </div>
            </div>
            
            <!-- Level 2 navigation -->
            <div v-else>
                
                <!-- Category panel -->
                <div class="panel panel-default">
                    <div class="panel-body" @click="setDrawerTypeCategory_( 1 )">{{ category | translate}}</div>
                </div>
                
                <!-- Subcategories -->
                <div class="drawerlist" :id="category" v-show="$store.state.drawer_type_category == 1">
                    <div class="col-lg-12" v-for="ctype in type">
                        <div class="panel panel-default " :class="{ 'bg-success': ( ctype.id == $store.state.drawertype ) }">
                            <div class="panel-body" @click="setType( ctype.id )">{{ ctype.description | translate}}</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <!-- Next button -->
        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
            <router-link to="/split/step1" tag="button">{{ 'back' | translate }}</router-link>
        </div>

    </div>
    
</template>

<script>

// # Import map getters
import { mapGetters } from 'vuex'

/**
 * Vue object managing drawer type selection
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

    /**
     * Object methods
     * @type {Object}
     */
    methods: {

        /**
         * Imported getters from store
         */
        ...mapGetters([
            "actual_lineabox_shoulder_height_LOW"
        ]),

         /**
         * Sets the drawer category, commit related store mutation
         * @param {int} cat 
         * @private
         */
        setDrawerTypeCategory_: function( cat ) {
            this.$store.commit( "setDrawerTypeCategory", cat );
        },

        /**
         * Sets the type ( user choice )
         * @param {int} type the drawer type chosen
         */
        setType: function ( type ) {

            // # Data container updates
            this.$store.commit( "setDrawerType", type );
            this.$store.commit( "isLineaBox", type != 4 ); 

            // # Clean up next step already insert data, eventually
            this.$store.commit( "clearBridgeData" ); 
            this.$store.commit( "setBridgeOrientation", "" ); 

            // # Set a default 4 lineabox select
            if( type != 4 ) {
                this.$store.commit( "setShoulderHeight", this.actual_lineabox_shoulder_height_LOW() );
            }  else {
                // # Step2 is completed, everything's ok
                this.$store.commit( "setTwocompleted", true );
                this.$store.commit( "setDrawerTypeCategory", 0 );
            }         
        },      

        /**
         * Checks inputs for this step
         * @return {Boolean} 
         */
        check: function() {

            // # Check choice
            if( 0 != this.$store.state.drawertype ) {

                // # Step2 is completed, everything's ok
                this.$store.commit( "setTwocompleted", true );

                // # Push me to the next step
                this.$router.push( { path: '/split/step3' } );

                // # OK
                return true;
            }

            // # Step1 has errors
            this.$store.commit( "setTwocompleted", false );

            // # Modal Error display
            $( "#error-modal" ).find( '.modal-body' ).text( Vue.i18n.translate( "step2.warning" ) );
            $( '#error-modal' ).modal();

            // # Error
            return false; 
        }
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

            // # Step 1 is completed ?
            if( !vm.$store.state.onecompleted ) {
                 vm.$router.push( { path: '/split/step1' } );
            }
        })
    }, 

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted() {

        // # Log mount 
        console.log( "Step2 Mounted!" );

        // # User reset advice ( shown once if user cames back here from one of the next steps )
        if( this.$store.state.bridgecompleted || this.$store.state.fourcompleted ) {
          
            // # Show modal alert
            $( "#error-modal" ).find('.modal-body').text( Vue.i18n.translate( "resetadvice" ) );
            $( '#error-modal' ).modal();

            // # And back
            return false;
        }        

    }
}
</script>