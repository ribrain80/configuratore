<template>

<!-- Container -->
<div class="container-fluid" id="step-ponte">  
        
        <!-- Title -->
        <div class="row" >
            <div class="col-lg-12">
                <h2>{{ "stepponte.title" | translate }}</h2>
            </div>
        </div>
        
        <!-- Alerts: User Warning -->
        <div class="row" >
            <div class="col-lg-12">
                <div class="alert alert-warning" role="alert" v-html="$t( 'stepponte.info_message' )"></div>
            </div>
         </div>
        
        <!-- Orientation section -->
        <div class="row top2" >

            <!-- Orientation description -->
            <div class="col-lg-12 text-center">
                <span class="help-block">{{ 'stepponte.orientation_description' | translate }}</span>
            </div>

            <!-- Orientation choice -->
            <div class="col-lg-12">

                <div class="col-lg-4 col-lg-offset-2" v-show="$store.state.is_suitable_width_4hbridge">

                    <figure class="drawer-container" >

                        <img src="/images/others/step-ponte/bridgeH.png"
                             class="img img-responsive  img-shadow"
                             :class="{ 'img-desaturate': ( 'H' != $store.state.bridge_orientation) }"
                             @click="setOrientation('H')"
                        />
                        <figcaption class="text-center"> {{ 'orizzontale' | translate}} </figcaption>
                    </figure>
                </div>

                <div class="col-lg-4">
                    <figure class="drawer-container" >
                        <img src="/images/others/step-ponte/bridgeV.png"
                             class="img img-responsive  img-shadow"
                             :class="{ 'img-desaturate': ( 'V' != $store.state.bridge_orientation) }"
                             @click="setOrientation('V')"
                        />
                        <figcaption class="text-center"> {{ 'verticale' | translate}} </figcaption>
                    </figure>
                </div>

            </div>
        </div>
        
        <!-- Supports section -->
        <div class="row top2" >

            <div class="col-lg-12" v-show="$store.state.bridge_orientation.length">

                <!-- Supports description -->
                <div class="col-lg-12 text-center">
                    <span class="help-block">{{ 'stepponte.supports_description' | translate }}</span>
                </div> 

                    <!-- Alerts: User Advice -->
                    <div class="col-lg-12" v-show="showSupportsAdvice">
                        <div class='alert alert-warning' role="alert">
                            <strong>{{ 'attenzione' | translate }}</strong> {{ $t('stepponte.supports_advice', { num_sup: numSup, dimension: dimensionAffected, mm: 6 * numSup })  }}
                        </div>
                    </div>

                    <!-- Support choice -->
                    <div class="row" >
                        <div class="col-lg-2"></div>
                        <div class="col-lg-4 " :class="[ ($store.getters.getSupportsAvailabe.length == 1 && index == 0)  ? 'col-lg-offset-2' : '']" v-for="( bridge_support, index ) in $store.getters.getSupportsAvailabe" >
                            <figure class="drawer-container" >
                                <img src="/images/others/step-ponte/support_high.png"
                                     class="img img-responsive  img-shadow"
                                     :class="{ 'img-desaturate': bridge_support.id != $store.state.bridge_supportID }"
                                     @click="selectBridgeSupport( bridge_support )"
                                />
                                <figcaption> h:{{bridge_support.height}} mm </figcaption>
                            </figure>
                        </div>
                    </div>

            </div>
        </div>

        <!-- Bridges section -->
        <div class="row top2" >       
            
            <div class="col-lg-12" v-show="$store.state.bridge_orientation.length && $store.state.bridge_supportID != 0 ">

                <!-- Bridges description -->
                <div class="col-lg-12 text-center">
                    <span class="help-block">{{ "stepponte.bridge_description" | translate }}</span>
                </div> 

                <!-- Bridges choice -->
                <div class="row" >
                    <div class="col-lg-2"></div>
                    <div class="col-lg-4 " :class="[ ($store.getters.getBridgesAvailabe.length == 1 && index == 0)  ? 'col-lg-offset-2' : '']" v-for="( bridge, index ) in $store.getters.getBridgesAvailabe" >
                            <figure class="drawer-container" >
                            <img src="/images/others/step-ponte/bridge_high.png"
                                 class="img img-responsive  img-shadow"
                                 :class="{ 'img-desaturate': bridge.id != $store.state.bridge_ID }"
                                 @click="selectBridgeType( bridge )"
                                 :data-width="bridge.width"
                                 :data-depth="bridge.depth"
                            />
                            <figcaption>w:{{ bridge.width }} mm d:{{ bridge.depth }} mm </figcaption>
                        </figure>

                    </div>
                </div>

            </div>

        </div>

        <!-- Next button -->
        <div class="row">

            <div class="col-lg-2 pull-left" >
                <button class="btn btn-danger btn-block " @click="resetData">{{ 'stepponte.reset' | translate }}</button>
            </div>        

            <div class="col-lg-2 pull-right" >
                <button class="btn btn-danger btn-block" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
            </div>  

            <div class="col-lg-2 pull-right" >
                <router-link to="/split/step3" class="btn btn-danger btn-back btn-block" tag="button">{{ 'back' | translate }}</router-link>
            </div>


         </div>

        </div>
        
    </div>
