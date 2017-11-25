<template>
    
    <!-- Container -->
    <div class="row" id="smartphone">

        <!-- Drawer type choice -->
        <div class="col-sm-12 text-center" style="background: #424242;heigth:35px">
            <img src="/images/logos/splitw.png" style="width: 45%;margin-top: 13%;margin-bottom: 13%">
        </div>
        <!-- Drawer type choice -->
        <div class="col-sm-12 text-center" style="margin-top: 10%">
            <div class="panel panel-default">
                <div class="panel-body" style="font-size:1.4em">{{ "smartphone.message" | translate }}</div>
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
        this.$store.commit( "setComponentHeader", "" );

        // # hide sidebar
        $( ".sidebar .row" ).not( ".logocontainer" ).hide();
        $( ".sidebar" ).css( "backgroundColor", "#fff" );
        $( ".navbar-right, .split-header" ).hide();
        $( ".app-nav + div").css('top','0px');
        $( ".app-nav").hide();


        // # Log mount 
        console.log( "smartphone component mounted!" );
    }
}
</script>