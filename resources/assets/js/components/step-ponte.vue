<template>

<!-- Container -->
<div id="step-ponte">  

    <div id="step-ponte-content" class="content-flex content-flex-scrollable content-flex-padding">
        
        <!-- Orientation section -->
        <div class="row top2" >
            
            <div class="row">
                <!-- Orientation description -->
                <div class="col-lg-12 text-center">
                    <span class="help-block step-ponte-desc">{{ 'stepponte.orientation_description' | translate }}</span>
                </div>

            </div>
            
            <!-- Orientation choice -->
            <div class="row top1">

                <div class="col-lg-12">

                    <div class="col-lg-2" v-show="$store.state.is_suitable_width_4hbridge"></div>

                    <div class="col-lg-4" v-show="$store.state.is_suitable_width_4hbridge">

                        <figure :class="[ 'drawer-container', $store.state.bridge_orientation == 'H' ? 'image_selected' : '']" >
                            <a class="i-icon" id="orientation-H-popover" @click="showORIInfo( $event, 'H' )">&nbsp;</a>
                            <div class="drawer-container-image">
                                <img :src="getOriImage( 'H' )" 
                                     class="img img-responsive  img-shadow"
                                     id="or-H" 
                                     :class="{ 'img-desaturate': ( 'H' != $store.state.bridge_orientation) }"
                                     @click="setOrientation('H')"
                                />
                            </div>
                            <figcaption :class="[ 'text-uppercase', 'text-center', 'top2', $store.state.bridge_orientation == 'H' ? 'text-success' : 'text-danger']"> {{ 'stepponte.ori-H' | translate}} </figcaption>
                        </figure>
                    </div>
                    
                    <div :class="[ $store.state.is_suitable_width_4hbridge ? 'col-lg-1' : 'col-lg-2' ]"></div>

                    <div class="col-lg-4">

                        <figure :class="[ 'drawer-container', $store.state.bridge_orientation == 'V' ? 'image_selected' : '']">
                            <a class="i-icon" id="orientation-V-popover" @click="showORIInfo( $event, 'V' )">&nbsp;</a>
                            <div class="drawer-container-image">
                                <img :src="getOriImage( 'V' )"
                                     class="img img-responsive  img-shadow"
                                     id="or-V" 
                                     :class="{ 'img-desaturate': ( 'V' != $store.state.bridge_orientation) }"
                                     @click="setOrientation('V')"
                                />
                            </div>
                            <figcaption :class="[ 'text-uppercase', 'text-center', 'top2', $store.state.bridge_orientation == 'V' ? 'text-success' : 'text-danger']"> {{ 'stepponte.ori-V' | translate}} </figcaption>
                        </figure>
                    </div>

                </div>

            </div>
        </div>
        
        <!-- Supports section -->
        <div class="row top2" >

            <transition v-on:enter="slideFadeIn" v-on:leave="fadeSlideOut">
                <div class="container-fluid" v-if="$store.state.bridge_orientation.length">
                    
                    <div class="row top2">
                        <!-- Supports description -->
                        <div class="col-lg-12 text-center">
                            <span class="help-block step-ponte-desc">{{ 'stepponte.supports_description' | translate }}</span>
                        </div> 
                    </div>
                    
                    <div class="row top2">
                        <!-- Alerts: User Advice -->

                        <transition name="fade">
                            <div class="col-lg-12" v-if="showSupportsAdvice">
                                <div class='alert alert-warning' role="alert">
                                    <strong>{{ 'attenzione' | translate }}</strong> {{ $t('stepponte.supports_advice', { num_sup: numSup, dimension: dimensionAffected, mm: 6 * numSup })  }}
                                </div>
                            </div>
                        </transition>
                        
                    </div>

                    <!-- Support choice -->
                    <div class="row top1">
                            <div class="col-lg-1"></div>
                            <div v-for="( bridge_support, index, k ) in $store.getters.getSupportsAvailabe">
                                <div class="col-lg-1"></div>
                                <div class="col-lg-4">
                                    <figure :class="[ 'drawer-container', bridge_support.id == $store.state.bridge_supportID ? 'image_selected' : '']" >
                                        <a class="i-icon supports-info" @click="showSupportsInfo( $event )">&nbsp;</a>
                                        <div class="drawer-container-image">
                                            <img :src="getSupportImage( bridge_support )"
                                                 class="img img-responsive  img-shadow"
                                                 id="sup" 
                                                 :class="{ 'img-desaturate': bridge_support.id != $store.state.bridge_supportID }"
                                                 @click="selectBridgeSupport( bridge_support )"
                                            />
                                        </div>
                                        <figcaption :class="[ 'text-uppercase', 'text-center', 'top2', bridge_support.id == $store.state.bridge_supportID ? 'text-success' : 'text-danger']"> {{ bridge_support.height }} mm {{ $t( "stepponte.from-drawer-bottom" )}}</figcaption>
                                    </figure>
                                </div>
                            </div>
                    </div>

                </div>

            </transition>

        </div>

        <!-- Bridges section -->
        <div class="row top1" >


            <transition v-on:enter="slideFadeIn" v-on:leave="fadeSlideOut">
                <div v-if="$store.state.bridge_orientation.length && $store.state.bridge_supportID != 0 ">
                    
                    <div class="row top2">
                        <!-- Bridges description -->
                        <div class="col-lg-12 text-center">
                            <span class="help-block step-ponte-desc">{{ "stepponte.bridge_description" | translate }}</span>
                        </div> 
                    </div>

                    <!-- Bridges choice -->
                    <div class="row top2">
                        
                        <div class="col-lg-1"></div>
                        <div v-for="( bridge, index ) in $store.getters.getBridgesAvailabe">
                            <div class="col-lg-1"></div>
                            <div class="col-lg-4" >
                                <figure :class="[ 'drawer-container', bridge.id == $store.state.bridge_ID ? 'image_selected' : '']" >
                                    <a class="i-icon bridges-info" @click="showBridgeInfo( $event )">&nbsp;</a>
                                    <div class="drawer-container-image">
                                        <img :src="getBridgeImage( bridge )"
                                             class="img img-responsive  img-shadow"
                                             :class="{ 'img-desaturate': bridge.id != $store.state.bridge_ID }"
                                             id="bri"
                                             @click="selectBridgeType( bridge )"
                                             :data-width="bridge.width"
                                             :data-depth="bridge.depth"
                                        />
                                    </div>
                                    <figcaption :class="[ 'text-uppercase', 'text-center', 'top2', bridge.id == $store.state.bridge_ID ? 'text-success' : 'text-danger']"> {{ $t( "stepponte.bridge_elem_label" ) }} H {{ bridge.depth }} mm </figcaption>
                                </figure>

                            </div>
                        </div>

                    </div>

                </div>
            </transition>

        </div>
    </div>
    <!-- Next button -->
    <div class="row actions-toolbar">

        <div class="col-lg-2 pull-left" >
            <router-link to="/split/step3" class="btn btn-danger btn-back" tag="button">{{ 'back' | translate }}</router-link>
        </div>

        <div class="col-lg-2 pull-left" >
            <button class="btn btn-danger btn-reset" @click="resetData">{{ 'stepponte.reset' | translate }}</button>
        </div>        

        <div class="col-lg-2 pull-right" >
            <button class="btn btn-danger" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
        </div>  

    </div>
        
