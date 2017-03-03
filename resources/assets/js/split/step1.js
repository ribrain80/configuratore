/**
 * Vue object managing info section / welcome page
 * @type {Vue}
 */
var step1 = new Vue({

    // # Bound element
    el: 'step1',

    /**
     * Object data
     * @type {Object}
     */    
    data: {},

    /**
     * Watch 4 data changes
     * @type {Obj}
     */
    watch: {},

    methods: {

        /**
         * Final check ( "Next" button click )
         * @return {bool} true if checks are ok
         */
        check: function() {

            // # Move user to the next step
            Commons.movesmoothlyTo( "#step2"); 
        }
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () {

        // # Log mount 
        console.log( "Welcome/info page mounted" );
    }

});