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
        
        <!-- Orientation section -->
        <div class="col-lg-12">
            
            <!-- Orientation description -->
            <div class="row">
               <span class="help-block">{{ 'stepponte.orientation_description' | translate }}</span>
            </div>
            
            <!-- Orientation title -->
            <h4 class="">{{ 'stepponte.orientation_title' | translate }}</h4>
            
            <!-- Orientation choice -->
            <div class="row">
                <div class="col-lg-6" v-show="$store.state.is_suitable_width_4hbridge">
                    <div class="panel panel-default" :class="{ 'bg-success': ('H' == $store.state.bridge_orientation)}">
                        <div class="panel-body" @click="setOrientation('H')" >{{ 'horizontal' | translate }}</div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="panel panel-default" :class="{ 'bg-success': ('V' == $store.state.bridge_orientation)}" >
                        <div class="panel-body" @click="setOrientation('V')" >{{ 'vertical' | translate }}</div>
                    </div>
                </div>
            </div>

        </div>
        
        <!-- Supports / bridges -->
        <div class="col-lg-12"> 

            <div class="row">
                
                <!-- Supports section -->
                <div class="col-lg-5" v-show="$store.state.bridge_orientation.length">   

                    <!-- Supports description -->
                    <div class="row">
                       <span class="help-block">{{ 'stepponte.supports_description' | translate }}</span>
                    </div> 

                    <!-- Supports title -->
                    <h4 class="">{{ 'stepponte.orientation_title' | translate }}</h4>
                    
                    <!-- Support choice -->
                    <div class="row" v-for="bridge_support in bridge_supports">
                        <div class="col-lg-5" v-show="checkSupportCompatibility( bridge_support )">
                            <div class="panel panel-default">
                                <div class="panel-body" :class="{ 'bg-success': bridge_support.id == $store.state.bridge_supportID }" @click="selectBridgeSupport( bridge_support )">{{bridge_support.id}} h:{{bridge_support.height}} mm</div>
                            </div>
                        </div>
                    </div>

                </div>  
                
                <!-- Bridges section -->
                <div class="col-lg-5" v-show="$store.state.bridge_orientation.length && $store.state.bridge_supportID != 0 ">   
                    
                    <!-- Bridges description -->
                    <div class="row">
                       <span class="help-block">{{ "stepponte.bridge_description" | translate }}</span>
                    </div> 
                    
                    <!-- Bridges title -->
                    <h4 class="">{{ "stepponte.bridge_title" | translate  }}</h4>

                    <!-- Bridges choice -->
                    <div class="row" v-for="bridge in bridge_types">
                        <div class="col-lg-6" v-show="checkBridgeCompatibility( bridge )">
                            <div class="panel panel-default">
                                <div class="panel-body"  :class="{ 'bg-success': bridge.id == $store.state.bridge_ID }" @click="selectBridgeType( bridge )" :data-width="bridge.width" :data-depth="bridge.depth">{{bridge.sku}} w:{{bridge.width}} mm d:{{bridge.depth}} mm</div>
                            </div>
                        </div>
                    </div>

                </div>              
            </div>
        </div>

        <!-- Next button -->
        <div class="row">
            <div class="col-lg-12" >
                <button class="btn btn-danger inpagenav" @click="resetData">{{ 'stepponte.reset' | translate }}</button>
                <button class="btn btn-danger inpagenav" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
                <router-link to="/split/step3" tag="button">{{ 'back' | translate }}</router-link>
            </div>
        </div>

    </div>
    
</template>

<script>
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

            hasError: false,
            
            choice: true,
            
            bridge_types:[],
            
            bridge_supports: []
        }
    },

    methods: {

        /**
         * Calls the server and retrieve the bridges available
         * @return {void}
         */        
        initBridgesAndSupports: function () {

            // # Scope fix
            var self = this;

            // # ajax calls
            var bridgesJQXHR  = $.getJSON( '/split/bridges' );
            var supportsJQXHR = $.getJSON( '/split/supports' );

            // # Deferred promises handler
            var promiseJQXHR = $.when( bridgesJQXHR, supportsJQXHR );
            
            // # Success
            promiseJQXHR.done( function( bridge_response, support_response ) {
               self.bridge_types = bridge_response[ 0 ];
               self.bridge_supports = support_response[ 0 ];
            });

            // # Fail
            promiseJQXHR.fail( function() {
                self.$router.push({ path: '/split/500' });
            });
        },

        /**
         * [setOrientation description]
         * @param {[type]} val [description]
         */
        setOrientation: function (val) {

            if( val == this.$store.state.bridge_orientation ) {
                this.$store.commit( "setBridgeOrientation", "" );
            } else {
                this.$store.commit( "setBridgeOrientation", val );
            }

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
        checkBridgeCompatibility: function(  bridge ) {

            // # Parse to float
            var shoulder_height_float = parseFloat( this.$store.state.dimensions.shoulder_height );
            
            // # Switch drawer type
            switch( this.$store.state.drawertype ) {
                
                // # Custom drawer
                case 4:

                    // # Switch bridge height ( depth )
                    switch( bridge.depth ) {

                        // # low bridge
                        case 22.5:
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
                        case 22.5:
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

            switch( this.$store.state.drawertype ) {

                case 4:

                    if( shoulder_height_float >= 116 && shoulder_height_float < 138.5 ) {

                        if( this.$store.state.bridge_supportID == 2 && bridge.id == 1 ) {
                            
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
                
                // # Now we have a bridge selected
                this.$store.state.has_bridge = false;

                return false;
            } 

            if( this.$store.state.bridges_selected.length ) {
                // # Now we have a bridge selected
                this.$store.state.has_bridge = true;
            } else {
                // # Now we have a bridge selected
                this.$store.state.has_bridge = false;
            }
            
             // # Step Bridge ok
            this.$store.commit( "setBridgecompleted", true );

            // # take user to the next step
            this.$router.push({ path: '/split/step4' });
            return true;
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

        })
    },     

    mounted() {

        console.log( "Step ponte Mounted!" );
        this.initBridgesAndSupports();
    }
}
</script>