<template>
    
    <!-- Container -->
    <div class="row" id="step4">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2>{{  "step4.title" | translate }}</h2>
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
                                <div class="media" style="width: 100%">
                                    <div class="media-left" style="width: 40%">
                                            <img class="media-object" :src="divider.image" style="margin-left: auto;height:100px ">
                                    </div>
                                    <div class="media-body" :data-x="divider.width" :data-y="divider.length" :data-z="divider.depth" :data-orientation="H" @click="pushDivider( divider )" :data-id="divider.id" style="width: 60%">
                                        <h4 class="media-heading">{{divider.description}}</h4>
                                        <b>Color:</b> {{divider.color}} <br>
                                        <b>Border:</b> {{divider.border}} <br>
                                        <b>Texture:</b> {{divider.texture}} <br>
                                        <b>Dimension:</b> ({{divider.width}} x {{divider.length}})
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
            <button class="btn btn-danger inpagenav" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
            <router-link to="/split/stepponte" tag="button">{{ 'back' | translate }}</router-link>
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
        }
    },

    methods: {

        /**
         * [initDividers description]
         * @return {[type]} [description]
         */
        initDividers: function () {

            // # Scope fix
            var self = this;

            // # ajax call
            var jqxhr = $.getJSON( '/split/dividers' );

            // # Success
            jqxhr.done( function( response ) {
               self.dividers = response;
            });

            // # Fail
            jqxhr.fail(function() {
                self.$router.push({ path: '/split/500' });
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

        })
    },     

    mounted () { // # Window onload eq

        console.log("Step4 mounted!");

        this.initDividers();
    }

}

</script>
