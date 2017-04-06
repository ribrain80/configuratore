<template>

<div class="container-fluid">

    <div class="row">

        <!-- Only if user selected a bridge -->
        <div class="col-lg-12 col-md-12">
            
            <!-- Ponti -->
            <!--<div class="col-lg-4" v-if="$store.state.has_bridge">
                
                <div class="" :style="{ 'background-color': bridge_hex != '' ?  bridge_hex : ''}" @click="selectBridge( $event )">
                    {{ $store.state.bridge_orientation}}
                </div>
                
                <button class="btn btn-success btn-block" :disabled="!canAddBridges" @click="addBridge">Add</button>
                <button class="btn btn-primary btn-block" @click="clearBridges">RemoveAll</button>

            </div>
            <div class="col-lg-4"></div>
            -->

        </div>

    </div>

    <!-- Container -->
    <div class="row top1">

        <!-- 2D container -->
        <div class="col-lg-6 col-md-6" id="step4_2d">
            
            <div class="row">
                <div class="col-lg-12" >
                    <div class="col-lg-2 pull-left" >
                        <button class="btn btn-split-small">{{ 'step4.select_all' | translate }}</button>
                    </div> 

                    <div class="col-lg-2 pull-right" >
                        <img src="/images/others/garbage.png" style="width: 40%; height: 40%;" />
                    </div> 
                </div>
            </div>
            
            <!-- Upper edge -->
            <!--<div class="row">
                <div :class="[ 'col-lg-12', 'edge_2d_h edge', $store.state.drawer_border_top.selected ? 'edge_selected' : '' ]" 
                :style="{ 'background-color': $store.state.drawer_border_top.hex != '' ?  $store.state.drawer_border_top.hex : ''}" id="top" @click='selectBorder( $event );'></div>
            </div>-->
            
            <!-- Center content -->
            <div class="row top1">

                <!-- Left edge -->
                <!--<div :class="[ 'col-lg-1', 'edge_2d_v', 'edge', $store.state.drawer_border_left.selected ? 'edge_selected' : '' ]" 
                :style="{ 'background-color': $store.state.drawer_border_left.hex != '' ?  $store.state.drawer_border_left.hex : ''}" id="left" @click='selectBorder( $event );'></div>-->
                
                <!-- Actual drawer canvas -->
                <div class="dragdrop-area" id="canvas-container">
                    <canvas id="canvas" class="center-block"></canvas>
                </div>
                
                <!-- Right edge -->
                <!--<div :class="[ 'col-lg-1', 'edge_2d_v', 'edge', $store.state.drawer_border_right.selected ? 'edge_selected' : '' ]" 
                :style="{ 'background-color': $store.state.drawer_border_right.hex != '' ?  $store.state.drawer_border_right.hex : ''}" id="right" @click='selectBorder( $event );'></div>-->
            </div>

            
            <!-- Lower edge -->
            <!--<div class="row">
                <div :class="[ 'col-lg-12', 'edge_2d_h edge', $store.state.drawer_border_bottom.selected ? 'edge_selected' : '' ]"  
                :style="{ 'background-color': $store.state.drawer_border_bottom.hex != '' ?  $store.state.drawer_border_bottom.hex : ''}"id="bottom" @click='selectBorder( $event );'></div>
            </div>-->
            
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
                                            <div class="row" style="display: flex">
                                                <div class="col-lg-4 col-md-4">
                                                    <!-- TODO: Fix the inline style -->
                                                    <img :src="divider.image3d" class="img center-block img-responsive img-thumbnail" style="width: 100px;height: 100px">
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <!-- Remove the inline style and use something more responsive -->
                                                    <img draggable="true"
                                                         class="img canBeDragged center-block  img-responsive "
                                                         :src="divider.imageH"
                                                         style="height: 80px"
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
                                                <div class="col-lg-4 col-md-4" style="border-left: 1px solid #ddd;">
                                                    <!-- Remove the inline style and use something more responsive -->
                                                    <img draggable="true"
                                                         class="img canBeDragged center-block  img-responsive"
                                                         :src="divider.imageV"
                                                         style="height: 80px"
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
                                <span style="color:red">VISUAL-LOG: TYPE: {{ $store.state.objectWorkingOn.type }} -- ID  {{ $store.state.objectWorkingOn.id }}</span>
                                <div class="col-lg-12">
                                    
                                    <div class="row" >
                                        <div class="col-lg-4 col-md-4" v-for="variant in $store.getters.getDividerVariants" v-if="$store.state.objectWorkingOn.type=='divider'">
                                            <figure>
                                                <img :src="($store.state.objectWorkingOn.obj.orientation=='H')?variant.textureH:variant.textureV"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateDividerSku( $event );"
                                                     style="width: 100px;height: 100px"
                                                     :data-sku="variant.sku"
                                                >
                                            </figure>
                                        </div>

                                        <div class="col-lg-4 col-md-4" v-for="variant in $store.getters.getBorderVariants" v-else-if="$store.state.objectWorkingOn.type=='border'">
                                            <figure>
                                                <img :src="variant.image"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateBorder( $event );"
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

            bridge_hex: '',
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
         * [initCanvas description]
         * @return {[type]} [description]
         */
        initCanvas: function() {

            // # Compute available width
            this.canvasWidth  = parseInt( $( "#canvas-container" ).width() );
            console.log( "CW: " + this.canvasWidth );

            // # Compute ratio
            this.ratioComputer();

            // # Compute height based on ration computed
            this.canvasHeight = parseInt( this.real_height * this.config.ratio );
            console.log( "CH: " + this.canvasHeight );

            $( "#canvas-container" ).width( this.canvasWidth );
            
            // # Force dimensions
            $( "#canvas-container" ).height( this.canvasHeight );
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
            this.canvas.on( ['object:moving'],  (options) => {
                this.handleMoving( options );
            });


            // # Last chance 
            // # FIX ME
            this.canvas.on( "mouse:up", () => {

                if( null != this.selectedItem ) {

                    if( this.selectedItem.type == "divider" ) {

                        // Loop through objects
                        this.canvas.forEachObject( ( obj ) => {

                                // # Do nothing if the object checked against is itself
                                if ( obj === this.selectedItem ) return;

                                // # Set element Coords
                                this.selectedItem.setCoords();
                                console.log( "intersect " + this.selectedItem.intersectsWithObject(obj) );

                                // If objects intersect
                                if (this.selectedItem.intersectsWithObject( obj ) ) { 

                                var intersectLeft = null,
                                    intersectTop = null,
                                    intersectWidth = null,
                                    intersectHeight = null,
                                    intersectSize = null,
                                    targetLeft = this.selectedItem.getLeft(),
                                    targetRight = targetLeft + this.selectedItem.getWidth(),
                                    targetTop = this.selectedItem.getTop(),
                                    targetBottom = targetTop + this.selectedItem.getHeight(),
                                    objectLeft = obj.getLeft(),
                                    objectRight = objectLeft + obj.getWidth(),
                                    objectTop = obj.getTop(),
                                    objectBottom = objectTop + obj.getHeight();            

                                // Find intersect information for X axis
                                if(targetLeft >= objectLeft && targetLeft <= objectRight) {
                                    intersectLeft = targetLeft;
                                    intersectWidth = obj.getWidth() - (intersectLeft - objectLeft);

                                } else if(objectLeft >= targetLeft && objectLeft <= targetRight) {
                                    intersectLeft = objectLeft;
                                    intersectWidth = this.selectedItem.getWidth() - (intersectLeft - targetLeft);
                                }

                                // Find intersect information for Y axis
                                if(targetTop >= objectTop && targetTop <= objectBottom) {
                                    intersectTop = targetTop;
                                    intersectHeight = obj.getHeight() - (intersectTop - objectTop);

                                } else if(objectTop >= targetTop && objectTop <= targetBottom) {
                                    intersectTop = objectTop;
                                    intersectHeight = this.selectedItem.getHeight() - (intersectTop - targetTop);
                                }  


                                console.log( "IL" + intersectLeft );
                                console.log( "IH" + intersectHeight );
                                console.log( "IT" + intersectTop );
                                console.log( "IW" + intersectWidth );
                          
                                // Find intersect size (this will be 0 if objects are touching but not overlapping)
                                if(intersectWidth > 0 && intersectHeight > 0) {
                                    intersectSize = intersectWidth * intersectHeight;
                                }                                    

                                    console.log( "Intersect size " + intersectSize );
                                    obj.setOpacity(1);

                                    if( intersectSize != null ) {

                                        this.canvas.discardActiveObject();
                                        // # Actually remove object from canvas
                                        //this.canvas.remove( this.canvas.getActiveObject() ); 
                                        this.canvas.remove( this.selectedItem );
                                        // # Clean up pointers
                                       
                                        this.canvas.renderAll();
                                        this.canvas.calcOffset();
                                    }

                                }     

                        });                
                    }
                }
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

            // # Scope fix
            var self = this;

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

            /**
             * Double click listener ( Divider deletion )
             * @param  {Object} e )  original event triggered
             * @return {void}
             */
            fabric.util.addListener( this.canvas.upperCanvasEl, 'dblclick', function( e ) {

                try {
                    
                    // # Avoid null pbjects
                    if( null == self.canvas.getActiveObject() ) {
                        return;
                    }

                    console.log("Active canvas",self.canvas.getActiveObject());
                    console.log("Active canvas type",self.canvas.getActiveObject().get( 'type' ));

                    // # Avoid canvas trying to remove itself
                    if( self.canvas.getActiveObject().get( 'type' ) != "divider" ) {
                        return;
                    }

                    // # Cache active object ID
                    var id = self.canvas.getActiveObject().get( 'id' );

                    // # Remove ID from selected dividers list
                    self.$store.commit( "removeDivider", id );

                    // # Actually remove object from canvas
                    self.canvas.remove( self.canvas.getActiveObject() );

                    // # Clean up pointers
                    self.canvas.discardActiveObject();

                } catch( e ) {

                    // # Log error and ignore it
                    console.log( e );
                } finally {

                    // # Stop event propagation and prevent default
                    // # mandatory cause otherwise the event is passed to the canvas itself
                    e.preventDefault();
                    e.stopPropagation();  

                    // # Render all
                    self.canvas.renderAll(); 

                    // # also return false is needed             
                    return false;                    
                }

            });

            /**
             * [description]
             * @param  {[type]} e )             {} [description]
             * @return {[type]}   [description]
             */
            fabric.util.removeListener( this.canvas.upperCanvasEl, 'dblclick', function( e ) {});            

            // # Draggable images selection
            this.images = document.querySelectorAll( '.canBeDragged' );

            // # Add drag handler to all the images
            [].forEach.call( self.images, function (img) {
                img.addEventListener( 'dragstart', self.handleDragStart, false);
                img.addEventListener( 'dragend', self.handleDragEnd, false);
            });

            // # Get the container element
            var canvasContainer = document.getElementById( 'canvas-container' );

            // # Container listeners
            canvasContainer.addEventListener( 'dragenter', self.handleDragEnter, false );
            canvasContainer.addEventListener( 'dragover',  self.handleDragOver, false );
            canvasContainer.addEventListener( 'dragleave', self.handleDragLeave, false );
            canvasContainer.addEventListener( 'drop',      self.handleDrop, false ); 

            // # Force rendering
            this.canvas.renderAll();
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

            // # Ratio computed using max allowed rect width
            this.config.ratio = ( available_width / this.real_width ).toFixed( 2 );
            console.log( "RAZ: " + this.config.ratio );

            // # height > width
            if( dimensions_ratio < 1 ) {

               // # let's say that we want to set a threshold
               var threshold = available_width * 1.2;
               
               // # Initial height computed based on available width
               var computed_height = this.real_height * this.config.ratio;
               console.log( "CH first " + computed_height );

               // # Reduce the computed height to a dimension similar to the 
               // # available width so that the resulting shape won't be to 
               // # tall
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

        selectBorder: function() {

            let _selectedBorder = event.target;

            this.$store.commit('setobjectWorkingOn',{type:'border',id:_selectedBorder.id,obj:_selectedBorder});

            console.log(this.$store.state.objectWorkingOn);

            $( '#tab-container a[href="#colors"]' ).tab( 'show' );
        },  

        selectBridge: function() {
            this.selectedItem = { type: "bridge", id: this.$store.state.bridges_selected[ 0 ].id };
            $( '#tab-container a[href="#colors"]' ).tab( 'show' );
        },


        _updateDividerSku: function () {

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
            img.src = event.target.src;
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
                sku: e.target.dataset.sku
            };

            console.log(this.$store.state.objectWorkingOn.obj);
            this.$store.state.objectWorkingOn.obj.style.backgroundImage = "url("+e.target.src+")";

            this.$store.commit('setDrawerBorder',payload);
        },

        setColor: function( hex ) {

            console.log( this.selectedItem );
            if( $.isEmptyObject( this.selectedItem ) ) {
                return;
            }

            switch( this.selectedItem.type ) {

                case "border":
                    console.log( "setDrawerBorder" + this.selectedItem.id.capitalizeFirstLetter() + "Hex" );
                    this.$store.commit( "setDrawerBorder" + this.selectedItem.id.capitalizeFirstLetter() + "Hex", hex );
                break;

                case "bridge":
                    this.$store.commit( "setBridgeHex", hex );
                    this.bridge_hex = hex;
                    // this.selectedItem.setBackgroundColor( hex );
                    // this.canvas.renderAll();
                break;

                case "divider":

                break;
            }

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

            console.log( "starting point coords" );
            options.target.setCoords();
            var starting_point= options.target.calcCoords().bl;

            // # lock container
            // Don't allow objects off the canvas
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

                // # If objects intersect
                // # once there was the findNewPos call
                if ( options.target.intersectsWithObject( obj ) ) { 
                    obj.setOpacity(options.target.intersectsWithObject( obj ) ? 0.5 : 1);
                }

                // # This.snap objects to each other horizontally

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

            fabric.Image.fromURL( this.draggingDivider.src,( oImg ) => {

                // # Set image dimensions
                oImg.setWidth( _imgW );
                oImg.setHeight( _imgH );

                // # Set image position
                oImg.setLeft( e.layerX );
                oImg.setTop( e.layerY );

                // # Set background color
                oImg.setBackgroundColor( '#ccc' );    //Set a light gray background
                
                // # Set controls off
                oImg.hasControls = false;
                oImg.hasBorders  = false;

                oImg.perPixelTargetFind = true;
                oImg.originX = "left";
                oImg.originY = "top";

                oImg.dropped = true;
                
                // # Set ID unique
                oImg.id =_divider.id;

                // # Set Sku
                //oImg.sku = _imgSku;


                oImg.type = "divider";
                oImg.orientation = _imgOr;

                // # Add image to canvas
                this.canvas.add( oImg ); 

                var coords = oImg.calcCoords().bl;
                var centerCoords = oImg.getCenterPoint();

                this.selectedItem = oImg;

                _divider.x=coords.x;
                _divider.y=coords.y;
                // # Push divider
                this.$store.commit( "pushDivider", _divider );
                // # Set ObjectWorking On
                this.$store.commit('setobjectWorkingOn',{type:'divider',id:_divider.id,'obj':oImg});


            });


            // # todo: find a way to dont open tab in this way
            $( '#tab-container a[href="#colors"]' ).tab( 'show' );

            // # Clean data property
            this.draggingDivider={};

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
         * [isSelected description]
         * @param  {[type]}  id [description]
         * @return {Boolean}    [description]
         */
        isSelected: function( id ) {
            return $.inArray( id, this.$store.state.dividers_selected ) != -1;
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
            this.$store.commit( "manageBridge", this.$store.state.bridges_selected[ 0 ] );
        },

        /**
         * [removeBridge description]
         * @return {[type]} [description]
         */
        removeBridge: function() {

            if( this.$store.state.bridges_selected.length > 1 ) {
                this.$store.state.bridges_selected.pop();
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

            // # Check
            /*if( this.$store.state.dividers_selected.length == 0 ) {

                $( "#error-modal" ).find( '.modal-body' ).text( "Devi selezionare almeno un divisorio" );
                $( '#error-modal' ).modal();

                // # Step4 has errors
                this.$store.commit( "setFourcompleted", false );

                // # Stay here and fix it
                return false;  
            } */

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
        this.$store.commit( 'setComponentHeader', 'Gestione divisori' );
        this.initCanvas();
    }

}

</script>
