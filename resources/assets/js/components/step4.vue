<template>

<div class="container-fluid">

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
                <div class="modal-body">{{ "step5.resetadvice" | translate }}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-back" data-dismiss="modal">{{ $t( 'cancel' ) }}</button>
                    <button type="button" class="btn btn-danger" @click="back2Bridge()">{{ $t( "dont-mind-go" ) }}</button>
                </div>
            </div>
        </div>
    </div>


    <!-- User proceed advice Modal -->
    <div class="modal fade" id="proceed-advice-modal" tabindex="-1" role="dialog" aria-labelledby="">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">{{ $t( 'advice' ) }}</h4>
                </div>
                <div class="modal-body" v-html="$t( 'step4.proceed-with-caution' )"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-back" data-dismiss="modal">{{ $t( 'cancel' ) }}</button>
                    <button type="button" class="btn btn-danger" @click="proceed2Five()" data-dismiss="modal">{{ $t( "dont-mind-go" ) }}</button>
                </div>
            </div>
        </div>
    </div>    
    
    <!-- Divider deletion Modal -->
    <div class="modal fade" id="deletion-alert-modal" tabindex="-1" role="dialog" aria-labelledby="">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">{{ $t( 'attenzione' ) }}</h4>
                </div>
                <div class="modal-body" id="deletion-alert-message">{{ $t( "step4.deletion-advice" ) }}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-back" data-dismiss="modal">{{ $t( "cancel" ) }}</button>
                    <button type="button" class="btn btn-danger" @click="deleteDivider()" v-html="allselected ? $t( 'step4.deletion-message-multi' ) : $t( 'step4.deletion-message-single' )"></button>
                </div>
            </div>
        </div>
    </div>
    
    <div id="step4-content" class="content-flex content-flex-scrollable content-flex-padding">

        <!-- Select All - trash bin row -->
        <div class="row top2">
            <div class="col-lg-5 col-md-5 col-sm-5 pull-left" >
                <button class="btn btn-danger btn-danger-small-text" @click="selectAll()" v-html="allselected ? $t( 'step4.deselect_all' ) : $t( 'step4.select_all')">{{ 'step4.select_all' | translate }}</button>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 container-garbage">
                <img src="/images/others/garbage.png"
                     style="cursor:pointer;"
                     @click="alertDividerDeletion()"
                     v-show="allselected || $store.state.objectWorkingOn.type=='divider'"
                />
            </div>

            <div class="col-lg-2 col-md-5 col-sm-5 container-button-pdf-help pull-right">
                <a class="btn btn-danger pdf-help" target="_blank" href="/pdf/PDF_istruzioni_v01.pdf">Tutorial pdf</a>
            </div>
        </div>

        <!-- Center content -->
        <div class="row top1">
            <div class="col-sm-6 col-md-6 col-lg-6">
                <div class="row top">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="dragdrop-area center-block" id="canvas-container">
                            <canvas id="canvas" class="center-block"></canvas>
                        </div>
                    </div>
                </div>
                <div class="row top1">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div v-if="$store.state.has_bridge">
                            
                            <div class="col-lg-10 col-lg-offset-1">

                                <!-- Bridges -->
                                <div :class="['col-lg-5', 'bridge_representation', $store.state.objectWorkingOn.type == 'bridge' ? 'edge_selected' : '']" @click="selectBridge( $event );"></div>
                                <div class="col-lg-2 bridge-counter" style="line-height: 30px;">N° {{ $store.state.bridges_selected.length }}</div>
                                <div class="col-lg-5">

                                    <div class="pull-left pointer marginR2">
                                        <img src="/images/others/step-4/minus.png" width="23" height="23" class="" v-show="$store.state.bridges_selected.length" @click="removeBridge()"/>
                                    </div>

                                    <div class="pull-left pointer">
                                        <img src="/images/others/step-4/plus.png" width="23" height="23" class="" v-show="canAddBridges" @click="addBridge()"/>
                                    </div>

                                </div>
                                <div class="col-lg-12 no-padding-left">
                                    <span class="help-block">
                                        {{ $t( "stepponte.bridge_elem_label") }} {{ $store.state.bridge_orientation | translate }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6">
                <step4_3d></step4_3d>
            </div>
        </div>

        <!-- tabs row -->
        <div class="row top1">
            <!-- Tabs: dividers and colors -->
            <div class="col-lg-12 col-md-12 col-sm-12">

                <!-- Tab title ( Nav ) -->
                <ul class="nav nav-tabs" role="tablist" id="tab-container">
                    <li :class="{active: !index}" role="presentation" v-for="(cat,index) in availableDividerCategories">
                        <a data-toggle="tab" role="tab" :href="genHref(cat)">{{ $t('step4.containers') }} H {{ parseFloat( cat / 10 ).toFixed( 1 ) }} mm</a>
                    </li>
                    <li role="presentation" class="pull-right"><a data-toggle="tab" role="tab" href="#dividers-tab">{{ $t( "step4.dividers_textures") }}</a></li>
                    <li role="presentation" class="pull-right"><a data-toggle="tab" role="tab" href="#bridges-tab" v-if="$store.state.has_bridge">{{ $t( "step4.bridges_textures") }}</a></li>
                    <li role="presentation" class="pull-right"><a data-toggle="tab" role="tab" href="#edges-tab">{{ $t( "step4.drawer_textures") }}</a></li>
                </ul>

                <!-- Tab contents -->
                <div class="tab-content">

                    <!-- Dividers by cat -->
                    <div role="tabpanel" :class="{active: !index}" :id="'elem'+cat" class="tab-pane fade in" v-for="(cat,index) in availableDividerCategories">

                        <div class="row" style="margin-top: 22px">

                            <div class="col-lg-3 col-md-3 col-sm-4"  v-for="(divider,dimension) in getDividerByCat(cat)">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        {{ dimension }}
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12 center-block imgcont">
                                                <img :src="divider.image3d" class="img center-block img-responsive img-thumbnail" />
                                            </div>

                                        </div>
                                        <div class="row top2">
                                        
                                            <div class="col-lg-4 col-md-4 pull-left">
                                                <div class="top1 dragable-img-container">
                                                    <!-- Remove the inline style and use something more responsive -->
                                                    <img draggable="true"
                                                         class="img canBeDragged center-block img-responsive "
                                                         :src="divider.imageH"
                                                         :data-defaultdivider= "getDefaultDividerImg(divider,cat,dimension,true)"
                                                         :data-width  = "divider.width"
                                                         :data-height = "divider.length"
                                                         :data-sku = "divider.sku"
                                                         :data-rotate = "90"
                                                         :data-key = "dimension"
                                                         :data-cat = "cat"
                                                         data-type = "divider"
                                                         data-orientation = "H"
                                                         v-show="enoughSpace(divider.width, divider.length )"
                                                         :width="divider.width" 
                                                         :height="divider.length">
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4 pull-right">
                                                <div class="top1 dragable-img-container">
                                                    <!-- Remove the inline style and use something more responsive -->
                                                    <img draggable="true"
                                                         class="img canBeDragged center-block img-responsive"
                                                         :src="divider.imageV"
                                                         :data-defaultdivider= "getDefaultDividerImg(divider,cat,dimension,false)"
                                                         :data-width  = "divider.length"
                                                         :data-height = "divider.width"
                                                         :data-sku = "divider.sku"
                                                         :data-rotate = "0"
                                                         :data-key = "dimension"
                                                         :data-cat = "cat"
                                                         data-type = "divider"
                                                         data-orientation = "V"
                                                         v-show="enoughSpace(divider.width, divider.length )" 
                                                         :width="divider.width" 
                                                         :height="divider.length"
                                                    >
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>


                    <div role="tabpanel" id="dividers-tab"  class="tab-pane fade in">
                        <div class="row top1" v-if="$store.state.objectWorkingOn.type=='divider'">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <h3 class="divider_tab_group_level_1">{{ $t('Legno') }}</h3>
                                        <div class="row divider_tab_group_level_2">
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <h4>Fullcolor {{ $t( 'zh.fullcolor' ) }}</h4>
                                                <div class="col-lg-4 col-md-4 col-sm-4" v-for="variant in $store.getters.getDividerVariantsLegnoFull" v-if="$store.state.objectWorkingOn.type=='divider'">
                                                    <figure>
                                                        <a class="lens-icon bridges-info" @click="showTextureInfo( $event )">&nbsp;</a>
                                                        <img :src="variant.textureImg"
                                                             :data-img="($store.state.objectWorkingOn.obj.orientation=='H')?variant.textureH:variant.textureV"
                                                             class="img center-block img-responsive img-thumbnail"
                                                             @click="_updateDividerSku( $event );"
                                                             style="width: 120px;height: 80px"
                                                             :data-sku="variant.sku"
                                                        >
                                                        <figcaption>{{ $t(variant.color) }}</figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <h3 class="divider_tab_group_level_1">{{ $t( 'Spazzolata (inox)' ) }}</h3>
                                        <div class="row divider_tab_group_level_2">
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <h4>Fullcolor {{ $t( 'zh.fullcolor' ) }}</h4>
                                                <div class="col-lg-4 col-md-4 col-sm-4" v-for="variant in $store.getters.getDividerVariantsInoxFull" v-if="$store.state.objectWorkingOn.type=='divider'">
                                                    <figure>
                                                        <a class="lens-icon bridges-info" @click="showTextureInfo( $event )">&nbsp;</a>
                                                        <img :src="variant.textureImg"
                                                             :data-img="($store.state.objectWorkingOn.obj.orientation=='H')?variant.textureH:variant.textureV"
                                                             class="img center-block img-responsive img-thumbnail"
                                                             @click="_updateDividerSku( $event );"
                                                             style="width: 120px;height: 80px"
                                                             :data-sku="variant.sku"
                                                        >
                                                        <figcaption>{{ $t(variant.color) }}</figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                        <div class="row top1" v-else="$store.state.objectWorkingOn.type!='divider'">
                            <div class="col-lg-12 col-md-12 col-sm-12 noside-chosen">
                                {{ $t( "step4.nodividerchosen" ) }}
                            </div>
                        </div>
                    </div>

                    <div role="tabpanel" id="bridges-tab"  v-if="$store.state.has_bridge"  class="tab-pane fade in">
                        <div class="row top1">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="col-lg-12 col-md-12">
                                    <h3>{{ $t("step4.bridges_textures") }}</h3>
                                </div>


                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <h3> {{ $t('Legno') }}</h3>
                                    <div class="row" style="border-right: 1px solid #dddddd;">
                                        <h4>Fullcolor {{ $t( 'zh.fullcolor' ) }}</h4>
                                        <div class="col-lg-4 col-md-4 col-sm-4" v-for="variant in $store.getters.getBridgesVariantsLegnoFull" >
                                            <figure style="margin: 0 auto !important">
                                                <a class="lens-icon bridges-info" @click="showTextureInfo( $event )">&nbsp;</a>
                                                <img :src="variant.textureImg"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateBridges( $event );"
                                                     style="width: 120px;height: 80px"
                                                     :data-sku="variant.sku"
                                                >
                                                <figcaption>{{ $t(variant.color) }}</figcaption>
                                            </figure>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <h3> {{ $t( 'Spazzolata (inox)' ) }}</h3>
                                    <div class="row">
                                        <h4>Fullcolor {{ $t( 'zh.fullcolor' ) }}</h4>
                                        <div class="col-lg-4 col-md-4 col-sm-4" v-for="variant in $store.getters.getBridgesVariantsInoxFull" >
                                            <figure style="margin: 0 auto !important">
                                                <a class="lens-icon bridges-info" @click="showTextureInfo( $event )">&nbsp;</a>
                                                <img :src="variant.textureImg"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateBridges( $event );"
                                                     style="width: 120px;height: 80px"
                                                     :data-sku="variant.sku"
                                                >
                                                <figcaption>{{ $t(variant.color) }}</figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <h3 style="margin-top: 8%">{{ $t( 'step4.supporti.label' ) }}</h3>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2"></div>
                                <div class="col-lg-2 col-md-2 col-sm-2" v-for="variant in $store.getters.getSupportsVariants">
                                    <figure style="margin: 0 auto !important">
                                        <a class="lens-icon bridges-info" @click="showTextureInfo( $event )">&nbsp;</a>
                                        <img :src="variant.texture"
                                             class="img center-block img-responsive img-thumbnail"
                                             :class="variant.selected?'support_selected':''"
                                             @click="_updateSupports( $event ); "
                                             style="width: 120px;height: 80px"
                                             :data-sku="variant.sku"
                                        >
                                        <figcaption>{{ $t(variant.color) }}</figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" id="edges-tab"  class="tab-pane fade in">

                        <div class="col-lg-12 col-md-12 col-sm-12 top1">

                            <div class="col-lg-4">
                                
                                    <!-- Egdes -->
                                <div :class="['edge', 'edge_front', 'text-center', 'w-100', ($store.state.objectWorkingOn.id=='front') ? 'edge_selected' : '' ]" id="front" @click='selectBorder( $event );' >
                                    {{ $t( "step4.edges_top" ) }}
                                </div>
                                <div :class="['edge', 'edge_left', ($store.state.objectWorkingOn.id=='left') ? 'edge_selected' : '' ]" id="left" @click='selectBorder( $event );' style="min-height: 100px"></div>
                                
                                <div id="background" @click='selectBorder( $event );' :class="['edge', 'text-center', ($store.state.objectWorkingOn.id=='background') ? 'edge_selected' : '' ]">
                                    {{ $t( "step4.edges_floor" ) }}
                                </div>

                                <div :class="['edge', 'edge_right', ($store.state.objectWorkingOn.id=='right') ? 'edge_selected' : '' ]" id="right" @click='selectBorder( $event );' style="min-height: 100px"></div>

                                <div :class="['edge', 'edge_back', 'text-center', 'w-100', ($store.state.objectWorkingOn.id=='back') ? 'edge_selected' : '' ]" id="back" @click='selectBorder( $event );' >
                                    {{ $t( "step4.edges_bottom" ) }}
                                </div>
                                
                            </div>
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <div class="col-lg-2 col-md-2 col-sm-2" v-for="variant in $store.getters.getBorderVariants" v-if="$store.state.objectWorkingOn.type=='border'">
                                    <figure>
                                        <a class="lens-icon bridges-info" @click="showTextureInfo( $event )">&nbsp;</a>
                                        <img :src="variant.textureImg"
                                             class="img center-block img-responsive img-thumbnail"
                                             @click="_updateBorder( $event );"
                                             style="width: 120px;height: 80px"
                                             :data-sku="variant.textureId"
                                        >
                                        <figcaption>{{ $t(variant.textureName) }}</figcaption>
                                    </figure>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 noside-chosen" v-if="$store.state.objectWorkingOn.type!='border'">
                                    {{ $t( "step4.choose_a_side" ) }}
                                </div>
                            </div>
                        </div>

                    </div>

                </div> <!-- END tab content -->

            </div>
        </div>
    </div>
    
    <!-- Buttons row -->
    <div class="row actions-toolbar">

        <div class="col-lg-2 col-md-2 pull-left">
            <button to="/split/stepponte"  @click="backAdvice()" class="btn btn-danger btn-back">{{ 'back' | translate }}</button>
        </div>

        <div class="col-lg-2 col-md-2 pull-right">
            <button class="btn btn-danger btn-block" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
        </div>



    </div>

</div>
</template>

<script>

import Divider from '../entity/divider';



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
             * become true after the first vertical alert
             */
            verticalAlertShowed: false,

            /**
             * Error modal selector caching
             * @type {[type]}
             */
            error_modal: $( "#error-modal" ),

            /**
             * Fabric Canvas object
             * @type {Object}
             */
            canvas: {},

            /**
             * Dividers list ( from DB )
             * @type {Array}
             */
            images: [],

            /**
             * Currently dragged divider
             * @type {Object}
             */
            draggingDivider: {},

            /**
             * Base snap threshold
             * @type {Number}
             */
            snap: 9,

            /**
             * Canvas width
             * @type {Number}
             */
            canvasWidth: 0,

            /**
             * Canvas Height
             * @type {Number}
             */
            canvasHeight: 0,

            /**
             * Computed dimensions ratio
             * @type {Object}
             */
            config: {
                
                ratio: 1,

                // # Lightgallery common settings
                lightgalleryOptions: {

                    download: false,
                    thumbnail: false,
                    dynamic: true,
                    counter: false,
                    getCaptionFromTitleOrAlt: true
                }
            },

            /**
             * Currently selected item
             * @type {Object}
             */
            selectedItem: {},

            /**
             * bridge hex color
             * @type {String}
             */
            bridge_hex: '',

            /**
             * All dividers selected flag
             * @type {Boolean}
             */
            allselected: false
        }
    },

    /**
     * Computed properties and data
     * @type {Object}
     */
    computed: {

        /**
         * Check if the selected object ( if any ) is a divider
         * @return {Boolean}
         */
        isDividerSelected: function() {

            if( null != this.$store.state.objectWorkingOn || undefined == this.$store.state.objectWorkingOn ) {
                return false;
            }

            if( this.$store.state.objectWorkingOn.type != "divider" ) {
                return false;
            }

            return true;
        },


        /**
         * Returns available dividers category based on shpulder height set
         * @return {Array}
         */
        availableDividerCategories: function () {

            // # Get max value - value is in mm, category is in decimillimeters
            let max = parseFloat( this.$store.state.dimensions.shoulder_height ) * 10;

            // # Filter array
            return this.$store.state.dividerTypes.dividersCategories.filter( function ( category ) {
                    return max >= parseInt(category);
                }
            );
        },

        /**
         * Checks if the user can add more bridges.
         * @return {Boolean}
         */
        canAddBridges: function () {

            let availableSpace = ( this.$store.state.bridge_orientation == 'H' ) ? this.real_height : this.real_width;
            let busySpace = this.$store.state.bridges_selected.length * this.tighterBridgeWidth;

            return availableSpace >= ( busySpace + this.tighterBridgeWidth )
        },

        /**
         * Returns the tighter bridge width
         * @return {Number}
         */
        tighterBridgeWidth: function () {
            return 107;
        },

        /**
         * Actual area covered by bridges
         * @return {Number} [description]
         */
        bridgesArea: function () {
            return this.$store.state.bridges_selected.reduce( function ( accumulatore, elem ) {
                return accumulatore + elem.width;
            }, 0 );
        },

        /**
         * Actual available width ( supports computed )
         * @return {number}
         */
        real_width: function () {
            return parseFloat( this.$store.state.dimensions.width ) + parseInt( this.$store.state.dimensions.delta_width );
        },

        /**
         * Actual available length ( supports computed )
         * @return {number}
         */
        real_height: function() {
            return parseFloat( this.$store.state.dimensions.length ) + parseInt( this.$store.state.dimensions.delta_length );
        }
    },

    /**
     * Instance Methods
     * @type {Object}
     */
    methods: {


        /**
         * Check if the divider is too high
         */
        verticalAlertChecker: function (divider) {
            let out = false;
            if (this.$store.state.bridge_supportID) {
                let supportH = (this.$store.state.bridge_supportID==1)?45.5:90;
                let dividerH = parseInt(divider.category)/10;
                out = dividerH > supportH;
               /* let _tooHDivider = state.dividers_selected.filter((cur)=>{
                    let curDividerH = parseFloat( cur.category ) / 10;
                    return supportH < curDividerH;
                });
                out = (_tooHDivider.length>0);*/

            }

            return out;
        },

        showTextureInfo: function( event ) {

            let target = $( event.target );

            /*try {
                target.data( "lightGallery" ).destroy( true );
                // $( this ).unbind( "click" );
            } catch( e ) {
                // Do nothing
            }*/

            // # Get related image element
            let related_image = target.next();

            // # General settings + image src
            let bridgesGalleryOptions = this.config.lightgalleryOptions;
            bridgesGalleryOptions.dynamicEl = [ { 
                src: related_image.attr( "src" )
            } ];

            // # Init
            target.lightGallery( bridgesGalleryOptions ) ;
        },


        /**
         *  Return the first item in list texture depending on parameters
         */
        getDefaultDividerImg: function( divider, cat, dimension, horizontal ) {
            let _dividerCategoryObj = this.$store.state.dividerTypes.dividers[ cat ];
            let _dividerDimension = _dividerCategoryObj[ dimension ];
            let _obj = _dividerDimension.items[ 0 ];
            return ( horizontal ) ? _obj.textureH : _obj.textureV;
        },

        /**
         * [touchHandler description]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        touchHandler: function ( event ) {

            let touch = event.changedTouches[ 0 ];

            let simulatedEvent = document.createEvent( "MouseEvent" );
            simulatedEvent.initMouseEvent({
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }[ event.type ], true, true, window, 1,
                touch.screenX, touch.screenY,
                touch.clientX, touch.clientY, false,
                false, false, false, 0, null);

            touch.target.dispatchEvent( simulatedEvent );

            if ( event.target.id == 'draggable_item' ) {
                event.preventDefault();
            }
        },

        /**
         * [initCanvas description]
         * @return {[type]} [description]
         */
        initCanvas: function() {

            // # Cache selector
            let canvas_container = $( "#canvas-container" );

            // # Draggable images selection
            this.images = document.querySelectorAll( ".canBeDragged" );

            // # Add drag handler to all the images
            [].forEach.call( this.images, ( img ) => {
                img.addEventListener( 'dragstart', this.handleDragStart, false);
                img.addEventListener( 'touchstart', this.handleDragStart, false);
                img.addEventListener( 'dragend', this.handleDragEnd, false);
                img.addEventListener( 'touchend', this.handleDragEnd, false);
            });        

            let original_container_width = Math.floor( canvas_container.width() );
            console.log( "Canvas container Width: ", original_container_width );
            console.log( "canvas_container.width() * 0.8: ", original_container_width * 0.8 );
            console.log( "canvas_container.width() FLOOR ", Math.floor( canvas_container.width() * 0.8 ) );
            
            // # Compute available width
            this.canvasWidth = Math.floor( original_container_width * 0.8 );
            console.log( "Canvas width: " + this.canvasWidth );

            // # Compute ratio
            this.ratioComputer();

            // # Compute height based on ration computed
            this.canvasHeight = parseInt( this.real_height * this.config.ratio );
            console.log( "Canvas height: " + this.canvasHeight );

            // # Set DOM dimensions
            canvas_container.width( this.canvasWidth ).height( this.canvasHeight );

            // # CHECK ME
            $( "#step4_3d_container" ).css( "min-height", "400px" );

            // # 3D container should have the same height as the 2D one
            $( "#step4_3d_container" ).height( this.canvasHeight );

            // # UPDATE size
            this.$store.state.renderer.updateSize();
            this.$store.state.camera.updateSize(this.$store.state.renderer.threeRenderer);

            // # Initialize canvas
            this.canvas = new fabric.Canvas( 'canvas', { width: this.canvasWidth, height: this.canvasHeight, renderOnAddRemove: false } );

            // # No selection on this canvas
            this.canvas.selection = false;

            /**
             * Handle object moving inside the canvas
             * @param  {[type]} ['object:moving'] [description]
             * @param  {[type]} (options          [description]
             * @return {[type]}                   [description]
             */
            this.canvas.on( ['object:moving'],  ( options ) => {
                this.handleMoving( options );
            });

            console.log( "touch supported: " +  fabric.isTouchSupported );

            // # Last chance 
            this.canvas.on( "mouse:up", () => {
                this.finalCollisionDetectionManagement();
            });

            /**
             * Handle Object added inside the canvas
             * @param  {[type]} ['object:added'] [description]
             * @param  {[type]} (options         [description]
             * @return {[type]}                  [description]
             */
            this.canvas.on( ['object:added'], (options) => {
                this.handleMoving( options );
            });  

            /**
             * Canvas on click listener
             * @param  {[type]} this.canvas.upperCanvasEl [description]
             * @param  {[type]} 'click'                   [description]
             * @param  {[type]} (                         e             [description]
             * @return {[type]}                           [description]
             */
            fabric.util.addListener( this.canvas.upperCanvasEl, 'click', ( e ) => {

                try {   

                    // # Active object caching
                    let activeObj = this.canvas.getActiveObject();

                    // # Avoid null pbjects
                    if( null == activeObj ) {
                        return;
                    }

                    console.log( "Active object after click", activeObj );
                    console.log( "Active object type", activeObj.get( 'type' ) );

                    // # Avoid canvas trying to remove itself
                    if( activeObj.get( "type" ) != "divider" ) {
                        return;
                    }

                    // # Set this object as the selected one
                    activeObj.trigger( "selected" );

                    $( '#tab-container a[href="#dividers-tab"]' ).tab( 'show' );

                    // # Cache active object ID
                    let id = activeObj.get( "id" );

                    // # Updating this.selectedItem and $store.objectWorkingOn
                    // TODO: selectedItem deve diventare una property di $store.objectWorkingOn
                    //this.selectedItem = this.canvas.getActiveObject();
                    this.$store.commit( "setobjectWorkingOn", { type: "divider", id: id, obj: activeObj } );

                } catch( ignoreMe ) {

                    // # Log error and ignore it
                    console.log( ignoreMe );
                } finally {

                    // # Stop event propagation and prevent default
                    // # mandatory cause otherwise the event is passed to the canvas itself
                    e.preventDefault();
                    e.stopPropagation();

                    // # Render all
                    this.canvas.renderAll();

                    // # return false is also needed
                    return false;
                }

            });


            /**
             * Canvas click listener remover
             * @param  {Object} e 
             */
            fabric.util.removeListener( this.canvas.upperCanvasEl, 'click', function( e ) {} );    

            // # Get the container element
            let canvasContainer = document.getElementById( 'canvas-container' );

            // # Scope fix
            let self = this;

            // # Container listeners
            canvasContainer.addEventListener( 'dragenter', self.handleDragEnter, false );
            canvasContainer.addEventListener( 'dragover',  self.handleDragOver, false );
            canvasContainer.addEventListener( 'dragleave', self.handleDragLeave, false );
            canvasContainer.addEventListener( 'drop',      self.handleDrop, false ); 

            // # Force rendering
            this.canvas.renderAll();

            // # Dispatch
            this.$store.dispatch( 'genDrawer', this.$store.state.drawertype );
        },

        /**
         * Computes the available canvas area ( area free from dividers )
         * 
         * @return {Number}
         */
        availableSpace: function() {

            // # Stay solid and evaluate the nearest ( floor ) integer
            let initial_area = Math.floor( this.real_height * this.real_width );
            return this.$store.state.dividers_selected.reduce( ( occupied_area, cur ) => {
                return initial_area -= cur.area;
            }, initial_area);
        },

        /**
         * Tells if there is enough space for the divider to be placed
         * 
         * @param  {Number} divider_width 
         * @param  {Number} divider_length
         * @return {Number}
         */
        enoughSpace: function( divider_width, divider_length ) {
            var avs = this.availableSpace();
            return avs > parseFloat( divider_width * divider_length );
        },

        /**
         * Shows an alert to the user before a divider deletion
         * @return {null}
         */
        alertDividerDeletion: function() {

            if( this.allselected ) {
                console.log( "ALL");
                $( "#deletion-alert-message" ).text( Vue.i18n.translate( "step4.delete_all_advice" ) );
                $( "#deletion-alert-modal" ).modal();
                return;
            }

            // # Cache the active Object
            var activeObj = this.canvas.getActiveObject();
            if( null != activeObj && activeObj.get( 'type' ) == "divider" ) {
                console.log( "ONE");
                $( "#deletion-alert-message" ).text( Vue.i18n.translate( "step4.delete_single_advice" ) );
                $( "#deletion-alert-modal" ).modal();
                return;
            }

            return;

        },


        /**
         * Select all dividers logic
         * @return {void}
         */
        deselectAll:function() {

            console.log( "deselecting  all dividers" );

            // # Retrieve canvas objs
            let objs = this.canvas.getObjects();
            
            // # Loop through the canvas objects
            objs.map( ( o )  => {

                o.set({
                    opacity: 1,
                    backgroundColor : "#ededed",
                    active: false
                }); 

                console.log( "dirtystate" );
                console.log( o.dirtystate );

                if( o.dirtystate ) {
                    o.set({
                        opacity: .5,
                        backgroundColor : "#ff0000"
                    });
                }

            }); 

            // # Discard active one
            this.canvas.discardActiveObject();

            // # Refresh
            this.canvas.renderAll();
            this.allselected = false;           
        },

        /**
         * Select all dividers logic
         * @return {void}
         */
        selectAll: function() {

            // # Retrieve canvas objs
            let objs = this.canvas.getObjects();

            if( objs.length == 0 ) {
                return;
            }
            
            // # Loop through the canvas objects
            //objs.map( ( o )  => {

            switch( this.allselected ) {

                case true:
                    // # all sellected => deselect
                    this.deselectAll();                         
                break;

                case false:

                    // # Loop and select each one
                    objs.map( ( o )  => {
                        o.set({
                            opacity: .5,
                            backgroundColor : "#ffcc00",
                            active: true
                        });  
                    });  

                    // # Set flag
                    this.allselected = true;  

                    // # Refresh canvas
                    this.canvas.renderAll();                   
                break;
            }
        },

        /**
         * Divider deletion logic
         * @return {[type]} [description]
         */
        deleteDivider: function() {

            console.log( "allselected: " + this.allselected );

            switch( this.allselected ) {
                
                case true:

                    // # All selected to be removed, clean up the canvas
                    this.canvas.discardActiveObject();
                    this.canvas.clear();
                    this.canvas.renderAll();
                    this.allselected = false;

                    // # Clean up the store variable
                    this.$store.dispatch ( "remove3dAllDividers" );

                break;

                case false:

                    // # Cache active object
                    var activeObj = this.canvas.getActiveObject();

                    // # Avoid null pbjects
                    if( null == activeObj || undefined == activeObj ) {
                        return;
                    }

                    // # Avoid canvas trying to remove itself
                    if( activeObj.get( 'type' ) != "divider" ) {
                        return;
                    }

                    // # Cache active object ID
                    var id = activeObj.get( 'id' );

                    // # Remove ID from selected dividers list
                    this.$store.dispatch( "remove3dDivider", id );

                    // # Clean up pointers
                    this.canvas.discardActiveObject();

                    // # Actually remove object from canvas
                    this.canvas.remove( activeObj );

                    // # Refresh canvas
                    this.canvas.renderAll(); 
                                   
                break;
            }

            // # Related events
            $( "#deletion-alert-modal" ).modal( 'hide' );
            $( '#tab-container a:first' ).tab( 'show' );

        },

        /**
         * This is the last place to manage the dividers collisions
         * @return {void}
         */
        finalCollisionDetectionManagement: function () {

            // # Cache active object
            let activeObj = this.canvas.getActiveObject();
                
            // # No selected Item or No type defined, return
            if( null == activeObj || undefined == activeObj.type ) {
                return;
            }

            // # Only for dividers
            if( activeObj.type == "divider" ) {

                // # Reset standard stroke ( some object may be stuck in half opacity )
                // # this is a "runtime" fix
                /*activeObj.setStrokeWidth( 2 );
                activeObj.setStroke( "#222" );*/

                activeObj.set({
                    opacity: 1,
                    backgroundColor : "#ededed",
                    active: false
                });  

                // # Loop through canvas objects
                this.canvas.forEachObject( ( obj ) => {

                    // # Set element Coords
                    activeObj.setCoords();

                    // # Do nothing if the object checked against is itself
                    if ( obj === activeObj ) {
                        console.log( "same" );
                        return;
                    }

                    // # Check type
                    if( undefined == obj.type || obj.type != "divider" ) {
                        console.log( "no type or wrong type" );
                        return;
                    }

                    // # Log intersection
                    console.log( "intersect " + activeObj.intersectsWithObject(obj) );

                    // # If objects intersect
                    if ( activeObj.intersectsWithObject( obj ) ) { 

                        // # Intersections init
                        let intersectLeft = null, intersectTop = null, intersectWidth = null;
                        let intersectHeight = null, intersectSize = null;
                        let targetLeft = activeObj.getLeft();
                        let targetRight = targetLeft + activeObj.getWidth();
                        let targetTop = activeObj.getTop();
                        let targetBottom = targetTop + activeObj.getHeight();
                        let objectLeft = obj.getLeft();
                        let objectRight = objectLeft + obj.getWidth();
                        let objectTop = obj.getTop();
                        let objectBottom = objectTop + obj.getHeight();            

                        // Find intersect information for X axis
                        if( targetLeft >= objectLeft && targetLeft <= objectRight ) {
                            intersectLeft = targetLeft;
                            intersectWidth = obj.getWidth() - ( intersectLeft - objectLeft );

                        } else if( objectLeft >= targetLeft && objectLeft <= targetRight ) {
                            intersectLeft = objectLeft;
                            intersectWidth = activeObj.getWidth() - ( intersectLeft - targetLeft );
                        }

                        // # Find intersect information for Y axis
                        if( targetTop >= objectTop && targetTop <= objectBottom ) {
                            intersectTop = targetTop;
                            intersectHeight = obj.getHeight() - ( intersectTop - objectTop );

                        } else if( objectTop >= targetTop && objectTop <= targetBottom ) {
                            intersectTop = objectTop;
                            intersectHeight = activeObj.getHeight() - ( intersectTop - targetTop );
                        }  
                  
                        // # Find intersect size (this will be 0 if objects are touching but not overlapping)
                        if( intersectWidth > 0 && intersectHeight >  0 ) {
                            console.log( "intersect area!" );
                            intersectSize = intersectWidth * intersectHeight;
                        }                                    

                        if( intersectSize != null ) {
                            console.log( "Intersect size " + intersectSize );

                            /*
                            activeObj.setStroke( "#ff0000" );
                            activeObj.setStrokeWidth( 2 );
                            */
                           
                            activeObj.set({
                                opacity: .5,
                                backgroundColor : "#ff0000",
                            }); 

                            activeObj.dirtystate = true;

                            this.canvas.renderAll();
                            return;
                        }

                        // # No collision
                        console.log( "NO COLLISION" );
                        
                        // # Set standard stroke
                        /*
                        activeObj.setStroke( "#222222" );
                        activeObj.setStrokeWidth( 2 );

                        */
                       
                        activeObj.set({
                            opacity: 1,
                            backgroundColor : "#ededed",
                            active: false
                        }); 

                        activeObj.dirtystate = false;
                        this.canvas.renderAll(); 
                    }     
                }); 

                this.canvas.forEachObject( ( obj ) => {

                    // # object is in a clean situation
                    if( !obj.dirtystate ) {
                        return;
                    }

                    // # Starting point
                    let actuallyCollides = false;

                    // # check this object against all the others
                    this.canvas.forEachObject( ( otherObj ) => {

                        // # Same, skip
                        if( obj == otherObj ) {
                            return;
                        }

                        // # Check actual collision state
                        if( obj.intersectsWithObject( otherObj ) ) {

                            // # Actually collides
                            actuallyCollides = true;

                            return;
                        }

                    });

                    if( !actuallyCollides ) {
                        /*
                        obj.setStroke( "#222222" );
                        obj.setStrokeWidth( 2 );
                        */
                        obj.set({
                            opacity: 1,
                            backgroundColor : "#ededed",
                            active: false
                        }); 

                        obj.dirtystate = false;

                        this.canvas.renderAll();                             
                    }
                    
                });              
            }
        },

        /**
         * Computes the correct ratio based on container width
         * manages also long and thin drawers
         * @return {void}
         */
        ratioComputer: function() {

            console.log( "RW:" + this.real_width );
            console.log( "RH:" + this.real_height );

            // # Dimension ratio tells us if we are in the case that height > width
            let dimensions_ratio = parseFloat( this.real_width / this.real_height ).toFixed( 2 );
            console.log( "dimensions_ratio: " + dimensions_ratio );

            // # Container available width
            let available_width = this.canvasWidth;
            console.log( "AW" + available_width );

            // # Ratio computed using max allowed rect width
            this.config.ratio = parseFloat( available_width / this.real_width );
            console.log( "RATIO: " + this.config.ratio );

            // # height > width
            if( dimensions_ratio < 1 ) {

               console.log( "H > W" );
               
               // # Initial height computed based on available width
               let computed_height = parseFloat( this.real_height * this.config.ratio ).toFixed( 2 );
               console.log( "Initial CH: " + computed_height );

               // # let's say that we want to set a threshold
               // # this will prevent the scale change when 
               // # H / W dfference is little
               // # Reduce the computed height to a dimension max = available width 
               // # so that the resulting shape won't be to tall
               while( computed_height >= available_width ) {

                    // # Reduce ratio at each iteration
                    this.config.ratio = parseFloat( ( this.config.ratio / 100 ) * 90 );
                    console.log( "RATIO in iteration: " + this.config.ratio );
                    
                    // # Newly computed canvas dimension are smaller and smaller
                    computed_height  = parseFloat( this.real_height * this.config.ratio ).toFixed( 2 );
                    this.canvasWidth = parseFloat( this.real_width * this.config.ratio ).toFixed( 2 );

                    console.log( "CW Changed in iteration: " +  this.canvasWidth );
                    console.log( "CH Changed in iteration:"  +  computed_height );
               }
            }   

            // # Commit ratio ( useful for 3d )
            this.$store.commit( "setStep42DRatio", this.config.ratio );

            console.log( "Final RATIO: " + this.config.ratio );
        },  

        /**
         * [selectBorder description]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        selectBorder: function( event ) {

            // # deselect All dividers
            this.deselectAll();

            let _selectedBorder = event.target;

            this.$store.commit( 'setobjectWorkingOn', { type:'border', id:_selectedBorder.id,obj:_selectedBorder } );

            console.log( this.$store.state.objectWorkingOn );

            // # Choose related tab
            $( '#tab-container a[href="#colors"]' ).tab( 'show' );
        },  

        /**
         * [selectBridge description]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        selectBridge: function( event ) {

            // # deselect All dividers
            this.deselectAll();

            // this.selectedItem = { type: "bridge", id: this.$store.state.bridges_selected[ 0 ].id };
            this.$store.commit('setobjectWorkingOn',{type:'bridge',id:this.$store.state.bridge_ID,'obj':null});

            // # Choose related tab
            $( '#tab-container a[href="#bridges-tab"]' ).tab( 'show' );
        },

        /**
         * [_updateDividerSku description]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        _updateDividerSku: function ( event ) {

            // # COMMENT THIS
            console.log( event );

            let payload = {
                id: this.$store.state.objectWorkingOn.id,
                sku: event.target.dataset.sku
            };

            console.log( payload );

            let objectWorkingOn = this.$store.state.objectWorkingOn;
            objectWorkingOn.obj.set({
                url: event.target.src
            });

            this.$store.commit( 'setobjectWorkingOn', objectWorkingOn );

            let _texture = event.target.dataset.img;
            var self = this;
            let img = this.$store.state.objectWorkingOn.obj.getElement();
            img.src = event.target.dataset.img;
            img.crossOrigin = "Anonymous";
            img.onload = () => { this.canvas.renderAll(); };


            if ( this.allselected ) {

                // # Change all canvas object texture
                this.canvas.forEachObject( ( obj ) => {

                    let lookin4 = _texture.replace(/^.*[\\\/]/, '');
                    if( undefined == obj.type || obj.type != "divider" ) {
                        return;
                    }

                    let divsByCat = this.$store.state.dividerTypes.dividers[obj.category];
                    let divsBySubCat = divsByCat[obj.subCategory];
                    let _items = divsBySubCat['items'];

                    let _obj = _items.filter( ( cur ) => {
                        let testTexture = cur.baseTexture.replace( /^.*[\\\/]/, '' );
                        //return testTexture;
                        return lookin4 == testTexture;
                    })[ 0 ];


                    if (!_obj) {return;}

                    console.log("INFO OBJ:",_obj,_obj.orrientation);



                    let img = obj.getElement();


                    let textureToApply = (img.src.indexOf("/h/")>0)?_obj.textureH:_obj.textureV;
                    console.log("TEXTURE CHE VOGLIO METTERE:",textureToApply,img);
                    img.src = textureToApply;
                    img.crossOrigin = "Anonymous";

                    img.onload =  () => {
                        this.canvas.renderAll();
                    };

                });

                this.$store.dispatch( "updateAllDividerTexture", event.target.dataset.sku );

            } else {
                this.$store.commit( "updateDividerSku", payload );
                this.$store.dispatch( "update3dDividerTexture", payload );
            }


        },

        /**
         * [_updateBorder description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _updateBorder:function (e) {

            // # COMMENT THIS
            let payload = {
                id:this.$store.state.objectWorkingOn.id,
                image:e.target.src,
                dbId: e.target.dataset.sku  //This is a fake sku => just the db id!!!!
            };

            this.$store.state.objectWorkingOn.obj.style.backgroundImage = "url("+e.target.src+")";
            if (this.$store.state.objectWorkingOn.id=='background') {
                //document.getElementById('canvas-container').style.backgroundImage = "url("+e.target.src+")";
                this.canvas.setBackgroundImage(e.target.src,()=>{

                    this.canvas.backgroundImage.width = this.canvas.getWidth();
                    this.canvas.backgroundImage.height = this.canvas.getHeight();
                    this.canvas.renderAll();
                },{backgroundImageStretch: true});
            }

            this.$store.commit('setDrawerBorder',payload);
            this.$store.dispatch( 'update3dDrawerPartTexture', payload);
        },

        /**
         * [_updateBridges description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _updateBridges: function (e) {

            // # COMMENT THIS
            
            $('.bridge_representation').css('background-image',"url("+e.target.src+")");
            let payload = {
                sku: e.target.dataset.sku,
                img: e.target.src
            }
            this.$store.dispatch('changeBridgeSku',payload);
        },

        /**
         * [_updateSupports description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _updateSupports: function (e) {

            // # COMMENT THIS
            this.$store.dispatch('update3dSupportTexture',e.target.dataset.sku);
        },

        /**
         * [handleMoving description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        handleMoving: function ( options ) {

            // # Set element Coords
            // options.target.setCoords();

            // # Collision mnagement
            this._preventCollision( options );

            // # get the new coords
            let coords = options.target.getCenterPoint();
            let payload = {
                id: options.target.id,
                x: coords.x,
                y: coords.y
            };

            this.$store.commit( 'updateDividerPosition', payload );
            this.$store.dispatch( 'update3dDividerPos', payload );
        },

        _preventCollision: function ( options ) {

            console.log( "get starting point coords" );

            // # Set element Coords
            options.target.setCoords();
            var starting_point = options.target.calcCoords().bl;

            // # lock container
            // # Don't allow objects off the canvas
            
            // # Snap to left
            if( options.target.getLeft() < this.snap ) {
                options.target.setLeft( 0 );
            }

            // # Snap to top
            if( options.target.getTop() < this.snap ) {
                options.target.setTop( 0 );
            }

            // # Snap to right
            if( ( options.target.getWidth() + options.target.getLeft() ) > ( this.canvasWidth - this.snap ) ) {
                options.target.setLeft( this.canvasWidth - options.target.getWidth() - 1 );
            }

            // # Snap to bottom
            if(  ( options.target.getHeight() + options.target.getTop() ) > ( this.canvasHeight - this.snap) ) {
                options.target.setTop( this.canvasHeight - options.target.getHeight());
            }

            // Loop through objects
            this.canvas.forEachObject( ( obj ) => {

                // # Do nothing if the object checked against is itself
                if ( obj === options.target ) return;

                // # Set element Coords
                options.target.setCoords();

                // # This snaps objects to each other horizontally

                // If bottom points are on same Y axis
                if( Math.abs((options.target.getTop() + options.target.getHeight()) - (obj.getTop() + obj.getHeight())) < this.snap ) {
                    // this.snap target BL to object BR
                    if(Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < this.snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }

                    // this.snap target BR to object BL
                    if( Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < this.snap ) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }
                }

                // If top points are on same Y axis
                if( Math.abs(options.target.getTop() - obj.getTop()) < this.snap ) {
                    // this.snap target TL to object TR
                    if( Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < this.snap ) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop());
                    }

                    // this.snap target TR to object TL
                    if( Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < this.snap ) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop());
                    }
                }

                // this.snap objects to each other vertically

                // If right points are on same X axis
                if( Math.abs((options.target.getLeft() + options.target.getWidth()) - (obj.getLeft() + obj.getWidth())) < this.snap ) {
                    // this.snap target TR to object BR
                    if( Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < this.snap ) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // this.snap target BR to object TR
                    if( Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < this.snap ) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() - options.target.getHeight());
                    }
                }

                // If left points are on same X axis
                if( Math.abs(options.target.getLeft() - obj.getLeft()) < this.snap ) {
                    // this.snap target TL to object BL
                    if( Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < this.snap ) {
                        options.target.setLeft(obj.getLeft());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // this.snap target BL to object TL
                    if( Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < this.snap ) {
                        options.target.setLeft(obj.getLeft());
                        options.target.setTop(obj.getTop() - options.target.getHeight());
                    }
                }

                // options.target.setOpacity( options.target.intersectsWithObject( obj ) ? 0.5 : 1 );

                options.target.setCoords();                
            });
        },

        /**
         * [handleDragStart description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragStart: function( e ) {
            console.log( "drag start" );
            this.draggingDivider = e.target;
        },

        /**
         * [handleDragEnd description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragEnd: function( e ) {
            console.log( "drag end" );
        },        

        /**
         * [handleDragEnter description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragEnter: function ( e ) {
            console.log( "enter" );
            //e.target.classList.add( 'over' );
        },

        /**
         * [handleDragLeave description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragLeave: function ( e ) {
            //e.target.classList.remove( 'over' ); // this / e.target is previous target element.
        },

        /**
         * [handleDragOver description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragOver: function ( e ) {

            console.log( "drag over" );
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.

            return false;
        },

        /**
         * [handleDrop description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDrop: function ( e ) {

            // # this / e.target is current target element.
            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }

            if( e.preventDefault ) {
                e.preventDefault();
            }

            // # Caching img dataset
            var _imgW   = Math.ceil( parseInt( this.draggingDivider.dataset.width ) * this.config.ratio );
            var _imgH   = Math.ceil( parseInt( this.draggingDivider.dataset.height ) * this.config.ratio );
            var _imgID  = this.draggingDivider.dataset.key + "_" + this.draggingDivider.dataset.cat + "_" + Date.now();
            let _imgOr  = this.draggingDivider.dataset.orientation;

             var _divider = new Divider(
                 this.draggingDivider.dataset.cat,
                 this.draggingDivider.dataset.key,
                 +this.draggingDivider.dataset.width,
                 +this.draggingDivider.dataset.height,
                 _imgW,
                 _imgH,
                 this.draggingDivider.dataset.orientation,
                 this.draggingDivider.src
             );
             
            var imgObj = new Image();
            imgObj.src = this.draggingDivider.dataset.defaultdivider;

            imgObj.onload = () => {

                let oImg = new fabric.Image( imgObj );

                oImg.setWidth( _imgW );
                oImg.setHeight( _imgH );

                oImg.category = _divider.category;
                oImg.subCategory = _divider.subCategory;

                /*let posX = (e.clientX)?e.offsetX:e.layerX;
                let posY = (e.clientY)?e.offsetY:e.layerY;*/

                let posX = e.layerX;
                let posY = e.layerY;

                // # Set image position
                oImg.setLeft( posX );
                oImg.setTop( posY );
                
                // # Set controls off
                oImg.hasControls = false;
                oImg.hasBorders  = false;
                oImg.hasRotatingPoint = false;
                
                // # Selected opacity
                oImg.set({
                    opacity: .5,
                    backgroundColor : "#ffcc00"
                });

                // # Pixel precision
                oImg.perPixelTargetFind = true;
                oImg.dirtystate = false;

                // # Change origin point to corner top left
                oImg.originX = "left";
                oImg.originY = "top";

                // # Image has been dropped
                oImg.dropped = true;
                
                // # Set ID unique
                oImg.id =_divider.id;

                // # Set object type
                oImg.type = "divider";

                // # Set orientation
                oImg.orientation = _imgOr;

                // # Add image to canvas
                this.canvas.add( oImg );

                // # Coords
                var coords = oImg.calcCoords().bl;
                var centerCoords = oImg.getCenterPoint();
                _divider.x = coords.x;
                _divider.y = coords.y;

                var self = this;

                oImg.on( 'selected', function() {

                    // self.allselected = false;
                    var objs = self.canvas.getObjects().map( ( o )  => {

                        if( o == this ) {
                            console.log( "SAME OBJ" );
                            return;
                        }

                        o.trigger( 'deselected' );
                    });

                    this.bringToFront();

                    if( !this.dirtystate ) {

                        oImg.set({
                            opacity: .5,
                            backgroundColor : "#ffcc00"
                        });
                    }
                });

                oImg.on( 'deselected', function() {

                    self.allselected = false;

                    if( !this.dirtystate ) {
                        oImg.set({
                            opacity: 1,
                            backgroundColor : "#ededed"
                        });
                   }

                });

                // # This bacome the active object
                oImg.set( 'active', true );
                this.canvas.setActiveObject( oImg );

                // # selectAll flag set to false
                this.allselected = false;

                // # Set ObjectWorking On
                this.$store.commit( 'setobjectWorkingOn',{ type:'divider', id:_divider.id, 'obj':oImg } ); 

                // # Final check
                this.finalCollisionDetectionManagement();

                // # Push divider
                this.$store.commit( "pushDivider", _divider );

                this.$store.dispatch ( "add3dDivider", _divider ) ;
                let payload = {
                    id: _divider.id,
                    x: _divider.x,
                    y: _divider.y
                };

                // # Dispatch to 3D component
                this.$store.dispatch( 'update3dDividerPos', payload );

                // # Check vertical heights and bridges
               /* let vertical_alert = this.$store.getters.bridgeSupportVerticalAlert;
                if ( vertical_alert && !this.verticalAlertShowed) {*/

                if (this.verticalAlertChecker(_divider)) {

                    this.verticalAlertShowed = true;
                    // # Modal Error display
                    $( "#generic-alert-message" ).text( Vue.i18n.translate( "step4.vertical-space-advice" ) );
                    this.error_modal.modal();                      
                }
            };

            // # Clean data property
            this.draggingDivider = {};

            // # Return
            return false;
        },

        /**
         * [pushDivider description]
         * @param  {[type]} divider [description]
         * @return {[type]}         [description]
         */
        pushDivider: function ( divider ) {
            this.$store.commit( "manageDivider", divider );
        },

        /**
         * [genHref description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        genHref: function ( val ) {
            return "#elem" + val;
        },

        /**
         * [getDividerByCat description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        getDividerByCat: function( val ) {
            return this.$store.state.dividerTypes.dividers[ val ];
        },

        /**
         * [addBridge description]
         */
        addBridge: function() {
            this.$store.commit( "addBridge" );
            this.$store.dispatch( "add3DBridge" );
        },

        /**
         * [removeBridge description]
         * @return {[type]} [description]
         */
        removeBridge: function() {

            this.$store.dispatch( "remove3DBridge" );

            if( this.$store.state.bridges_selected.length > 1 ) {
                this.$store.commit( "removeBridge" );
            } else {
                this.clearBridges();
            }  
        },

        /**
         * [clearBridges description]
         * @return {[type]} [description]
         */
        clearBridges: function() {
            this.$store.commit( "clearAllBridgeData" );
        },

        /**
         * [check description]
         * @return {[type]} [description]
         */
        check: function() {

            // # No dividers selected check
            if( this.$store.state.dividers_selected.length == 0  ) {

                // # Modal Error display
                $( "#generic-alert-message" ).text( Vue.i18n.translate( "step4.nodividers-advice" ) );
                this.error_modal.modal();  

                // # Step4 is completed, everything's ok
                this.$store.commit( "setFourcompleted", false );

                // # Open related tab
                $( '#tab-container a:first' ).tab( 'show' );
                
                // # No way
                return false;    
            }

            // # Global check
            let checkinObj = this.canGoToFive();

            // # Not all borders have been set
            if( checkinObj.bordersStatus == "" ) {

                // # Modal Error display
                this.error_modal.find( '.modal-body' ).text( Vue.i18n.translate( "step4.noborders-advice" ) );
                this.error_modal.modal();  

                // # Step4 is completed, everything's ok
                this.$store.commit( "setFourcompleted", false );

                // # Open related tab
                $( '#tab-container a[href="#edges-tab"]' ).tab( 'show' );
                
                // # No way
                return false;              
            }

            // # Some collisions in canvas are still there
            if( !checkinObj.noCollision ) {

                // # Modal Error display
                this.error_modal.find( '.modal-body' ).text( Vue.i18n.translate( "step4.collisions-advice" ) );
                this.error_modal.modal();  

                // # Step4 is completed, everything's ok
                this.$store.commit( "setFourcompleted", false );                
                
                return false;                    
            }

            // # User advice, proceed and you'll loose any chance of changing thing in this step
            // # Proceed advice display
            $( "#proceed-advice-modal" ).modal();                             
        }, 

        /**
         * Takes the user to the final step
         * @return {void}
         */
        proceed2Five: function() {

            // # Hide modal
            this.error_modal.modal( 'hide');

            // # Deselect All ( SVG image should have no colored borders )
            this.deselectAll();

            // # Se canvas screenshot
            this.$store.commit( 'setCanvasSvg', this.canvas.toSVG() );

            // # Set 3D screenshot
            this.$store.commit( 'setDrawer3dImage', this.$store.state.renderer.threeRenderer.domElement.toDataURL( "image/png" ) );

            // # Step4 is completed, everything's ok
            this.$store.commit( "setFourcompleted", true );

            // # Take the user to the next step
            this.$router.push({ path: '/split/step5' });
        },

        /**
         * [backAdvice description]
         * @return {[type]} [description]
         */
        backAdvice: function () {
            $( "#reset-advice-modal" ).modal();
        },

        /**
         * Takes the user back to step4 ( after an advice has been accepted )
         * @return {void}
         */
        back2Bridge: function () {
            
            // # Hide back advice modal
            $( "#reset-advice-modal" ).modal( 'hide' );

            // # Clear all dividers ( 3d )
            this.$store.dispatch( "remove3dAllDividers" );

            // # Clear all borders
            this.$store.commit( "clearDrawerBorders" );

            // # Take the user back
            this.$router.push({ path: '/split/stepponte' });
        },

        canGoToFive: function () {

            let out = {};
            out.bordersStatus = this.$store.state.borders.background &&
                                this.$store.state.borders.back &&
                                this.$store.state.borders.front &&
                                this.$store.state.borders.left &&
                                this.$store.state.borders.right;
            out.noCollision = true;

            this.canvas.forEachObject( ( obj ) => {

                if( !obj.dirtystate ) {
                    return;
                }

                let actuallyCollides = false;

                this.canvas.forEachObject( ( otherObj ) => {

                    if( obj == otherObj ) {
                        return;
                    }

                    if( obj.intersectsWithObject( otherObj ) ) {

                        actuallyCollides = true;
                        out.noCollision = false;
                        return;
                    }

                });

                if( !actuallyCollides ) {

                    obj.dirtystate = false;
                }

            });

            return out;
        },

    },

    /**
     * Route guard: disallow route entering if previuos data has not been submitted
     * 
     * @param  {string}   to   [description]
     * @param  {string}   from [description]
     * @param  {string}   next [description]
     * @return {void} 
     */
    beforeRouteEnter: (to, from, next) => {
        
        next( vm => {

            if( from.path == "/split/step5" ) {
                 vm.$router.push({ path: '/split/step2' });
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

        })
    },   

    created () {
      Pace.start( paceOptions );
    },


    mounted () { // # Window onload eq

        // # Initial settings
        this.$store.commit( "setFourreached",  true );
        this.$store.commit( "setComponentHeader",  "step4.header-title" );
        this.$store.commit( "setCurrentStep", 4 );

        this.initCanvas();
        
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