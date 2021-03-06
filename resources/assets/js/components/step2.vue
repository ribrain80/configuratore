<template>

<!-- Container -->
<div id="step2">
    
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
    
    <!-- Step2 Main content -->
    <div id="step2-content" class="content-flex content-flex-scrollable content-flex-padding">

      <div class="row top2">

          <div v-for="( type,category ) in $store.state.drawerTypes">

              <div class="col-lg-4 col-md-4 col-sm-4" v-if="type.length == 1">

                  <!-- Drawer type no category -->
                  <figure :class="[ 'drawer-container', 'text-center', ( type[ 0 ].id == $store.state.drawertype ) ? 'image_selected' : '' ]" >
                      <figcaption> {{ type[ 0 ].description  | translate}} </figcaption>
                      <div class="drawer-container-image">
                        <img :src="'/images/drawers/'+category.toLowerCase()+'.jpg'"
                             class="img img-responsive img-rounded center-block img-shadow"
                             :class="{ 'img-desaturate': ( type[ 0 ].id != $store.state.drawertype ) }"
                             @click="setType( type[ 0 ].id )"
                        />
                      </div>
                  </figure>

              </div>
                  
              <div class="col-lg-4 col-md-4 col-sm-4 col-sm-offset-2 col-md-offset-2 col-lg-offset-2" v-else>

                  <!-- Drawer type with category -->
                  <figure :class="[ 'drawer-container', 'text-center', ( 1 == $store.state.drawer_type_category ) ? 'image_selected' : '' ]">
                      <figcaption> {{ type[ 0 ].category  | translate}} </figcaption>
                      <div class="drawer-container-image">
                        <img :src="'/images/drawers/'+category.toLowerCase()+'.jpg'"
                             class="img img-responsive img-rounded center-block img-shadow img-desaturate"
                             @click="setDrawerTypeCategory( 1 )"
                        />
                      </div>
                  </figure>

              </div>
          </div>

      </div>

      <transition v-on:enter="slideFadeIn" v-on:leave="fadeSlideOut">

        <div class="row top5" v-for="( type,category ) in $store.state.drawerTypes" v-if="type.length > 1" v-show="$store.state.drawer_type_category == 1">

            <div class="col-lg-4 col-md-4 col-sm-4" v-for="ctype in type">

                <figure class="drawer-container text-center" :class="{ 'image_selected' : ( ctype.id == $store.state.drawertype ) }">
                    <figcaption> {{ ctype.description | translate }} </figcaption>
                    <div class="drawer-container-image">
                      <img :src="'/images/drawers/' + category.toLowerCase() + '-' + ctype.id + '.jpg'"
                           class="img img-responsive center-block img-shadow "
                           :class="{ 'img-desaturate': ( ctype.id != $store.state.drawertype ) }"
                           @click="setType( ctype.id )"
                      />
                    </div>
                </figure>

            </div>

        </div>
      </transition>
    </div>

    <!-- Navigation row -->
    <div class="row actions-toolbar">
    
        <!-- Prev button -->
        <div class="col-sm-4 col-md-3 col-lg-2">
            <router-link to="/split/step1" tag="button" class="btn btn-danger btn-back">{{ 'back' | translate }}</router-link>
        </div>

        <!-- Next button -->
        <div class="col-sm-4 col-md-3 col-lg-2">
            <button class="btn btn-danger btn-block" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
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
        return {
          error_modal:  $( "#error-modal" )
        }
    },

    /**
     * Object methods
     * @type {Object}
     */
    methods: {

         /**
         * Sets the drawer category, commit related store mutation
         * @param {Number} cat 
         */
        setDrawerTypeCategory: function( cat ) {
            this.$store.commit( "setDrawerType", 0 );
            this.$store.commit( "setDrawerTypeCategory", cat );
        },

        /**
         * Sets the type ( user choice )
         * @param {Number} type the drawer type chosen
         */
        setType: function ( type ) {

            // # User reset advice ( shown once if user came back here from one of the next steps )
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
            this.$store.dispatch( "remove3dAllDividers" );  
            this.$store.commit( "clearDrawerBorders" );
            this.$store.commit( "setDefaultDimensions" );

            // # Step2 is completed, everything's ok
            this.$store.commit( "setTwocompleted", true );

            // # Set a default shoulder height 4 lineabox selection
            // # Default is the lowest value
            if( 4 != type ) { // Lineabox ( any ) 
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
            $( "#generic-alert-message" ).text( Vue.i18n.translate( "step2.modal-warning" ) );
            this.error_modal.modal();

            // # Error
            return false; 
        },

        /**
         * Slide effect for transition
         * @param  {Object}   el   [target el]
         * @param  {Function} done [callback]
         * @return {void}
         */
        slideFadeIn ( el, done ) {

            $( el ).animate({
                opacity: 1
            }, {
                queue: false,
                duration: 400,
                complete: function () {

                    let pos = el.offsetTop;
                    $( "#step2-content" ).animate( { scrollTop: pos }, 400 );
                    
                    // # callback end transition
                    done;
                }
            });
        },

        /**
         * Slide effect for transition
         * @param  {Object}   el   [target el]
         * @param  {Function} done [callback]
         * @return {void}
         */       
        fadeSlideOut ( el, done ) {

            $( el ).animate({
                opacity: 0
            }, {
                queue: false,
                duration: 400,
                complete: function() {

                    $( "#step2-content" ).animate( { scrollTop: 0 }, 400 );

                    // # callback end transition
                    done;
                }
            });
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

            if( vm.$store.state.fourreached ) {
                vm.$store.dispatch( "clearStep4Reached" );
            }
                        
        });
    }, 

    created () {
      Pace.start( paceOptions );
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted () {

        // # Set component header title
        this.$store.commit( "setComponentHeader", "step2.header-title" );
        this.$store.commit( "setCurrentStep", 2 );

        // # Sidebar
        let pos = 0;
        let $pointer = $( ".navigator .pointer-navigator" ); 
        let $nav = $( ".navigator #nav" ).find( "li" );
        let $active = $nav.find( "a.router-link-active" );
        
        pos = parseInt( $active.parent( "li" ).position().top );
        $pointer.removeAttr( "style" ).attr( "style", "transform: translateY(" + pos.toString() + "px)" );

        Pace.stop();

    }
}
</script>