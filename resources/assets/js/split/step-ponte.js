/**
 * Vue object managing bridge / bridge support choice
 * @type {Vue}
 */
var stepponte = new Vue({

    // # Bound element
    el: 'stepponte',

    /**
     * Object data
     * @type {Object}
     */
    data: {

        // # has bridge flag
        has_bridge: false,

        bridge_orientation: "",

        bridge_selected:[],

        hasError:false,
        
        choice: true,
        
        bridges_types:[],
        
        bridge_supports: [],

        bridge_supportID: 0,

        bridge_ID: 0,

        bridge_support_selected: [],
        
        width_not_suitable_4bridge: false
    },

    methods: {

        /**
         * Calls the server and retrieve the bridges available
         * @return {void}
         */        
        initBridgesAndSupports: function () {

            // # ajax call
            this.$http.get( '/split/bridges' ).then( response => {
                // # bridges retrieved
                this.bridges_types = response.body;
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

        setOrientation: function (val) {

          if( val == this.bridge_orientation ) {

            this.bridge_orientation = "";
            this.has_bridge = false;
            return false;

          }

          this.bridge_orientation = val;
          this.bridge_selected = []; //Svuoto i bridge selezionati
        },

        checkSupportCompatibility: function( bridge_support ) {
            
            switch( Configuration.drawertype ) {
                
                // # Custom drawer
                case 4:

                    if( bridge_support.height > 45.5 && parseInt( Configuration.dimensions.shoulder_height ) < 114 ) {
                        console.log( "in" );
                        return false;
                    }

                    return true;

                break;
            }

            
        },  

        checkBridgeCompatibility: function(  bridge ) {

            switch( Configuration.drawertype ) {
                
                // # Custom drawer
                case 4:

                    if( bridge.depth > 22.5 && parseInt( Configuration.dimensions.shoulder_height ) < 114 ) {
                        console.log( "Enter" );
                        return false;
                    }

                    return true;

                break;
            }

            
        },

        selectBridgeType: function( bridge ) {

            this.has_bridge = true;
            this.bridge_ID = bridge.id;
            bridge.length = this.bridge_orientation == "H" ? Configuration.width : Configuration.length;

            this.bridge_selected.push( bridge );
        },

        selectBridgeSupportHeight: function( bridge_support ) {

            this.bridge_supportID = bridge_support.id;
            bridge_support.orientation = this.bridge_orientation;
            this.bridge_support_selected.push( bridge_support );
        },     

        check: function() {

            /*
            console.log( this.selected );

            if( this.selected == 0 ) {
                $( "#error-modal" ).find('.modal-body').text( "Non hai scelto la tipologia" );
                $( '#error-modal' ).modal();
                return false;
            } else {
               Commons.movesmoothlyTo( "#step3"); 
            }
           */
          
          Commons.movesmoothlyTo( "#step4"); 
        }
    },

    watch: {

        bridge_selected: function( val ) {
            Configuration.bridges_selected = val;
        },

        bridge_support_selected: function( val ) {
            Configuration.bridge_supports_selected = val;
        }

    },

    mounted() {
        console.log("Step ponte Mounted!")
        this.initBridgesAndSupports();
    }
});