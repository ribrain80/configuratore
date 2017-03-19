<template>

    <!-- Container -->
    <div class="row" id="step1">
        
        <!-- Full width -->
        <div class="col-md-12">

            <!-- Page title -->
            <h3>{{ 'step1.title' | translate }}</h3>

            <!-- Product description -->
            <h4>{{ 'step1.product_description_title' | translate }}</h4>

            <!-- Text -->
            <p>{{ 'step1.product_description_text' | translate }}</p>

            <!-- Next button -->
            <button class="btn btn-danger inpagenav" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>

        </div>

    </div>

</template>
<script>

/**
 * Vue object managing info section / welcome page
 * @type {Vue}
 */
export default {

    /**
     * Object data
     * @type {Object}
     */    
    data: function() { return {} },

    /**
     * Object methods
     * @type {Object}
     */
    methods: {

        /**
         * Final check ( "Next" button click )
         * @return {bool} true if checks are ok
         */
        check: function() {

            // # Step1 is completed, everything's ok
            this.$store.commit( "setOnecompleted", true );

            // # Push me to the next step
        	this.$router.push({ path: '/split/step2' });
        }
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () {

        // # Log mount 
        console.log( "Welcome/info page mounted" );

        //Get all init values from Api
        this.$store.dispatch('initApp');
    }
}
</script>
