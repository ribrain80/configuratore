<template>
    
    <!-- Container -->
    <div class="row" id="step4">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2>{{  "step4.title" | translate }}</h2>
        </div>
        
        <!-- Canvas container -->
        <div class="col-lg-6 dragdrop-area">

            <div class="row">
                <div class="col-lg-12">2d Drag & Drop</div>
            </div>
            
            <div class="row">

                <div class="col-lg-12" v-if="$store.state.has_bridge">
                    Ci sono {{ $store.state.bridges_selected.length }} ponti<br />
                    L'orientamento del ponte è: {{ $store.state.bridge_orientation }}<br />
                    La larghezza reale disponibile è {{ $store.state.dimensions.width + $store.state.dimensions.delta_width }}<br />
                    La lunghezza reale disponibile è {{ $store.state.dimensions.length + $store.state.dimensions.delta_length }}<br />
                    <button @click="addBridge()">Aggiungi un altro ponte ( stesso orientamento )</button>
                    <button @click="removeBridge()">Rimuovi un ponte</button>
                    <button @click="clearBridges()">Rimuovi tutti i ponti ( ! )</button>
                </div>

                <div class="col-lg-12" v-else>
                    Non ci sono ponti
                    La larghezza reale disponibile è {{ $store.state.dimensions.width + $store.state.dimensions.delta_width }}<br />
                    La lunghezza reale disponibile è {{ $store.state.dimensions.length + $store.state.dimensions.delta_length }}                
                </div>
            </div>

        </div>

        <!-- Canvas container -->
        <div class="col-lg-6 dragdrop-area">
            3D Model
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
                                    <div class="media-left" style="width: 20%">
                                            <img class="media-object img-thumbnail" :src="divider.image" style="height:100px ">
                                    </div>
                                    <div class="media-body" :data-x="divider.width" :data-y="divider.length" :data-z="divider.depth" :data-orientation="H" @click="pushDivider( divider )" :data-id="divider.id" style="width: 80%">
                                        <h4 class="media-heading">{{divider.description}}</h4>
                                        <table border="0" calss="table" width="100%">
                                            <tr>
                                                <td><b>Color:</b></td>
                                                <td>{{divider.color}}</td>
                                                <td><b>Texture:</b></td>
                                                <td>{{divider.texture}}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Border:</b></td>
                                                <td>{{divider.border}}</td>
                                                <td><b>Dimension:</b></td>
                                                <td>({{divider.width}} x {{divider.length}})</td>
                                            </tr>
                                        </table>

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

        addBridge: function() {
            this.$store.commit( "manageBridge", this.$store.state.bridges_selected[ 0 ] );
        },

        removeBridge: function() {
            if( this.$store.state.bridges_selected.length > 1 ) {
                this.$store.state.bridges_selected.pop();
            } else {
                this.clearBridges();
            }
            
        },

        clearBridges: function() {
            this.$store.commit( "clearAllBridgeData" );
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
