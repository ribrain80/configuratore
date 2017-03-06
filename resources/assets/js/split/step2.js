/**
 * Vue object managing drawer type selection
 * @type {Vue}
 */
var step2 = new Vue({

    // # Bound element
    el: 'step2',

    /**
     * Object data
     * @type {Object}
     */   
    data: {

        // # Selected type
        selected: 0,

        // # Step has error flag
        hasError: false,

        // # Choice flag
        choice: true,

        // # Types available
        types: [],

        // # is one of the lineabox types available
        lineabox: false
    },

    methods: {

        /**
         * Calls the server and retrieve the types available
         * @return {void}
         */
        initTypes: function () {

            // # ajax call
            this.$http.get( '/split/drawerstypes' ).then( response => {
                // # types retrieved
                this.types = response.body;
            }, response => {
                // # something went wrong
                this.hasError = true;
            });
        },

        /**
         * Sets the type ( user choice )
         * @param {int} type the drawer type chosen
         */
        setType: function ( type ) {

            // # data set
            this.selected = type;

            // # User choose one
            this.choice = type > 0;
        },

        openCategory: function ( catId ) {

            // # Choice reset
            this.selected = 0;

            // # Hide all categories
            $( '.drawerlist' ).hide();

            // # Show only the one needed
            $('#'+catId).toggle();
        },

        check: function() {

            // # Check choice
            if( this.choice ) {
                Commons.movesmoothlyTo( "#step3");
                return true;
            }

            $( "#error-modal" ).find( '.modal-body' ).text( "Non hai scelto la tipologia" );
            $( '#error-modal' ).modal();

            return false; 
        }
    },

    /**
     * Watch 4 data changes
     * @type {Obj}
     */
    watch: {

        /**
         * Each time selected changes update Configuration Object
         * @param  {bool} val value changed
         * @return {void}
         */
        selected: function ( val ) {

            // # Update
            Configuration.drawertype = parseInt( val );

            // # 4 is the custom drawer
            this.lineabox = val != 4;

            // # Set a default value
            step3.shoulder_height = 45.5;
        },

        /**
         * Each time lineabox changes broadcast the change to the next step
         * @param  {bool} val value changed
         * @return {void}
         */       
        lineabox: function( val ) {

            // # Broadcast
            step3.$data.lineabox = val;
            Configuration.lineabox = val;
        }
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted() {

        // # Log mount 
        console.log("Step2 Mounted!")

        // # Init types
        this.initTypes();
    }
});