<template>
    
    <!-- Container -->
    <div class="row" id="step2">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2 lang="it">{{ '500.title' | translate }}</h2>
        </div>

        <!-- Drawer type choice -->
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-body">ERROR 500</div>
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
    mounted() {

        // # Log mount 
        console.log( "500 Mounted!" );
    }
}
</script>