</div>
</template>

<script>

// # Import map getters
// import { mapGetters } from 'vuex'

/**
 * Vue object managing bridge / bridge support choice
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
             * Error modal selector caching
             * @type {Object}
             */
            error_modal: $( "#error-modal" ),

            config: {

              // # Lightgallery common settings
              lightgalleryOptions: {
                  download: false,
                  thumbnail: false,
                  dynamic: true,
                  counter: false
              }
            }
        }
    },

    computed: {

        /**
         * Determines if the supports advice must be shown
         * @return {Boolean}
         */
        showSupportsAdvice: function () {
            return   this.$store.state.drawertype == 4 || 
                   ( this.$store.state.drawertype != 4 && this.$store.state.bridge_orientation != "H" );
        },

        /**
         * Computes the supports number required
         * @return {Number}
         */
        numSup: function () {

            // # Depends on drawer type selected
            switch( this.$store.state.drawertype ) {

                case 4:// # Custom drawer
                    return 2;
                
                case 3: // # 2 sides
                    return this.$store.state.bridge_orientation == "H" ? 0 : 2;

                case 2: // # 3/4 sides
                case 1:

                    return this.$store.state.bridge_orientation == "V" ? 1 : 0;

            }
        },

        /**
         * Returns the affected dimension ( affected by the support insertion )
         * @return {String}
         */
        dimensionAffected: function () {
            return this.$store.state.bridge_orientation == "H" ? Vue.i18n.translate( "width" ) : Vue.i18n.translate( "length" );
        }
    },

    /**
     * Object methods
     * @type {Object}
     */
    methods: {

        
        getOriImage: function ( ori ) {

            let basepath = '/images/others/step-ponte/scelte-step-ponte/Orientamento_H-V/EP_' + ori + '_';
            let path = basepath + this.$store.state.drawertype;

            if( this.$store.state.drawertype == 4 ) {
                return path + ".jpg";
            }

            path += "-" + parseInt( this.$store.state.dimensions.shoulder_height ) + ".jpg";
            console.log( path );
            return path;
        },

        getSupportImage: function ( obj ) {

            let basepath = '/images/others/step-ponte/scelte-step-ponte/H-fondo/EP_' + this.$store.state.drawertype;
            let path = basepath + '_hfo' + parseInt( obj.height ) + ".jpg";

            return path;
        },

        getBridgeImage: function ( obj ) {

            let basepath = '/images/others/step-ponte/scelte-step-ponte/H-ponte/EP_' + this.$store.state.drawertype;
            let path = basepath + '_h' + parseInt( obj.depth ) + ".jpg";

            return path;
        },

        /***
         * TRANSITIONS
         */
        slideFadeIn(el, done) {
            $(el).animate({
                opacity:1
            }, {
                queue: false,
                duration: 400,
                complete: function() {

                    let pos = el.offsetTop;
                    console.log("FADE IN DONE POS: ", pos);

                    $( "#step-ponte-content" ).animate( { scrollTop: pos }, 400 );
                    // # callback fine transizione
                    done;
                }
            });
        },

        fadeSlideOut(el, done) {
            $(el).animate({
                opacity:0
            }, {
                queue: false,
                duration: 400,
                complete: function() {
                    console.log("FADE OUT DONE");
                    $( "#step-ponte-content" ).animate( { scrollTop: 0 }, 400 );
                    done;
                }
            });
        },

        /**
         * Toggle orientation selected in the store ( V | H )
         * @param {void}
         */
        setOrientation: function ( val ) {

            // # on click: if orientation is the same toggle
            this.$store.commit( "setBridgeOrientation", val == this.$store.state.bridge_orientation ? "" : val );

            // # Commit mutation and clear step data
            this.$store.commit( "clearBridgeData" );
            this.$store.commit( "computeDimensionsOnSupportsChanges", { op: "clear" } ); 
        },

        /**
         * Resets all bridge related data
         * @return {void}
         */
        resetData: function () {
            this.$store.commit( "clearAllBridgeData" );
        },

        /**
         * [selectBridgeType description]
         * @param  {[type]} bridge [description]
         * @return {[type]}        [description]
         */
        selectBridgeType: function ( bridge ) {

            console.log( "BRIDGE", bridge );

            // # Manage unset ( click on the already selected choice )
            if( bridge.id == this.$store.state.bridge_ID ) {

                // # Reset bridge id
                this.$store.commit( "setBridgeID", 0 );
                this.$store.commit( "clearBridges" );

                return;
            }

            // # Clean up next choice
            this.$store.commit( "clearBridges" );
            
            // # Parse to float
            let shoulder_height_float = parseFloat( this.$store.state.dimensions.shoulder_height );

            // # Switch drawer types
            switch( this.$store.state.drawertype ) {

                case 4:
                    // # todo: capire perchè è qui!
                    if( shoulder_height_float >= 116 && shoulder_height_float < 138.5 ) {

                        // # TODO bridgeID won't be 1 or 2
                        if( this.$store.state.bridge_supportID == 2 && bridge.id == 48 ) {
                            
                            // # Show error modal 
                            this.error_modal
                            .find( '.modal-body' )
                            .text( "Impossibile selezionare questo elemento, l'altezza totale risulta maggiore di quella disponibile" );

                            this.error_modal.modal();

                            return false;
                        }
                    }  

                    this.$store.commit( "setBridgeID", bridge.id );

                    bridge.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width: 
                                    this.$store.state.dimensions.length;                    

                break;

                case 3:// Lineabox 2 sides

                    bridge.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width + 12: 
                                    this.$store.state.dimensions.length;    

                    this.$store.commit( "setBridgeID", bridge.id );
                break;

                case 2:
                case 1:

                    bridge.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width + 12: 
                                    this.$store.state.dimensions.length + 6;   

                    this.$store.commit( "setBridgeID", bridge.id );

                break;
            }

            // # Push the first bridge of the selected type
            this.$store.commit( "manageBridge", bridge.items[0] );
        },

        /**
         * [selectBridgeSupport description]
         * @param  {[type]} bridge_support [description]
         * @return {[type]}                [description]
         */
        selectBridgeSupport: function( bridge_support ) {

            // # Manage unset
            if( bridge_support.id == this.$store.state.bridge_supportID ) {

                // # Reset support id
                this.$store.commit( "computeDimensionsOnSupportsChanges", { op: "clear" } );
                this.$store.commit( "setBridgeSupportID", 0 );
                this.$store.commit( "clearBridgeSupports" );

                return;
            } 

            // # Bridge support length is always the width or the height of the drawer
            bridge_support.length = this.$store.state.bridge_orientation == "H" ? 
                                    this.$store.state.dimensions.width : 
                                    this.$store.state.dimensions.length;
            
            switch( this.$store.state.drawertype ) {

                case 4:
                    
                    // # Set support id
                    this.$store.commit( "setBridgeSupportID", bridge_support.id );

                    
                    this.$store.commit( "computeDimensionsOnSupportsChanges",  { op: "add" }  );

                    // # Push 2 of the same type
                    this.$store.commit( "manageBridgeSupport", bridge_support );
                    this.$store.commit( "manageBridgeSupport", bridge_support );

                break;

                case 3: // # Lineabox 2 sides

                    switch( this.$store.state.bridge_orientation ) {

                        case "H":
                            // # Do nothing, supports are already embedded
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );
                        break;

                        case "V": 
                            
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );

                            // # Push 2 of the same type
                            this.$store.commit( "manageBridgeSupport", bridge_support );
                            this.$store.commit( "manageBridgeSupport", bridge_support );
                            this.$store.commit( "computeDimensionsOnSupportsChanges",  { op: "add" }  );

                        break;
                    }

                break;


                case 2: // # Lineabox 3 sides
                case 1: // # Lineabox 4 sides 

                    switch( this.$store.state.bridge_orientation ) {

                        case "H":
                            // # Do nothing, supports are already embedded
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );                           
                        break;

                        case "V": 
                            
                            // # Set support id
                            this.$store.commit( "setBridgeSupportID", bridge_support.id );

                            // # Push ONLY ONE  of the same type
                            this.$store.commit( "manageBridgeSupport", bridge_support );
                            this.$store.commit( "computeDimensionsOnSupportsChanges",  { op: "add" }  );


                        break;
                    }

                break;

            }
        },     

        /**
         * [check description]
         * @return {[type]} [description]
         */
        check: function() {

            if( this.$store.state.bridge_orientation != "" && 
              ( this.$store.state.bridge_supportID == 0 || this.$store.state.bridge_ID == 0 ) ) {

                // # Show error modal and move the user at the top of this step
                this.error_modal
                .find('.modal-body')
                .text(  Vue.i18n.translate( "stepponte.incomplete_data" ) );

                this.error_modal.modal();
                
                // # Step Bridge has errors
                this.$store.commit( "setBridgecompleted", false );

                // # No bridge selected
                this.$store.commit( "hasBridge", false );

                return false;
            } 

            // # Check if user has selected a bridge and commit the related mutation
            this.$store.commit( "hasBridge", this.$store.state.bridges_selected.length > 0 );

            // # Step Bridge ok
            this.$store.commit( "setBridgecompleted", true );

            // # take user to the next step
            this.$router.push( { path: '/split/step4' } );

            return true;
        },

        showBridgeInfo: function( event ) {

            try {
                $( event.target ).data( "lightGallery" ).destroy( true );
                // $( this ).unbind( "click" );
            } catch( e ) {
                // Do nothing
            }


            // # Get related image element
            let related_image = $( event.target ).next().find( "img" );

            // # General settings + image src
            let bridgesGalleryOptions = this.config.lightgalleryOptions;
            bridgesGalleryOptions.dynamicEl = [ { src: related_image.attr( "src" ) } ];
            
            // # Init
            $( event.target ).lightGallery( bridgesGalleryOptions ) ;   
        },

        showSupportsInfo: function( event ) {

            try {
                $( event.target ).data( "lightGallery" ).destroy( true );
                // $( this ).unbind( "click" );
            } catch( e ) {
                // Do nothing
            }

            // # Get related image element
            let related_image = $( event.target ).next().find( "img" );

            // # General settings + image src
            let supportsGalleryOptions = this.config.lightgalleryOptions;
            supportsGalleryOptions.dynamicEl = [ { src: related_image.attr( "src" ) } ];
            
            // # Init
            $( event.target ).lightGallery( supportsGalleryOptions ) ;   

        },

        showORIInfo: function ( event, ori ) {

            try {
                $( event.target ).data( "lightGallery" ).destroy( true );
                // $( this ).unbind( "click" );
            } catch( e ) {
                // Do nothing
            }

            // # General settings + image src
            let oriHGalleryOptions = this.config.lightgalleryOptions;
            oriHGalleryOptions.dynamicEl = [ { src: $( "#or-" + ori ).attr( "src" ) } ];

            // # Init
            $( event.target ).lightGallery( oriHGalleryOptions ) ;
        }
    },

    /**
     * Route guard: disallow route entering if previuos data has not been submitted
     * 
     * @param  {string}   to   [description]
     * @param  {string}   from [description]
     * @param  {string}   next [description]
     * @return {void} 
     */
    beforeRouteEnter: ( to, from, next ) => {

        next( vm => {

            if( from.path == "/split/step4" && vm.$store.state.is_suitable_height_4bridge == false ) {
                 console.log( "in guard" );
                 vm.$router.push({ path: '/split/step3' });
                 return;
            }

            // # is Step 1 completed ?
            if( !vm.$store.state.onecompleted ) {
                 vm.$router.push({ path: '/split/step1' });
                 return;
            }

            // # is Step 2 completed ?
            if( !vm.$store.state.twocompleted ) {
                 vm.$router.push({ path: '/split/step2' });
                 return;
            }

            // # is Step 3 completed ?
            if( !vm.$store.state.threecompleted ) {
                 vm.$router.push({ path: '/split/step3' });
                 return;
            }

            // # if shoulder height it's not enough go back
            if( !vm.$store.state.is_suitable_height_4bridge ) {
                 vm.$router.go( -1 );
                 return;
            }

        })
    },     

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */    
    mounted () {

        // # Component header title and current step info
        this.$store.commit( "setComponentHeader", "stepponte.header-title" );
        this.$store.commit( "setCurrentStep", 'p' );

        // ---------------------------------------------
        // SET SIDEBAR ITEM ACTIVE - BEGIN
        
        let pos = 0;
        let $pointer = $(".navigator .pointer-navigator"); 
        let $nav = $(".navigator #nav").find("li");
        let $active = $nav.find("a.router-link-active");
        
        pos = parseInt($active.parent("li").position().top);
        $pointer.removeAttr("style").attr("style","transform: translateY(" + pos.toString() + "px)");
        
        // SET SIDEBAR ITEM ACTIVE - END 
        // ---------------------------------------------

        console.log( "Step ponte Mounted!" );
    }
}
</script>
