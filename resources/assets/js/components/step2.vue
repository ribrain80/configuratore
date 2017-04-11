<template>

<!-- Container -->
<div class="container-fluid" id="step2">
    
    <!-- User reset advice Modal -->
    <div class="modal fade" id="reset-advice-modal" tabindex="-1" role="dialog" aria-labelledby="">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">{{ $t( 'attenzione' ) }}</h4>
                </div>
                <div class="modal-body">{{ "resetadvice" | translate }}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Ok!</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Information alert -->
    <div class="row">

        <!-- Alerts: User Warning -->
        <div class="col-lg-12" v-show="$store.state.drawertype == 0">
            <div class="alert alert-warning" role="alert" id="step2-alert-warning">
                <strong>{{ $t( 'attenzione' ) }}</strong> {{ $t( 'step2.warning' ) }}
            </div>
        </div>
        
    </div>

    <div class="row top2">

        <div v-for="( type,category ) in $store.state.drawerTypes">
            <div class="col-lg-4" v-if="type.length == 1">
                <!-- Drawer type -->
                <figure :class="[ 'drawer-container', ( type[ 0 ].id == $store.state.drawertype ) ? 'asd-keeplogic' : '' ]" >
                    <figcaption> {{ type[ 0 ].description  | translate}} </figcaption>
                    <img :src="'/images/drawers/'+category.toLowerCase()+'.png'"
                         class="img img-responsive img-rounded img-shadow"
                         :class="{ 'img-desaturate': ( type[ 0 ].id != $store.state.drawertype ) }"
                         @click="setType( type[ 0 ].id )"
                    />
                </figure>
            </div>
                
            <div class="col-lg-4 col-lg-offset-2" v-else>
                <!-- Drawer category -->
                <figure :class="[ 'drawer-container', ( type[ 0 ].id == $store.state.drawertype ) ? 'asd-keeplogic' : '' ]">
                    <figcaption> {{ type[ 0 ].category  | translate}} </figcaption>
                    <img :src="'/images/drawers/'+category.toLowerCase()+'.png'"
                         class="img img-responsive img-rounded img-shadow img-desaturate"
                         @click="setDrawerTypeCategory( 1 )"
                    />
                </figure>
            </div>
        </div>

    </div>

    <div class="row top5"
         v-for="( type,category ) in $store.state.drawerTypes"
         v-if="type.length > 1"
         v-show="$store.state.drawer_type_category == 1">
        <div class="col-lg-4" v-for="ctype in type">
            <figure class="drawer-container" :class="{ 'asd-keeplogic': ( ctype.id == $store.state.drawertype ) }">
                <figcaption> {{ ctype.description | translate}} </figcaption>
                <img :src="'/images/drawers/' + category.toLowerCase() + '-' + ctype.id + '.png'"
                     class="img img-responsive  img-shadow "
                     :class="{ 'img-desaturate': ( ctype.id != $store.state.drawertype ) }"
                     @click="setType( ctype.id )"
                />
            </figure>
        </div>
    </div>

    <!-- Navigation row -->
    <div class="row top5">

        <div class="col-md-2 pull-right">
            <button class="btn btn-danger btn-block pull-right" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
        </div>

        <div class="col-md-2 pull-right">
            <router-link to="/split/step1" tag="button" class="btn btn-danger btn-back btn-block">{{ 'back' | translate }}</router-link>
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
     * Object methods
     * @type {Object}
     */
    methods: {

         /**
         * Sets the drawer category, commit related store mutation
         * @param {int} cat 
         */
        setDrawerTypeCategory: function( cat ) {
            this.$store.commit( "setDrawerTypeCategory", cat );
        },

        /**
         * Sets the type ( user choice )
         * @param {int} type the drawer type chosen
         */
        setType: function ( type ) {

            // # User reset advice ( shown once if user cames back here from one of the next steps )
            if( ( this.$store.state.threecompleted || this.$store.state.bridgecompleted || this.$store.state.fourcompleted ) 
                 && !this.$store.state.step2_adviceAccepted ) {
              
                // # Show modal alert
                $( "#reset-advice-modal" ).modal();

                // # Advice message accepted, show no more
                this.$store.commit( "setStep2AdviceAccepted", true );

                // # And return
                return false;
            }

            // # Data container updates
            this.$store.commit( "setDrawerType", type );
            this.$store.commit( "isLineaBox", type != 4 ); 

            // # Clean up following steps already inserted data, eventually
            this.$store.commit( "clearAllBridgeData" ); 
            this.$store.commit( "clearDividers" );
            this.$store.commit( "clearDrawerBorders" );
            this.$store.commit( "setDefaultDimensions" );

            // # Step2 is completed, everything's ok
            this.$store.commit( "setTwocompleted", true );

            // # Set a default 4 lineabox select
            // # Default is the lowest value
            if( 4 != type ) {
                this.$store.commit( "setShoulderHeight", this.$store.state.dimensions.actual_lineabox_shoulder_height_LOW );
                return;
            } 

            // # Custom drawer - category = 0
            this.$store.commit( "setDrawerTypeCategory", 0 );
                    
        },      

        /**
         * Checks inputs for this step
         * @return {Boolean} 
         */
        check: function() {

            // # Check choice
            if( 0 != this.$store.state.drawertype ) {

                // # Step2 is completed, everything's ok
                this.$store.commit( "setTwocompleted", true );

                // # Push me to the next step
                this.$router.push( { path: '/split/step3' } );

                // # OK
                return true;
            }

            // # Step2 has errors
            this.$store.commit( "setTwocompleted", false );

            // # Modal Error display
            $( "#error-modal" ).find( '.modal-body' ).text( Vue.i18n.translate( "step2.modal-warning" ) );
            $( '#error-modal' ).modal();

            // # Error
            return false; 
        }
    },

    /**
     * Route guard: disallow route entering if previuos data has not been submitted
     * 
     * @param  {string}   to   [destination]
     * @param  {string}   from [source]
     * @param  {string}   next [next]
     * @return {void} 
     */
    beforeRouteEnter: ( to, from, next ) => {
        
        next( vm => {

            // # is Step 1 completed ?
            if( !vm.$store.state.onecompleted ) {
                 vm.$router.push( { path: '/split/step1' } );
            }
        });
    }, 

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted () {

        // # Log mount 
        console.log( "Step2 Mounted!" );

        // # Set component header title
        this.$store.commit( "setComponentHeader", "step2.header-title" );
    }
}
</script>