</template>

<script>

// # Import map getters
// import { mapGetters } from 'vuex'

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

    computed: {

        showSupportsAdvice: function () {
            return   this.$store.state.drawertype == 4 || 
                   ( this.$store.state.drawertype != 4 && this.$store.state.bridges_selected != "H" );
        },

        numSup: function () {

            switch( this.$store.state.drawertype ) {

                case 4:
                    return 2;
                
                case 3:
                    return this.$store.state.bridge_orientation == "H" ? 0 : 2;

                case 2: 
                case 1:

                    return this.$store.state.bridge_orientation == "V" ? 1 : 0;

            }
        },

        dimensionAffected: function () {
            return this.$store.state.bridge_orientation == "H" ? "width" : "length";
        }
    },

    /**
     * Object methods
     * @type {Object}
     */
    methods: {

        /**
         * [setOrientation description]
         * @param {[type]} val [description]
         */
        setOrientation: function (val) {

            // # on click: if orientation is the same toggle
            val == this.$store.state.bridge_orientation ? 
                   this.$store.commit( "setBridgeOrientation", "" ) : 
                   this.$store.commit( "setBridgeOrientation", val );

            // # Commit mutation and clear step data
            this.$store.commit( "clearBridgeData" );
            this.$store.commit( "computeDimensionsOnSupportsChanges", { op: "clear" } ); 
        },
        

        /**
         * [resetData description]
         * @return {[type]} [description]
         */
        resetData: function() {
            this.$store.commit( "clearAllBridgeData" );
        },

        /**
         * [selectBridgeType description]
         * @param  {[type]} bridge [description]
         * @return {[type]}        [description]
         */
        selectBridgeType: function( bridge ) {

            // # Manage unset
            if( bridge.id == this.$store.state.bridge_ID ) {

                // # Reset bridge id
                this.$store.commit( "setBridgeID", 0 );
                this.$store.commit( "clearBridges" );

                return;
            }

            // # Clean up
            this.$store.commit( "clearBridges" );
            
            // # Parse to float
            var shoulder_height_float = parseFloat( this.$store.state.dimensions.shoulder_height );

            // # Switch drawer types
            switch( this.$store.state.drawertype ) {

                case 4:

                    if( shoulder_height_float >= 116 && shoulder_height_float < 138.5 ) {

                        // # TODO bridgeID won't be 1 or 2
                        if( this.$store.state.bridge_supportID == 2 && bridge.id == 480 ) {
                            
                            // # Show error modal 
                            $( "#error-modal" )
                            .find('.modal-body')
                            .text( "Impossibile selezionare questo elemento, l'altezza totale risulta maggiore di quella disponibile" );

                            $( '#error-modal' ).modal();
                            return false;
                        }
                    }  

                    this.$store.commit( "setBridgeID", bridge.id );

                    bridge.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width: 
                                    this.$store.state.dimensions.length;                    

                break;

                case 3:// Lineabox 2 sides

                    bridge.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width + 12: 
                                    this.$store.state.dimensions.length;    

                    this.$store.commit( "setBridgeID", bridge.id );
                break;

                case 2:
                case 1:

                    bridge.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width + 12: 
                                    this.$store.state.dimensions.length + 6;   

                    this.$store.commit( "setBridgeID", bridge.id );

                break;
            }

            // # Push the first bridge of the selected type
            this.$store.commit( "manageBridge", bridge.items[0] );
        },

        /**
         * [selectBridgeSupport description]
         * @param  {[type]} bridge_support [description]
         * @return {[type]}                [description]
         */
        selectBridgeSupport: function( bridge_support ) {

            // # Manage unset
            if( bridge_support.id == this.$store.state.bridge_supportID ) {

                // # Reset support id
                this.$store.commit( "computeDimensionsOnSupportsChanges", { op: "clear" } );
                this.$store.commit( "setBridgeSupportID", 0 );
                this.$store.commit( "clearBridgeSupports" );

                return;
            } 

            // # Bridge support length is always the width or the height of the drawer
            bridge_support.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width : 
                                    this.$store.state.dimensions.length;
            
            switch( this.$store.state.drawertype ) {

                case 4:
                    
                    // # Set support id
                    this.$store.commit( "setBridgeSupportID", bridge_support.id );

                    // # Orientation is the one of the bridge
                   // bridge_support.orientation = this.$store.state.bridge_orientation;

                    
                    this.$store.commit( "computeDimensionsOnSupportsChanges",  { op: "add" }  );

                    // # Push 2 of the same type
                    this.$store.commit( "manageBridgeSupport", bridge_support );
                    this.$store.commit( "manageBridgeSupport", bridge_support );

                break;

                case 3: // # Lineabox 2 sides

                    switch( this.$store.state.bridge_orientation ) {

                        case "H":
                            // # Do nothing, supports are already embedded
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );
                        break;

                        case "V": 
                            
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );

                            // # Orientation is the one of the bridge
                           // bridge_support.orientation = this.$store.state.bridge_orientation;

                            // # Push 2 of the same type
                            this.$store.commit( "manageBridgeSupport", bridge_support );
                            this.$store.commit( "manageBridgeSupport", bridge_support );
                            this.$store.commit( "computeDimensionsOnSupportsChanges",  { op: "add" }  );

                        break;
                    }

                break;


                case 2: // # Lineabox 3 sides
                case 1: // # Lineabox 4 sides 

                    switch( this.$store.state.bridge_orientation ) {

                        case "H":
                            // # Do nothing, supports are already embedded
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );                           
                        break;

                        case "V": 
                            
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );

                            // # Orientation is the one of the bridge
                           // bridge_support.orientation = this.$store.state.bridge_orientation;

                            // # Push ONLY ONE  of the same type
                            this.$store.commit( "manageBridgeSupport", bridge_support );
                            this.$store.commit( "computeDimensionsOnSupportsChanges",  { op: "add" }  );


                        break;
                    }

                break;

            }
        },     

        /**
         * [check description]
         * @return {[type]} [description]
         */
        check: function() {

            if( this.$store.state.bridge_orientation != "" && 
              ( this.$store.state.bridge_supportID == 0 || this.$store.state.bridge_ID == 0 ) ) {

                // # Show error modal and move the user at the top of this step
                $( "#error-modal" )
                .find('.modal-body')
                .text( "I dati inseriti per il posizionamento dei ponti non sono completi" );

                // # Step Bridge has errors
                this.$store.commit( "setBridgecompleted", false );

                $( '#error-modal' ).modal();
                
                // # No bridge selected
                this.$store.commit( "hasBridge", false );

                return false;
            } 

            // # Check if user has selected a bridge and commit the related mutation
            this.$store.commit( "hasBridge", this.$store.state.bridges_selected.length > 0 );

            // # Step Bridge ok
            this.$store.commit( "setBridgecompleted", true );

            // # take user to the next step
            this.$router.push( { path: '/split/step4' } );

            return true;
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

            // # if shoulder height it's not enough go back
            if( !vm.$store.state.is_suitable_width_4hbridge ) {
                 vm.$router.go( -1 );
                 return;
            }

        })
    },     

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted() {
        this.$store.commit( "setComponentHeader", "stepponte.header-title" );
        console.log( "Step ponte Mounted!" );
    }
}
</script>
