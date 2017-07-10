<template>
    
    <!-- Container -->
    <div class="row" id="smartphone">
        
        <!-- Title -->
        <div class="col-sm-12 text-center">
            <h2 lang="it">{{ 'smartphone.title' | translate }}</h2>
        </div>

        <!-- Drawer type choice -->
        <div class="col-sm-12 text-center">
            <div class="panel panel-default">
                <div class="panel-body">{{ "smartphone.message" | translate }}</div>
            </div>
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
        return {}
    },

    /**
     * [methods description]
     * @type {Object}
     */
    methods: {},

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted () {

        // # Set component header title
        this.$store.commit( "setComponentHeader", "Smartphone" );

        // # hide sidebar
        $( ".sidebar .row" ).not( ".logocontainer" ).hide();
        $( ".sidebar" ).css( "backgroundColor", "#fff" );
        $( ".navbar-right, .split-header" ).hide();

        // # Log mount 
        console.log( "smartphone component mounted!" );
    }
}
</script>