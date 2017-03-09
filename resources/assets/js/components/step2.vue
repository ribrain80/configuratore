<template>
    
    <!-- Container -->
    <div class="row" id="step2">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2 lang="it">Tipologia di cassetto</h2>
        </div>

        <!-- Alerts: User Warning -->
        <div class="col-lg-12" v-if="choice">
            <div class="alert alert-warning alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> è obbligatorio selezionare una tipologia di cassetto
            </div>
        </div>
        
        <!-- FIX ME Modal alerts: Error -->
        <div class="col-lg-12" v-if="hasError">
            <div class="alert alert-danger alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> impossibile caricare le tipologie, si prega di riprovare più tardi
            </div>
        </div>

        <!-- Drawer type choice -->
        <div class="col-lg-3" v-for="( type,category ) in types">
            
            <!-- Level 1 navigation -->
            <div v-if="type.length == 1">
                <div class="panel panel-default" :class="{ 'bg-success': ( type[ 0 ].id == $store.state.drawertype ) }">
                    <div class="panel-body" @click="setType( type[ 0 ].id )" lang="it">{{ type[ 0 ].description }}</div>
                </div>
            </div>
            
            <!-- Level 2 navigation -->
            <div v-else>
                <div class="panel panel-default">
                    <div class="panel-body" @click="openCategory( category )" lang="it">{{ category }}</div>
                </div>
                <div class="drawerlist" :id="category" style="display: none">
                    <div class="col-lg-12" v-for="ctype in type">
                        <div class="panel panel-default " :class="{ 'bg-success': ( ctype.id == $store.state.drawertype ) }">
                            <div class="panel-body" @click="setType( ctype.id )" lang="it">{{ ctype.description }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Next button -->
        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="check">Avanti</button>
        </div>

    </div>
    
</template>

<script>
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

        return {

            /**
             * Step has error flag
             * @type {Boolean}
             */
            hasError: false,

            /**
             * Choice flag
             * @type {Boolean}
             */
            choice: true,

            /**
             * Types available
             * @type {Array}
             */
            types: [],
        }
    },

    /**
     * [methods description]
     * @type {Object}
     */
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

            // # User choose one
            this.choice = type > 0;

            // # Data container updates
            this.$store.commit( "setDrawerType", type );
            this.$store.commit( "isLineaBox", type != 4 );            
        },

        /**
         * [openCategory description]
         * @param  {[type]} catId [description]
         * @return {[type]}       [description]
         */
        openCategory: function ( catId ) {

            // # Choice reset
            this.$store.commit( "setDrawerType", 0 );

            // # Hide all categories
            $( '.drawerlist' ).hide();

            // # Show only the one needed
            $('#'+catId).toggle();
        },

        /**
         * [check description]
         * @return {[type]} [description]
         */
        check: function() {

            // # Check choice
            if( this.choice ) {
                this.$router.push({ path: '/split/step3' });
                return true;
            }

            // # Modal Error display
            $( "#error-modal" ).find( '.modal-body' ).text( "Non hai scelto la tipologia" );
            $( '#error-modal' ).modal();

            return false; 
        }
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted() {

        // # Log mount 
        console.log( "Step2 Mounted!" );

        // # Init types
        this.initTypes();
    }
}
</script>