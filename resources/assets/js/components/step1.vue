<template>

<!-- Container -->
<div class="container-fluid" id="step1">
    
    <div class="row">
        
        <!-- Full width -->
        <div class="col-lg-6 col-md-6 col-sm-6 content-flex" id="step1-content">

            <!-- Text -->
            <div class="content-flex-scrollable" v-html="$t( 'step1.product_description_text' )"></div>

            <!-- Next button row -->
            <div class="row actions-toolbar">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <button class="btn btn-danger btn-abs" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
                </div>
            </div>

        </div>

        <!-- Info image -->
        <div class="col-lg-6 col-md-6 col-sm-6 no-padding" id="step1-description-image">
            
            <!-- Right side automatic carousel -->
            <div id="step1-carousel" class="carousel slide">

                <div class="carousel-inner" role="listbox">
                    <!-- Items are taken from the server -->
                    <div :class="['item', index == 0 ? 'active' : '']" v-for="( image, index ) in $store.state.gallery_images">
                      <img class="img-responsive" :src="image.src" :alt="image.src">
                    </div>  
                </div>

            </div>
                      
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
     * Component Data watchers
     * @type {Object}
     */
    watch: {

        /**
        * gallery_images watcher
        * @return {void}
        */
        gallery_images: function () {

            // # Once images are loaded and the mutation changes their stored value
            // # init the carousel ( and bind the gallery onclick event at the same time )
            this.carouselInit();
        }
    },  

    /**
     * Computed properties
     * @type {Object}
     */
    computed: {

        /**
         * gallery_images "getter"
         * @return {string}
         */
        gallery_images: function() {
            return this.$store.state.gallery_images;
        }
    },

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
        	this.$router.push( { path: "/split/step2" } );
        },

        /**
         * Actually starts the right ide carousel and initilize the gallery
         * @return {void}
         */
        carouselInit: function() {

            // # Left side carousel init
            $( ".carousel" ).carousel({

                /**
                 * time between slides
                 * @type {Number}
                 */
                interval: 3000,

                /**
                 * cycle carousel
                 * @type {Boolean}
                 */
                wrap: true,

                /**
                 * no pause on hover
                 * @type {string|null}
                 */
                pause: null
            });

            // # Lightgallery binding
            $( "#gallery-trigger" ).on( "click", ( event ) => {
                
                // # Init
                $( event.currentTarget ).lightGallery( {

                    /**
                     * Custom next arrow html
                     * @type {String}
                     */
                    nextHtml: "<img src='/images/gallery/freccia-galleria-dx.png'>",

                    /**
                     * Custom prev arrow html
                     * @type {String}
                     */
                    prevHtml: "<img src='/images/gallery/freccia-galleria-sx.png'>",

                    /**
                     * No donwload button
                     * @type {Boolean}
                     */
                    download: false,

                    /**
                     * No toggle thumb button
                     * @type {Boolean}
                     */
                    toogleThumb: true,

                    /**
                     * Dynamic images
                     * @type {Boolean}
                     */
                    dynamic: true,

                    /**
                     * Gallery elements
                     * @type {Array}
                     */
                    dynamicEl: this.$store.state.gallery_images

                } );

            });                      
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

            // # is Step 1 completed ?
            if( vm.$store.state.onecompleted ) {
                // # reinit carousel
                vm.carouselInit();
                return;
            }
        })
    },     

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () {

        // # Set component header title
        this.$store.commit( "setComponentHeader", "step1.header-title" );
        this.$store.commit( "setCurrentStep", 1 );


        // # Sidebar
        let pos = 0;
        let $pointer = $( ".navigator .pointer-navigator" ); 
        let $nav = $( ".navigator #nav" ).find( "li" );
        let $active = $nav.find( "a.router-link-active" );
        
        pos = parseInt( $active.parent( "li" ).position().top );
        $pointer.removeAttr( "style" ).attr( "style", "transform: translateY(" + pos.toString() + "px)" );
    }
}
</script>