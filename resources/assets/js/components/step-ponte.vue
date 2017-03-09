<template>

    <div class="row" id="step-ponte">

        <div class="col-lg-12">
            <h2 lang="it">Scelta del ponte</h2>
        </div>

        <!-- Alerts: User Warning -->
        <div class="col-lg-12" v-if="showAlert">
            <div class="alert alert-danger alert-dismissible fade in" id="alert" lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>Attenzione!</strong> {{ alert_message }}
            </div>
        </div>

        <div class="col-lg-12">

            <div class="row">
               <span class="help-block">Vuoi inserire elementi ponte? orizzontali o verticali?</span>
            </div>

            <h4 class="">Orientamento Ponti</h4>

            <div class="row">
                <div class="col-lg-6" v-show="$store.state.is_suitable_width_4hbridge">
                    <div class="panel panel-default" :class="{ 'bg-success': ('H' == $store.state.bridge_orientation)}">
                        <div class="panel-body" @click="setOrientation('H')" lang="it">Orizzontale</div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="panel panel-default" :class="{ 'bg-success': ('V' == $store.state.bridge_orientation)}" >
                        <div class="panel-body" @click="setOrientation('V')" lang="it">Verticale</div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-lg-12"> 

            <div class="row">
                
                <div class="col-lg-5" v-show="$store.state.bridge_orientation.length">   
                    <div class="row">
                       <span class="help-block" >A che altezza vuoi mettere i ponti?</span>
                    </div> 
                    <h4 class="">Altezza di posizionamento</h4>

                    <div class="row" v-for="bridge_support in bridge_supports">
                        <div class="col-lg-5" v-show="checkSupportCompatibility( bridge_support )">
                            <div class="panel panel-default">
                                <div class="panel-body" lang="it" :class="{ 'bg-success': bridge_support.id == bridge_supportID }" @click="selectBridgeSupport( bridge_support )">{{bridge_support.id}} h:{{bridge_support.height}} mm</div>
                            </div>
                        </div>
                    </div>

                </div>  

                <div class="col-lg-5" v-show="$store.state.bridge_orientation">   

                    <div class="row">
                       <span class="help-block">seleziona l’altezza del ponte da inserire</span>
                    </div> 

                    <h4 class="">Tipologie di ponte</h4>

                    <div v-if="$store.state.bridge_orientation.length">

                        <div class="row" v-for="bridge in bridge_types">
                            <div class="col-lg-6" v-show="checkBridgeCompatibility( bridge )">
                                <div class="panel panel-default">
                                    <div class="panel-body"  lang="it" :class="{ 'bg-success': bridge.id == bridge_ID }" @click="selectBridgeType( bridge )" :data-width="bridge.width" :data-depth="bridge.depth">{{bridge.sku}} w:{{bridge.width}} mm d:{{bridge.depth}} mm</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>              

            </div>
        </div>

        <!-- PULSANTE DI INVIO -->
        <div class="row">
            <div class="col-lg-12" >
                <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="check">Avanti</button>
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

            // # has bridge flag
            has_bridge: false,

            hasError: false,
            
            choice: true,
            
            bridge_types:[],
            
            bridge_supports: [],

            bridge_supportID: 0,

            bridge_ID: 0,

            bridge_selected:[],

            bridge_support_selected: []
        }
    },

    methods: {

        /**
         * Resets all data
         * @return {void}
         */
        clearData: function() {

            console.log( "clearing bridge data" );

            this.$store.commit( "setBridgeOrientation", "" );
            this.bridge_support_selected = [];
            this.bridge_selected = [];
            this.bridge_ID = 0;
            this.bridge_supportID = 0;
            this.has_bridge = false;
        },

        /**
         * Returns true if something has been added in this step
         * @return {Boolean}
         */
        hasData: function() {
            return this.bridge_orientation != "";
        },

        /**
         * Calls the server and retrieve the bridges available
         * @return {void}
         */        
        initBridgesAndSupports: function () {

            // # ajax call
            this.$http.get( '/split/bridges' ).then( response => {
                // # bridges retrieved
                this.bridge_types = response.body;
            }, response => {
                // # something went wrong
                this.hasError = true;
            });

            // # ajax call
            this.$http.get( '/split/supports' ).then( response => {
                // # bridge_supports retrieved
                this.bridge_supports = response.body;
            }, response => {
                // # something went wrong
                this.hasError = true;
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

            // clean up
            this.bridge_support_selected = [];
            this.bridge_selected = [];
            this.bridge_ID = 0;
            this.bridge_supportID = 0;
            this.has_bridge = false;
        },

        /**
         * [checkOrientationCompatibility description]
         * @return {[type]} [description]
         */
        checkOrientationCompatibility: function() {
            return this.width_not_suitable_4bridge;
        },

        /**
         * [checkSupportCompatibility description]
         * @param  {[type]} bridge_support [description]
         * @return {[type]}                [description]
         */
        checkSupportCompatibility: function( bridge_support ) {

            // # Parse to float
            var shoulder_height_int = parseFloat( Configuration.dimensions.shoulder_height );

            // # Switch drawer type
            switch( Configuration.drawertype ) {
                
                // # Custom drawer
                case 4:

                    // # Switch support height
                    switch( bridge_support.height ) { 

                        // # low support 
                        case 45.5:
                            return shoulder_height_int >= 70;
                        break;

                        // # high support 
                        case 89.5:
                            return shoulder_height_int >= 114;
                        break;

                    }

                break;

                // # Lineabox
                default:
                case 3: // # Lineabox 2 sides
                case 2: // # Lineabox 3 sides
                case 1: // # Lineabox 4 sides

                    // # FIX ME 
                    // # Horizontal supports are already embedded
                    /*if( this.bridge_orientation == "H" ) {
                        return false;
                    }*/

                    // # Switch support height
                    switch( bridge_support.height ) { 

                        // # low support 
                        case 45.5:
                            return shoulder_height_int >= 71.5;
                        break;

                        // # high support 
                        case 89.5:
                            return shoulder_height_int >= 147.5;
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
            var shoulder_height_int = parseFloat( Configuration.dimensions.shoulder_height );
            
            // # Switch drawer type
            switch( Configuration.drawertype ) {
                
                // # Custom drawer
                case 4:

                    // # Switch bridge height ( depth )
                    switch( bridge.depth ) {

                        // # low bridge
                        case 22.5:
                            return shoulder_height_int >= 70;
                        break;

                        // # High bridge
                        case 48:
                            return  shoulder_height_int >= 92.5 
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
                            return shoulder_height_int >= 70;
                        break;

                        // # High bridge
                        case 48:
                            return shoulder_height_int >= 92.5;
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

            // # Parse to float
            var shoulder_height_int = parseFloat( Configuration.dimensions.shoulder_height );

            if( Configuration.drawertype == 4 ) {
                if( shoulder_height_int >= 114 && shoulder_height_int < 136.5 ) {

                    if( this.bridge_supportID == 2 && bridge.id == 1 ) {
                        // # Show error modal 
                        $( "#error-modal" )
                        .find('.modal-body')
                        .text( "Impossibile selezionare questo elemento, l'altezza totale risulta maggiore di quella disponibile" );

                        $( '#error-modal' ).modal();
                        return false;
                    }
                }
            }

            this.bridge_selected = [];
            this.bridge_ID = bridge.id;
            bridge.length = this.bridge_orientation == "H" ? Configuration.width : Configuration.length;
            this.bridge_selected.push( bridge );
        },

        /**
         * [selectBridgeSupport description]
         * @param  {[type]} bridge_support [description]
         * @return {[type]}                [description]
         */
        selectBridgeSupport: function( bridge_support ) {

            // # Clear selected containers
            this.bridge_supportID = 0;
            this.bridge_support_selected = [];
            this.bridges_selected = [];
            
            switch( Configuration.drawertype ) {

                case 4:
                    
                    // # Set support id
                    this.bridge_supportID = bridge_support.id;
                    console.log( "choice is " + bridge_support.id );

                    // # Orientation is the one of the bridge
                    bridge_support.orientation = this.bridge_orientation;

                    // # Push 2 of the same type
                    this.bridge_support_selected.push( bridge_support, bridge_support );

                break;

                case 3: // # Lineabox 2 sides

                    switch( this.bridge_orientation ) {

                        case "H":
                            // # Do nothing, supports are already embedded
                            // # Set support id
                            this.bridge_supportID = bridge_support.id;
                        break;

                        case "V": 
                            
                            // # Set support id
                            this.bridge_supportID = bridge_support.id;

                            // # Orientation is the one of the bridge
                            bridge_support.orientation = this.bridge_orientation;

                            // # Push 2 of the same type
                            this.bridge_support_selected.push( bridge_support, bridge_support );

                        break;
                    }

                break;


                case 2: // # Lineabox 3 sides
                case 1: // # Lineabox 4 sides 

                    switch( this.bridge_orientation ) {

                        case "H":
                            // # Do nothing, supports are already embedded
                            // # Set support id
                            this.bridge_supportID = bridge_support.id;                             
                        break;

                        case "V": 
                            
                            // # Set support id
                            this.bridge_supportID = bridge_support.id;

                            // # Orientation is the one of the bridge
                            bridge_support.orientation = this.bridge_orientation;

                            // # Push ONLY ONE  of the same type
                            this.bridge_support_selected.push( bridge_support );

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

          if( this.bridge_orientation != "" && ( this.bridges_selected == [] || this.bridge_support_selected == [] ) ) {

                // # Show error modal and move the user at the top of this step
                $( "#error-modal" ).find('.modal-body').text( "I dati inseriti per il posizionamento dei ponti non sono completi" );
                $( '#error-modal' ).modal();
                return false;
          } 

          // # Now we have a bridge selected
          this.has_bridge = true;

          // # take user to the next step
          Commons.movesmoothlyTo( "#step4"); 
        }
    },

    watch: {

        /**
         * [bridge_selected description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        bridge_selected: function( val ) {
            Configuration.bridges_selected = val;
        },

        /**
         * [bridge_support_selected description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        bridge_support_selected: function( val ) {
            Configuration.bridge_supports_selected = val;
        },

        /**
         * [bridge_orientation description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        bridge_orientation: function( val ) {
             Configuration.bridge_orientation = val;
        },

        /**
         * [has_bridge description]
         * @param  {[type]}  val [description]
         * @return {Boolean}     [description]
         */
        has_bridge: function( val ) {
            Configuration.has_bridge = val;
        }

    },

    mounted() {
        console.log( "Step ponte Mounted!" );
        this.initBridgesAndSupports();
    }
}
</script>