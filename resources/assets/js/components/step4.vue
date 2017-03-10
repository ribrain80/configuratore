<template>
    
    <!-- Container -->
    <div class="row" id="step4">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2 lang="it">Selezione inserti</h2>
        </div>
        
        <!-- Canvas container -->
        <div class="col-lg-12">
            campo giochi  
        </div>
        
        <!-- Dividers container -->
        <div class="col-lg-12" id="elementmenu">

            <!-- Tab title ( Nav ) -->
            <ul class="nav nav-tabs">
                <li  :class="{active: !index}" v-for="(cat,index) in dividers.dividersCategories">
                    <a data-toggle="tab" :href="genHref(cat)"> Elem h-{{cat}}</a>
                </li>
            </ul>

            <!-- Tab contents -->
            <div class="tab-content">
                <div :class="{active: !index}" :id="'elem'+cat" class="tab-pane fade in" v-for="(cat,index) in dividers.dividersCategories">
                    <div class="row" style="margin-top: 22px">
                        <div class="col-lg-4" v-for="divider in getDividerByCat(cat)">
                            <div class="panel panel-default" :class="{ 'bg-success': isSelected( divider.id ) }">
                                <div class="media">
                                    <div class="media-left">
                                            <img class="media-object" src="http://placehold.it/200x100">
                                    </div>
                                    <div class="media-body" :data-x="divider.width" :data-y="divider.length" :data-z="divider.depth" :data-orientation="H" @click="pushDivider( divider )" :data-id="divider.id">
                                        <h4 class="media-heading"></h4>
                                        ({{divider.width}} x {{divider.length}})
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        
        <!-- Next button -->
        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="check">Avanti</button>
        </div>

    </div>

</template>

<script>
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
             * [dividers description]
             * @type {Array}
             */
            dividers: [],

            /**
             * [has_error description]
             * @type {Boolean}
             */
            has_error: false,
        }
    },

    methods: {

        /**
         * [initDividers description]
         * @return {[type]} [description]
         */
        initDividers: function () {

            // # ajax call
            this.$http.get( '/split/dividers' ).then( response => {
                // # dividers retrieved
                this.dividers = response.body;
            }, response => {
                // # something went wrong
                this.hasError = true;
            });
        },

        pushDivider: function ( divider ) {
            this.$store.commit( "manageDivider", divider );
        },

        isSelected: function( id ) {
            return $.inArray( id, this.$store.state.dividers_selected ) != -1;
        },

        genHref:function ( val ) {
            return "#elem" + val;
        },

        getDividerByCat: function( val ) {
            return this.dividers.dividers[ val ];
        },

        check: function() {

            // # Check
            if( this.$store.state.dividers_selected.length == 0 ) {

                $( "#error-modal" ).find( '.modal-body' ).text( "Devi selezionare almeno un divisorio" );
                $( '#error-modal' ).modal();

                // # Step4 has errors
                this.$store.commit( "setFourcompleted", false );

                // # Stay here and fix it
                return false;  
            } 

            // # Step4 is completed, everything's ok
            this.$store.commit( "setFourcompleted", true );

            // # Take the user to the next step
            this.$router.push({ path: '/split/step5' });
        }, 
    },

    beforeRouteEnter: (to, from, next) => {
        
        next( vm => {

            if( !vm.$store.state.onecompleted ) {
                 vm.$router.push({ path: '/split/step1' });
                 return;
            }

            if( !vm.$store.state.twocompleted ) {
                 vm.$router.push({ path: '/split/step2' });
                 return;
            }

            if( !vm.$store.state.threecompleted ) {
                 vm.$router.push({ path: '/split/step3' });
                 return;
            }

            if( !vm.$store.state.bridgecompleted ) {
                 vm.$router.push({ path: '/split/stepponte' });
                 return;
            }

        })
    },     

    mounted () { // # Window onload eq

        console.log("Step4 mounted!");

        this.initDividers();
    }

}

</script>
