<template>

<!-- Container -->
<div class="container-fluid" id="step1">
    
    <div class="row">
        
        <!-- Full width -->
        <div class="col-lg-6 col-md-6 col-sm-6 content-flex" id="step1-content" >

            <!-- Text -->
            <div class="content-flex-scrollable" v-html="$t( 'step1.product_description_text' )"></div>

            <!-- Next button -->
            <div class="row actions-toolbar">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <button class="btn btn-danger btn-abs" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
                </div>
            </div>

        </div>

        <!-- Info image -->
        <div class="col-lg-6 col-md-6 col-sm-6 no-padding" id="step1-description-image"></div>

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
        	this.$router.push( { path: "/split/step2" } );
        }
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () {

        // # Set component header title
        this.$store.commit( "setComponentHeader", "step1.header-title" );
        this.$store.commit( "setCurrentStep", 1 );

        // # Scope workaround
        var self = this;

        // # Lightgallery binding
        $( "#gallery-trigger" ).on( "click", function () {
            
            // # Init
            $( this ).lightGallery({

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
                dynamicEl: self.$store.state.gallery_images
            })

        });

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


