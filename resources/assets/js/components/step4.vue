<template>

<div class="container-fluid">

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
                <div class="modal-body">Sei sicuro di voler cancellare il divisorio?</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Annulla!</button>
                    <button type="button" class="btn btn-primary" @click="deleteDivider()">Sono sicuro, eliminalo!</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Container -->
    <div class="row top1">

        <!-- 2D container -->
        <div class="col-lg-6 col-md-6" id="step4_2d">
            
            <!-- Select All - trash bin row -->
            <div class="row">
                <div class="col-lg-12" >
                    <div class="col-lg-2 pull-left" >
                        <button class="btn btn-split-small" @click="selectAll()">{{ 'step4.select_all' | translate }}</button>
                    </div> 

                    <div class="col-lg-2 pull-right" >
                        <img src="/images/others/garbage.png" style="width: 40%; height: 40%;cursor:pointer;" @click="alertDividerDeletion()"/>
                    </div> 
                </div>
            </div>
        
            
            <!-- Center content -->
            <div class="row top1">
                
                <!-- Actual drawer canvas -->
                <div class="dragdrop-area center-block" id="canvas-container">
                    <canvas id="canvas" class="center-block"></canvas>
                </div>
                
            </div>
            
            <!-- bridges, edges row -->
            <div class="row top1">

                <!-- Only if user selected a bridge -->
                <div class="col-lg-12 col-md-12">
                    
                    <!-- Ponti -->
                    <div>
                        
                        <div class="row">
                            
                            <div v-if="$store.state.has_bridge">
                                <!-- Bridges -->
                                <div class="col-lg-3 bridge_representation"  @click="selectBridge( $event );">
                                    Ponte {{ $store.state.bridge_orientation }} - N. {{ $store.state.bridges_selected.length }}
                                </div>
                                <div class="col-lg-3">
                                    <button class="btn btn-default btn-sm" :disabled="!canAddBridges" @click="addBridge()">+</button>
                                    <button class="btn btn-default btn-sm" :disabled="!$store.state.bridges_selected.length" @click="removeBridge()">-</button>
                                    <button class="btn btn-default btn-sm" @click="clearBridges">
                                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Egdes -->
                            <div class="col-lg-6">
                                <div :class="['col-lg-12', 'edge', 'text-center', $store.state.drawer_border_top.selected ? 'edge_selected' : '' ]" id="top" @click='selectBorder( $event );' :style="{ 'background-color': $store.state.drawer_border_top.hex != '' ?  $store.state.drawer_border_top.hex : ''}">
                                    TOP
                                </div>
                                <div :class="['col-lg-3', 'edge', $store.state.drawer_border_left.selected ? 'edge_selected' : '' ]" id="left" @click='selectBorder( $event );' :style="{ 'background-color': $store.state.drawer_border_left.hex != '' ?  $store.state.drawer_border_left.hex : ''}">LEFT</div>
                                
                                <div class="col-lg-6 text-center">LATI</div>

                                <div :class="['col-lg-3', 'edge', $store.state.drawer_border_right.selected ? 'edge_selected' : '' ]" id="right" @click='selectBorder( $event );' :style="{ 'background-color': $store.state.drawer_border_right.hex != '' ?  $store.state.drawer_border_right.hex : ''}">RIGHT</div>

                                <div :class="['col-lg-12', 'edge', 'text-center', $store.state.drawer_border_bottom.selected ? 'edge_selected' : '' ]" id="bottom" @click='selectBorder( $event );' :style="{ 'background-color': $store.state.drawer_border_bottom.hex != '' ?  $store.state.drawer_border_bottom.hex : ''}">BOTTOM</div>

                            </div>                     

                        </div>

                    </div>

                </div>

            </div>            

            <!-- Bridge info and management -->
            <div class="row top1">
                
                <!-- 3D's lair -->
                <div class="col-lg-12 col-md-12" id="step4_3d">
                    <step4_3d></step4_3d>
                </div>

            </div>

        </div>

        <!-- Tabs: dividers and colors -->
        <div class="col-lg-6 col-md-6" id="step4Tabs">

            <div class="row">

                <!-- Dividers container -->
                <div class="col-lg-12">

                    <!-- Tab title ( Nav ) -->
                    <ul class="nav nav-tabs" role="tablist" id="tab-container">
                        <li :class="{active: !index}" role="presentation" v-for="(cat,index) in availableDividerCategories">
                            <a data-toggle="tab" role="tab" :href="genHref(cat)">Elem h-{{ cat }}</a>
                        </li>
                        <li role="presentation"><a data-toggle="tab" role="tab" href="#colors">Textures e colori</a></li>
                    </ul>

                    <!-- Tab contents -->
                    <div class="tab-content">
                        
                        <!-- Dividers by cat -->
                        <div role="tabpanel" :class="{active: !index}" :id="'elem'+cat" class="tab-pane fade in" v-for="(cat,index) in availableDividerCategories">

                            <div class="row" style="margin-top: 22px">

                                <div class="col-lg-6 col-md-6"  v-for="(divider,dimension) in getDividerByCat(cat)">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            {{ dimension }}
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 center-block">
                                                    <!-- TODO: Fix the inline style -->
                                                    <img :src="divider.image3d" class="img center-block img-responsive img-thumbnail" style="height: 80px">
                                                </div>
                                                <div class="col-lg-6 col-md-6 center-block top1 dragable-img-container">
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
                                                    >
                                                </div>
                                                <div class="col-lg-6 col-md-6 center-block top1 dragable-img-container">
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
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                        <!-- Colors container -->
                        <div role="tabpanel" id="colors" class="tab-pane fade in">  

                            <div class="row" style="margin-top: 22px">
                                <div class="col-lg-12">
                                    <span style="color:red">VISUAL-LOG: TYPE: {{ $store.state.objectWorkingOn.type }} -- ID  {{ $store.state.objectWorkingOn.id }}</span>
                                </div>
                                <div class="col-lg-12">
                                    
                                    <div class="row" >
                                        <div class="col-lg-4 col-md-4" v-for="variant in $store.getters.getDividerVariants" v-if="$store.state.objectWorkingOn.type=='divider'">
                                            <figure>
                                                <img :src="variant.textureImg"
                                                     :data-img="($store.state.objectWorkingOn.obj.orientation=='H')?variant.textureH:variant.textureV"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateDividerSku( $event );"
                                                     style="width: 100px;height: 100px"
                                                     :data-sku="variant.sku"
                                                >
                                            </figure>
                                        </div>

                                        <div class="col-lg-4 col-md-4" v-for="variant in $store.getters.getBorderVariants" v-if="$store.state.objectWorkingOn.type=='border'">
                                            <figure>
                                                <img :src="variant.image"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateBorder( $event );"
                                                     style="width: 100px;height: 100px"
                                                     :data-sku="variant.id"
                                                >
                                            </figure>
                                        </div>

                                        <div class="col-lg-12 col-md-12" v-if="$store.state.objectWorkingOn.type=='bridge'">
                                            <h3>Finiture ponti</h3>
                                        </div>
                                        <div class="col-lg-4 col-md-4" v-for="variant in $store.getters.getBridgesVariants" v-if="$store.state.objectWorkingOn.type=='bridge'">
                                            <figure>
                                                <img :src="variant.textureImg"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateBridges( $event );"
                                                     style="width: 100px;height: 100px"
                                                     :data-sku="variant.sku"
                                                >
                                            </figure>
                                        </div>
                                        <div class="col-lg-12 col-md-12" v-if="$store.state.objectWorkingOn.type=='bridge'">
                                            <h3>Finiture supporti</h3>
                                        </div>
                                        <div class="col-lg-4 col-md-4" v-for="variant in $store.getters.getSupportsVariants" v-if="$store.state.objectWorkingOn.type=='bridge'">
                                            <figure>
                                                <img :src="variant.textureImg"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateSupports( $event ); "
                                                     style="width: 100px;height: 100px"
                                                     :data-sku="variant.sku"
                                                >
                                            </figure>
                                        </div>


                                    </div>

                                </div>
                            </div> 

                        </div>

                    </div> <!-- END tab content -->

                </div>
            </div>
        </div>

    </div>

    <div class="row">
        <div class="col-lg-3 col-md-3">
            <router-link to="/split/stepponte" tag="button" class="btn btn-danger btn-block">{{ 'back' | translate }}</router-link>
        </div>
        <div class="col-lg-3 col-md-3 pull-right">
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
            snap: 10,

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
                ratio: 3
            },

            /**
             * Currently selected item
             * @type {Object}
             */
            selectedItem: {},

            /**
             * [bridge_hex description]
             * @type {String}
             */
            bridge_hex: '',

            allselected: false,
        }
    },

    /**
     * Computed properties and data
     * @type {Object}
     */
    computed: {





        availableDividerCategories: function () {

            let max = parseFloat( this.$store.state.dimensions.shoulder_height ) * 10;

            //Altezza interna sponda in mm
            return this.$store.state.dividerTypes.dividersCategories.filter( function (category) {
                    return max >= parseInt(category);
                }
            );
        },

        /**
         *  Check if the user can add more bridges.
         */
        canAddBridges: function () {
            let availableSpace = ( this.$store.state.bridge_orientation == 'V' ) ? this.real_height : this.real_width;
            return availableSpace >= ( this.bridgesArea + this.tighterBridgeWidth )
        },

        /**
         *  Return the tighter bridge width
         */
        tighterBridgeWidth: function () {
            if (!this.$store.state.bridges_selected) {
                return 0;
            }
            return this.$store.state.bridges_selected.reduce(
                function ( min, elem ) {
                    return ( min > elem.width ) ? elem.width : min;
                }
                , 0 );
        },

        /**
         * Actual area covered by bridges
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
            return +this.$store.state.dimensions.width + this.$store.state.dimensions.delta_width;
        },

        /**
         * Actual available length ( supports computed )
         * @return {number}
         */
        real_height: function() {
            return +this.$store.state.dimensions.length + this.$store.state.dimensions.delta_length;
        }
    },

    /**
     * Instance Methods
     * @type {Object}
     */
    methods: {

        /**
         *  Return the first item in list texture depending on parameters
         */
        getDefaultDividerImg: function(divider,cat,dimension,horizontal) {
             let _dividerCategoryObj = this.$store.state.dividerTypes.dividers[cat];
             let _dividerDimension = _dividerCategoryObj[dimension];
             let _obj = _dividerDimension.items[0];
             return (horizontal)? _obj.textureH : _obj.textureV;
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
                img.addEventListener( 'dragend',   this.handleDragEnd, false);
            });        

            // # Compute available width
            this.canvasWidth  = parseInt( canvas_container.width() * 0.80 );
            console.log( "CW: " + this.canvasWidth );

            // # Compute ratio
            this.ratioComputer();

            // # Compute height based on ration computed
            this.canvasHeight = parseInt( this.real_height * this.config.ratio );
            console.log( "CH: " + this.canvasHeight );

            // # Set DOM dimensions
            canvas_container.width( this.canvasWidth ).height( this.canvasHeight );

            // # FIX ME
            $( ".edge_2d_v" ).height( this.canvasHeight );

            // # Initialize canvas
            this.canvas = new fabric.Canvas( 'canvas', { width: this.canvasWidth, height: this.canvasHeight } );

            // # No selection
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

            // # Last chance 
            // # FIX ME
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

                    // # Avoid null pbjects
                    if( null == this.canvas.getActiveObject() ) {
                        return;
                    }

                    console.log( "Active canvas", this.canvas.getActiveObject() );
                    console.log( "Active canvas type", this.canvas.getActiveObject().get( 'type' ));

                    // # Avoid canvas trying to remove itself
                    if( this.canvas.getActiveObject().get( 'type' ) != "divider" ) {
                        return;
                    }

                    // # Cache active object ID
                    let id = this.canvas.getActiveObject().get( 'id' );

                    // Updating this.selectedItem and $store.objectWorkingOn
                    // @todo: selectedItem deve diventare una property di $store.objectWorkingOn
                    this.selectedItem = this.canvas.getActiveObject();
                    this.$store.commit('setobjectWorkingOn',{type:'divider',id:id,obj:this.canvas.getActiveObject()});

                } catch( e ) {

                    // # Log error and ignore it
                    console.log( e );
                } finally {

                    // # Stop event propagation and prevent default
                    // # mandatory cause otherwise the event is passed to the canvas itself
                    e.preventDefault();
                    e.stopPropagation();

                    // # Render all
                    this.canvas.renderAll();

                    // # also return false is needed
                    return false;
                }

            });

            /**
             * Canvas click listener remove
             * @param  {[type]} e )             {} [description]
             * @return {[type]}   [description]
             */
            fabric.util.removeListener( this.canvas.upperCanvasEl, 'click', function( e ) {} );    

            // # Get the container element
            var canvasContainer = document.getElementById( 'canvas-container' );

            // # Scope fix
            var self = this;

            // # Container listeners
            canvasContainer.addEventListener( 'dragenter', self.handleDragEnter, false );
            canvasContainer.addEventListener( 'dragover',  self.handleDragOver, false );
            canvasContainer.addEventListener( 'dragleave', self.handleDragLeave, false );
            canvasContainer.addEventListener( 'drop',      self.handleDrop, false ); 

            // # Force rendering
            this.canvas.renderAll();
        },

        alertDividerDeletion: function() {

            var activeObj = this.canvas.getActiveObject();

            if( null == activeObj || undefined == activeObj ) {
                return;
            }

            if( activeObj.get( 'type' ) != "divider") {
                return;
            }
            
            $( "#deletion-alert-modal" ).modal();
        },

        selectAll: function() {

            if( this.allselected ) {

            }

            var objs = this.canvas.getObjects().map( ( o )  => {

                if( !this.allselected ) {
                    o.set( 'active', false );
                    o.setStroke( "#ffcc00" );
                    o.setStrokeWidth( 2 );
                } else {
                    if( this.allselected ) {
                        o.set( 'active', false );
                        o.setStrokeWidth( 0 );
                    }
                }

            });

            this.allselected = true;

            this.canvas.renderAll();
        },

        deleteDivider: function() {

            switch( this.allselected ) {
                
                case true:

                    this.canvas.clear();
                    this.canvas.discardActiveObject();
                    this.canvas.renderAll();
                    this.allselected = false;

                break;

                case false:

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
                    this.$store.commit( "removeDivider", id );

                    // # Actually remove object from canvas
                    this.canvas.remove( activeObj );

                    // # Clean up pointers
                    this.canvas.discardActiveObject();

                    // # Refresh canvas
                    this.canvas.renderAll(); 
                                   
                break;
            }

            $( "#deletion-alert-modal" ).modal( 'hide' );
            $( '#tab-container a:first' ).tab( 'show' );

        },

        finalCollisionDetectionManagement: function() {

              var activeObj = this.canvas.getActiveObject();
                
                // # No selected Item, return
                if( null == activeObj ) {
                    return;
                }

                // # No type defined, return
                if( undefined == activeObj.type ) {
                    return;
                }

                // # Only for dividers
                if( activeObj.type == "divider" ) {

                    // # Reset standard opacity ( some object may be stuck in half opacity )
                    // # this is a "runtime" fix
                    activeObj.setOpacity( 1 );

                    // Loop through objects
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
                            console.log( "no type" );
                            return;
                        }

                        // # Reset standard opacity ( some object may be stuck in half opacity )
                        // # this is a "runtime" fix
                        obj.setOpacity( 1 );

                        // # Log intersection
                        console.log( "intersect " + activeObj.intersectsWithObject(obj) );

                        // # If objects intersect
                        if ( activeObj.intersectsWithObject( obj ) ) { 

                            // # Intersections init
                            var intersectLeft = null, intersectTop = null, intersectWidth = null;
                            var intersectHeight = null, intersectSize = null;
                            var targetLeft = activeObj.getLeft();
                            var targetRight = targetLeft + activeObj.getWidth();
                            var targetTop = activeObj.getTop();
                            var targetBottom = targetTop + activeObj.getHeight();
                            var objectLeft = obj.getLeft();
                            var objectRight = objectLeft + obj.getWidth();
                            var objectTop = obj.getTop();
                            var objectBottom = objectTop + obj.getHeight();            

                            // Find intersect information for X axis
                            if( targetLeft >= objectLeft && targetLeft <= objectRight ) {
                                intersectLeft = targetLeft;
                                intersectWidth = obj.getWidth() - ( intersectLeft - objectLeft );

                            } else if( objectLeft >= targetLeft && objectLeft <= targetRight ) {
                                intersectLeft = objectLeft;
                                intersectWidth = activeObj.getWidth() - ( intersectLeft - targetLeft );
                            }

                            // Find intersect information for Y axis
                            if( targetTop >= objectTop && targetTop <= objectBottom ) {
                                intersectTop = targetTop;
                                intersectHeight = obj.getHeight() - ( intersectTop - objectTop );

                            } else if( objectTop >= targetTop && objectTop <= targetBottom ) {
                                intersectTop = objectTop;
                                intersectHeight = activeObj.getHeight() - ( intersectTop - targetTop );
                            }  
                      
                            // Find intersect size (this will be 0 if objects are touching but not overlapping)
                            if( intersectWidth > 0 && intersectHeight >  0 ) {
                                console.log( "intersect area!" );
                                intersectSize = intersectWidth * intersectHeight;
                            }                                    

                            if( intersectSize != null ) {
                                console.log( "Intersect size " + intersectSize );
                                activeObj.setOpacity( 0.5 );
                                this.canvas.renderAll();
                                return;
                            }

                            // # No collision
                            activeObj.setOpacity( 1 );
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

            // # Dimension ratio tells us if we are in the case that height > width
            let dimensions_ratio = this.real_width / this.real_height;

            // # Container available width
            let available_width = this.canvasWidth;
            console.log( "AW" + available_width );

            var real_ratio = ( available_width / this.real_width );
            // # Ratio computed using max allowed rect width
            this.config.ratio = real_ratio.toFixed( 2 );
            console.log( "RAZ: " + this.config.ratio );

            this.config.ratio = this.config.ratio;
            console.log( "RAZ adjusted: " + this.config.ratio );

            // # height > width
            if( dimensions_ratio < 1 ) {

               console.log( "D ratio: " + dimensions_ratio );
               console.log( "H > W" );

               // # let's say that we want to set a threshold
               // # this will prevent the scale change when 
               // # H / W dfference is little
               var threshold = available_width;
               
               // # Initial height computed based on available width
               var computed_height = this.real_height * this.config.ratio;
               console.log( "CH first " + computed_height );

               // # Reduce the computed height to a dimension max = available width 
               // # so that the resulting shape won't be to tall
               while( computed_height > threshold ) {

                    // # Reduce ratio at each iteration
                    this.config.ratio = ( this.config.ratio / 100 ) * 90;
                    console.log( "RA: " + this.config.ratio );
                    
                    // # Newly computed canvas dimension are smaller and smaller
                    computed_height  = this.real_height * this.config.ratio;
                    this.canvasWidth = this.real_width * this.config.ratio;

                    console.log( "CWChanged " +  this.canvasWidth );
                    console.log( "CHChanged " +  computed_height );
               }

               console.log( computed_height + " - " + available_width );
            }

            console.log( "RATIO " + this.config.ratio );
        },  

        /**
         * Converts any real dimension into a suitable pixel rapresentation of it
         * Conversion is based of a scale factor and a pixel ratio ( should be related to the device screen dimension )  
         * @param  {double} mm input in millimeters
         * @return {int}    computed ( adapted ) integer output
         */
        mm2Pixel: function ( mm ) {
            
            try {
                console.log( "mm orig " + mm );
                console.log( "mm conv " + Math.floor( mm  * this.config.ratio ) );
                return Math.floor( mm  * this.config.ratio );
            } catch ( e ) {
                // # Use a suitable default value
                return 250;
            }   
        },

        selectBorder: function( event ) {

            let _selectedBorder = event.target;

            this.$store.commit( 'setobjectWorkingOn', { type:'border', id:_selectedBorder.id,obj:_selectedBorder } );

            console.log( this.$store.state.objectWorkingOn );

            $( '#tab-container a[href="#colors"]' ).tab( 'show' );
        },  

        selectBridge: function( event ) {
            this.selectedItem = { type: "bridge", id: this.$store.state.bridges_selected[ 0 ].id };
            this.$store.commit('setobjectWorkingOn',{type:'bridge',id:this.$store.state.bridge_ID,'obj':null});

            $( '#tab-container a[href="#colors"]' ).tab( 'show' );
        },


        _updateDividerSku: function ( event ) {

            console.log( event );

            let payload = {
                id: this.$store.state.objectWorkingOn.id,
                sku: event.target.dataset.sku
            };

            console.log( payload );

            this.selectedItem.set({
                url: event.target.src
            });

            var self = this;
            var img = this.selectedItem.getElement();
            img.src = event.target.dataset.img;
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                self.canvas.renderAll();
            }

            this.$store.commit( "updateDividerSku", payload );
        },

        _updateBorder:function (e) {

            let payload = {
                id:this.$store.state.objectWorkingOn.id,
                image:e.target.src,
                dbId: e.target.dataset.sku  //This is a fake sku => just the db id!!!!
            };

            console.log(this.$store.state.objectWorkingOn.obj);
            this.$store.state.objectWorkingOn.obj.style.backgroundImage = "url("+e.target.src+")";

            this.$store.commit('setDrawerBorder',payload);
        },


        _updateBridges: function (e) {
            $('.bridge_representation').css('background-image',"url("+e.target.src+")");
            this.$store.commit('changeBridgeSku',e.target.dataset.sku);
        },

        _updateSupports: function (e) {
            this.$store.commit('changeSupportSku',e.target.dataset.sku);
        },

        /**
         * [handleMoving description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        handleMoving: function ( options ) {

            // # Set element Coords
            options.target.setCoords();

            // # Collision mnagement
            this._preventCollision(options);

            // # get the new coords
            let coords = options.target.calcCoords().bl;
            let payload = {
                id: options.target.id,
                x: coords.x,
                y: coords.y
            }

            this.$store.commit( 'updateDividerPosition', payload );
        },

        _preventCollision: function ( options ) {

            console.log( "get starting point coords" );
            options.target.setCoords();
            var starting_point= options.target.calcCoords().bl;

            // # lock container
            // # Don't allow objects off the canvas
            if(options.target.getLeft() < this.snap) {
                options.target.setLeft(0);
            }

            if(options.target.getTop() < this.snap) {
                options.target.setTop(0);
            }

            if((options.target.getWidth() + options.target.getLeft()) > (this.canvasWidth - this.snap)) {
                options.target.setLeft( this.canvasWidth - options.target.getWidth());
            }

            if((options.target.getHeight() + options.target.getTop()) > (this.canvasHeight - this.snap)) {
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
                if(Math.abs((options.target.getTop() + options.target.getHeight()) - (obj.getTop() + obj.getHeight())) < this.snap) {
                    // this.snap target BL to object BR
                    if(Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < this.snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }

                    // this.snap target BR to object BL
                    if(Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < this.snap) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }
                }

                // If top points are on same Y axis
                if(Math.abs(options.target.getTop() - obj.getTop()) < this.snap) {
                    // this.snap target TL to object TR
                    if(Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < this.snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop());
                    }

                    // this.snap target TR to object TL
                    if(Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < this.snap) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop());
                    }
                }

                // this.snap objects to each other vertically

                // If right points are on same X axis
                if(Math.abs((options.target.getLeft() + options.target.getWidth()) - (obj.getLeft() + obj.getWidth())) < this.snap) {
                    // this.snap target TR to object BR
                    if(Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < this.snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // this.snap target BR to object TR
                    if(Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < this.snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() - options.target.getHeight());
                    }
                }

                // If left points are on same X axis
                if(Math.abs(options.target.getLeft() - obj.getLeft()) < this.snap) {
                    // this.snap target TL to object BL
                    if(Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < this.snap) {
                        options.target.setLeft(obj.getLeft());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // this.snap target BL to object TL
                    if(Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < this.snap) {
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
            this.draggingDivider = e.target;
        },

        /**
         * [handleDragEnd description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragEnd: function( e ) {

        },        

        /**
         * [handleDragEnter description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragEnter: function ( e ) {
            e.target.classList.add( 'over' );
        },

        /**
         * [handleDragLeave description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragLeave: function ( e ) {
            e.target.classList.remove( 'over' ); // this / e.target is previous target element.
        },

        /**
         * [handleDragOver description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDragOver: function ( e ) {

            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
            // NOTE: comment above refers to the article (see top) - natchiketa

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
            var _imgW   = +this.draggingDivider.dataset.width * this.config.ratio;
            var _imgH   = +this.draggingDivider.dataset.height * this.config.ratio;
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

                var oImg = new fabric.Image(imgObj);
                oImg.setWidth( _imgW );
                oImg.setHeight( _imgH );

                // # Set image position
                oImg.setLeft( e.layerX );
                oImg.setTop( e.layerY );

                // # Set background color
                oImg.setBackgroundColor( '#ccc' );    //Set a light gray background
                
                // # Set controls off
                oImg.hasControls = false;

                // # borders off
                oImg.hasBorders  = false;

                // # Pixel precision
                oImg.perPixelTargetFind = true;

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
                oImg.on('selected', function() {

                    this.allselected = false;
                    var objs = self.canvas.getObjects().map( ( o )  => {
                        console.log( "IN" );
                        o.trigger('deselected' );//, {target: text});
                    });

                    this.setStroke( "#ffcc00" );
                    this.setStrokeWidth( 2 );  
                });

                oImg.on( 'deselected', function() {
                    this.setStrokeWidth( 0 );  
                });

                oImg.set( 'active', true );
                this.canvas.setActiveObject( oImg );
                this.canvas.trigger( 'selected', { target: oImg });

                this.allselected = false;

                this.selectedItem = oImg;

                // # Push divider
                this.$store.commit( "pushDivider", _divider );

                // # Set ObjectWorking On
                this.$store.commit( 'setobjectWorkingOn',{ type:'divider', id:_divider.id, 'obj':oImg } ); 

                // # Final check
                this.finalCollisionDetectionManagement();  
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
        },




        /**
         * [removeBridge description]
         * @return {[type]} [description]
         */
        removeBridge: function() {

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

            //console.log("EXPORT TO SVG:",this.canvas.toSVG());

            this.$store.commit('setCanvasSvg',this.canvas.toSVG());

            // # Step4 is completed, everything's ok
            this.$store.commit( "setFourcompleted", true );

            // # Take the user to the next step
            this.$router.push({ path: '/split/step5' });
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

    mounted () { // # Window onload eq

        console.log("Step4 mounted!");
        this.$store.commit( "setComponentHeader",  "step4.header-title" );
        this.initCanvas();
    }

}

</script>
