var stepponte = new Vue({

    el: 'stepponte',

    data: {
        has_bridge: false,
        bridge_orientation: "",
        bridge_selected:[],
        //hasError:false,
        //choice: true,
        bridges_types:[],
        bridge_supports: [],
        widthNotSuitable4Bridge: false
    },

    watch: {

    },

    methods: {

        initBridges: function () {
            this.$http.get('/split/bridges').then(response => {
                this.bridges_types = response.body;
            }, response => {
                this.hasError = true;
            });
            this.$http.get('/split/supports').then(response => {
                this.bridge_supports = response.body;
            }, response => {
                this.hasError = true;
            });
        },

        setOrientation: function (val) {

          this.bridge_orientation=val;

          // # switch todo Vertical
          switch( Configuration.drawertype ) {

            // # cassetto
            case 4:
                /*var bridge_supportR = { width: Configuration.width, height: 100, length: 100, pos: "R" };
                var bridge_supportL = { width: 100, height: 100, length: 100, pos: "L" };
                Configuration.edges.push();
                
                Configuration.width -= 12;
                */

            break;

            // lineabox 2 lati
            case 3:
            break;

            // # lineabox 3 e 4 lati
            default:
            break;

          }

          this.bridge_selected=[]; //Svuoto i bridge selezionati
        },

        selectBridgeType: function( bridge ) {
            this.has_bridge = true;
            bridge.length = bridge_orientation == "H" ? Configuration.width : Configuration.length;
            this.bridge_selected.push( bridge );
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
    mounted() {
        console.log("Step ponte Mounted!")
        this.initBridges();
    }
});