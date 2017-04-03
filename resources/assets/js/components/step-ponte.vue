<template>
    
    <!-- Container -->
    <div class="row" id="step-ponte">

        <!-- Title -->
        <div class="col-lg-12">
            <h2>{{ "stepponte.title" | translate }}</h2>
        </div>

        <!-- Alerts: User Warning -->
        <div class="col-lg-12" v-if="showAlert">
            <div class="alert alert-danger alert-dismissible fade in" id="alert" >
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>{{ 'attenzione' | translate }}</strong> {{ alert_message }}
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <!-- Orientation section -->
                <div class="col-lg-12">

                    <!-- Orientation description -->
                    <div class="col-lg-12">
                        <span class="help-block">{{ 'stepponte.orientation_description' | translate }}</span>
                    </div>

                    <!-- Orientation title -->
                    <div class="col-lg-12">
                        <h4 class="">{{ 'stepponte.orientation_title' | translate }}</h4>
                    </div>

                    <!-- Orientation choice -->
                    <div class="row">
                        <div class="col-lg-6" v-show="$store.state.is_suitable_width_4hbridge">

                            <figure class="drawer-container" >

                                <img src="/images/others/step-ponte/bridgeH.jpg"
                                     class="img img-responsive  img-shadow"
                                     :class="{ 'img-desaturate': ( 'H' != $store.state.bridge_orientation) }"
                                     @click="setOrientation('H')"
                                />
                                <figcaption> {{ 'orizzontale' | translate}} </figcaption>
                            </figure>
                        </div>
                        <div class="col-lg-6">
                            <figure class="drawer-container" >
                                <img src="/images/others/step-ponte/bridgeV.jpg"
                                     class="img img-responsive  img-shadow"
                                     :class="{ 'img-desaturate': ( 'V' != $store.state.bridge_orientation) }"
                                     @click="setOrientation('V')"
                                />
                                <figcaption> {{ 'verticale' | translate}} </figcaption>
                            </figure>
                        </div>
                    </div>

                </div>
                <div class="spacer"></div>
                <!-- Supports / bridges -->
                <div class="col-lg-12">

                    <div class="row">

                        <!-- Supports section -->
                        <div class="col-lg-12" v-show="$store.state.bridge_orientation.length">

                            <!-- Supports description -->
                            <div class="col-lg-12">
                                <span class="help-block">{{ 'stepponte.supports_description' | translate }}</span>
                            </div>  

                            <!-- Alerts: User Advice -->
                            <div class="col-lg-12" v-show="showSupportsAdvice">
                                <div class='alert-warning' role="alert">
                                    <strong>{{ 'attenzione' | translate }}</strong> {{ $t('stepponte.supports_advice', { num_sup: numSup, dimension: dimensionAffected, mm: 6 * numSup })  }}
                                </div>
                            </div>

                            <!-- Supports title -->
                            <h4 class="">{{ 'stepponte.bridge_support' | translate }}</h4>

                            <!-- Support choice -->
                            <div class="row" v-for="bridge_support in $store.state.supportTypes">
                                <div class="col-lg-6" v-show="checkSupportCompatibility( bridge_support )">
                                    <figure class="drawer-container" >
                                        <img src="http://placehold.it/150x300"
                                             class="img img-responsive  img-shadow"
                                             :class="{ 'img-desaturate': bridge_support.id != $store.state.bridge_supportID }"
                                             @click="selectBridgeSupport( bridge_support )"
                                        />
                                        <figcaption> {{bridge_support.id}} h:{{bridge_support.height}} mm </figcaption>
                                    </figure>
                                </div>
                            </div>

                        </div>

                        <!-- Bridges section -->
                        <div class="col-lg-12" v-show="$store.state.bridge_orientation.length && $store.state.bridge_supportID != 0 ">

                            <!-- Bridges description -->
                            <div class="row">
                                <span class="help-block">{{ "stepponte.bridge_description" | translate }}</span>
                            </div>

                            <!-- Bridges title -->
                            <h4 class="">{{ "stepponte.bridge_title" | translate  }}</h4>

                            <!-- Bridges choice -->
                            <div class="row" >
                                <div class="col-lg-6" v-for="( bridge, cat ) in $store.state.bridgeTypes" v-if="checkBridgeCompatibility( bridge )">

                                    <figure class="drawer-container" >
                                        <img src="http://placehold.it/150x300"
                                             class="img img-responsive  img-shadow"
                                             :class="{ 'img-desaturate': cat != $store.state.bridge_ID }"
                                             @click="selectBridgeType( bridge )"
                                             :data-width="bridge.width"
                                             :data-depth="bridge.depth"
                                        />
                                        <figcaption> w:{{ bridge.width }} mm d:{{ bridge.depth }} mm </figcaption>
                                    </figure>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6"></div>
        </div>


        <!-- Next button -->
        <div class="row">
            <div class="col-lg-2" >
                <router-link to="/split/step3" class="btn btn-danger btn-block" tag="button">{{ 'back' | translate }}</router-link>
            </div>
            <div class="col-lg-3" >
                <button class="btn btn-danger btn-block " @click="resetData">{{ 'stepponte.reset' | translate }}</button>
            </div>
            <div class="col-lg-2  pull-right" >
                <button class="btn btn-danger btn-block" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
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

            this.num_sup = 

            // # Commit mutation and clear step data
            this.$store.commit( "clearBridgeData" );
            this.$store.commit( "computeDimensionsOnSupportsChanges", { op: "clear" } ); 
        },

        /**
         * [checkOrientationCompatibility description]
         * @return {[type]} [description]
         */
        checkOrientationCompatibility: function() {
            return this.$store.state.is_suitable_width_4hbridge;
        },

        /**
         * [resetData description]
         * @return {[type]} [description]
         */
        resetData: function() {
            this.$store.commit( "clearAllBridgeData" );
        },

        /**
         * [checkSupportCompatibility description]
         * @param  {[type]} bridge_support [description]
         * @return {[type]}                [description]
         */
        checkSupportCompatibility: function( bridge_support ) {

            // # Parse to float
            var shoulder_height_float = parseFloat( this.$store.state.dimensions.shoulder_height );

            // # Switch drawer type
            switch( this.$store.state.drawertype ) {
                
                // # Custom drawer
                case 4:

                    // # Switch support height
                    switch( bridge_support.height ) { 

                        // # low support 
                        case 45.4:
                            return shoulder_height_float >= 72;
                        break;

                        // # high support 
                        case 89.5:
                            return shoulder_height_float >= 116;
                        break;

                    }

                break;

                // # Lineabox
                default:
                case 3: // # Lineabox 2 sides
                case 2: // # Lineabox 3 sides
                case 1: // # Lineabox 4 sides

                    // # Switch support height
                    switch( bridge_support.height ) { 

                        // # low support 
                        case 45.4:
                            return shoulder_height_float >= 72 && shoulder_height_float < 148;
                        break;

                        // # high support 
                        case 89.5:
                            return shoulder_height_float >= 148;
                        break;

                    }                

                break;
            }
            
        },  

        /**
         * [checkBridgeCompatibility description]
         * @param  {[type]} bridge [description]
         * @return {[type]}        [description]
         */
        checkBridgeCompatibility: function( bridge ) { 
            console.log( bridge );

            // # Parse to float
            var shoulder_height_float = parseFloat( this.$store.state.dimensions.shoulder_height );
            
            // # Switch drawer type
            switch( this.$store.state.drawertype ) {
                
                // # Custom drawer
                case 4:

                    // # Switch bridge height ( depth )
                    switch( bridge.depth ) {

                        // # low bridge
                        case 25.5:
                            return shoulder_height_float >= 72;
                        break;

                        // # High bridge
                        case 48:
                            return  shoulder_height_float >= 94.5 
                        break;
                    }

                break;

                // # Lineabox
                default:
                case 3: // # Lineabox 2 sides
                case 2: // # Lineabox 3 sides
                case 1: // # Lineabox 4 sides

                    // # Switch bridge height ( depth )
                    switch( bridge.depth ) {

                        // # low bridge
                        case 25.5:
                            return shoulder_height_float >= 72;
                        break;

                        // # High bridge
                        case 48:
                            return shoulder_height_float >= 94.5;
                        break;
                    }   

                break;               
            }
            
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

            this.$store.commit( "manageBridge", bridge );
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
                    bridge_support.orientation = this.$store.state.bridge_orientation;
                    
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
                            bridge_support.orientation = this.$store.state.bridge_orientation;

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
                            bridge_support.orientation = this.$store.state.bridge_orientation;

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
        this.$store.commit('setComponentHeader','scelta elemento ');
        console.log( "Step ponte Mounted!" );
    }
}
</script>