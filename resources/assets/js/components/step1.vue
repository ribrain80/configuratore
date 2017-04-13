<template>

<!-- Container -->
<div class="container-fluid" id="step1">
    
    <div class="row">
        
        <!-- Full width -->
        <div class="col-lg-6 col-md-6 col-sm-6">

            <!-- Text -->
            <div v-html="$t( 'step1.product_description_text' )"></div>

            <!-- Next button -->
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4 pull-right">
                    <button class="btn btn-danger btn-block" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
                </div>
            </div>

        </div>

        <!-- Info image -->
        <div class="col-lg-6 col-md-6 col-sm-6">
            <img src="/images/others/foto-home.png" class="img img-responsive w-100">
        </div>

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
        	this.$router.push( { path: '/split/step2' } );
        }
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () {

        // # Set component header title
        this.$store.commit( "setComponentHeader", "step1.header-title" );
        
        // # Log mount 
        console.log( "Welcome/info page mounted" );
    }
}
</script>
