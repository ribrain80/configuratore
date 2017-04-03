<template>

<div>
     <div class="row">
            <!-- Only if user selected a bridge -->
            <div class="col-lg-12 col-md-12 panel-default" v-if="$store.state.has_bridge">
                <div class="panel-heading">
                    Gestione bridges
                </div>
                <div class="panel-body">
                    <div class="row">
                        <!-- Bridge representation -->
                        <div class="col-lg-10 col-md-10">
                            <div class="col-lg-1 col-md-1 "
                                 v-for="curbridge in $store.state.bridges_selected"
                                 style="min-height: 100px;border: 1px solid #666;border-radius: 10px"
                                 :style="{ 'background-color': bridge_hex != '' ?  bridge_hex : ''}"
                                 @click="selectBridge( $event )"
                            >
                                <br>{{ $store.state.bridge_orientation}}<br>
                            </div>
                        </div>
                        <!-- Bridge Ops -->
                        <div class="col-lg-2 col-md-2">
                            <button class="btn btn-success btn-block"
                                    :disabled="!canAddBridges"
                                    @click="addBridge">Add</button>
                            <button class="btn btn-primary btn-block" @click="clearBridges">RemoveAll</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="spacer"></div>
<!-- Container -->
    <div class="row">

        <!-- 2D container -->
        <div class="col-lg-6 col-md-6" id="step4_2d">
            
            <!-- Upper edge -->
            <div class="row">
            SEL - {{ $store.state.drawer_border_top.selected }}
                <div :class="[ 'col-lg-12', 'edge_2d_h edge', $store.state.drawer_border_top.selected ? 'edge_selected' : '' ]" 
                :style="{ 'background-color': $store.state.drawer_border_top.hex != '' ?  $store.state.drawer_border_top.hex : ''}" id="top" @click='selectBorder( $event );'></div>
            </div>
            
            <!-- Center content -->
            <div class="row">

                <!-- Left edge -->
                <div :class="[ 'col-lg-1', 'edge_2d_v edge', $store.state.drawer_border_left.selected ? 'edge_selected' : '' ]" 
                :style="{ 'background-color': $store.state.drawer_border_left.hex != '' ?  $store.state.drawer_border_left.hex : ''}" id="left" @click='selectBorder( $event );'></div>
                
                <!-- Actual drawer canvas -->
                <div class="col-lg-10 zeropadded col-md-12 dragdrop-area" id="canvas-container">
                    <canvas id="canvas" class="center-block"></canvas>
                </div>
                
                <!-- Right edge -->
                <div :class="[ 'col-lg-1', 'edge_2d_v edge', $store.state.drawer_border_right.selected ? 'edge_selected' : '' ]" 
                :style="{ 'background-color': $store.state.drawer_border_right.hex != '' ?  $store.state.drawer_border_right.hex : ''}" id="right" @click='selectBorder( $event );'></div>

            </div>
            
            <!-- Lower edge -->
            <div class="row">
                <div :class="[ 'col-lg-12', 'edge_2d_h edge', $store.state.drawer_border_bottom.selected ? 'edge_selected' : '' ]"  
                :style="{ 'background-color': $store.state.drawer_border_bottom.hex != '' ?  $store.state.drawer_border_bottom.hex : ''}"id="bottom" @click='selectBorder( $event );'></div>
            </div>
            
            <!-- Bridge info and management -->
            <div class="row">
                
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
                        <li :class="{active: !index}" role="presentation" v-for="(cat,index) in availabeDividerCategories">
                            <a data-toggle="tab" role="tab" :href="genHref(cat)">Elem h-{{ cat }}</a>
                        </li>
                        <li role="presentation"><a data-toggle="tab" role="tab" href="#colors">Textures e colori</a></li>
                    </ul>

                    <!-- Tab contents -->
                    <div class="tab-content">
                        
                        <!-- Dividers by cat -->
                        <div role="tabpanel" :class="{active: !index}" :id="'elem'+cat" class="tab-pane fade in" v-for="(cat,index) in availabeDividerCategories">

                            <div class="row" style="margin-top: 22px">

                                <div class="col-lg-6 col-md-6"  v-for="(divider,dimension) in getDividerByCat(cat)">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            {{ dimension }}
                                        </div>
                                        <div class="panel-body">
                                            <div class="row" style="display: flex">
                                                <div class="col-lg-4 col-md-4">
                                                    <img src="http://placehold.it/100x100" class="img center-block img-responsive img-thumbnail">
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <!-- Remove the inline style and use something more responsive -->
                                                    <img draggable="true"
                                                         class="img canBeDragged center-block  img-responsive "
                                                         src="http://configuratore.local/images/dividers/445/200X100_H.png"
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
                                                         :src="divider.image"
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
                                        <div class="col-lg-4 col-md-4" v-for="variant in $store.getters.getDividerVariants">
                                            <figure>
                                                <img src="http://lorempixel.com/output/nature-q-c-640-480-8.jpg"
                                                     class="img center-block img-responsive img-thumbnail"
                                                     @click="_updateDividerSku( $event );"
                                                     style="width: 100px;height: 100px"
                                                     :data-sku="variant.sku"
                                                >
                                                <figcaption>
                                                    {{ variant.description }}
                                                </figcaption>
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

        <div class="row">
            <div class="col-lg-3 col-md-3">
                <router-link to="/split/stepponte" tag="button" class="btn btn-danger btn-block">{{ 'back' | translate }}</router-link>
            </div>
            <div class="col-lg-3 col-md-3 pull-right">
                <button class="btn btn-danger btn-block" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
            </div>
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

        availabeDividerCategories: function () {
            let max = parseFloat(this.$store.state.dimensions.shoulder_height)*10;

            //Altezza interna sponda in mm
            return this.$store.state.dividerTypes.dividersCategories.filter(function (category) {
                return max >= parseInt(category);
                }
            );
        },

        /**
         *  Check if the user can add more bridges.
         */
        canAddBridges: function () {
            let availableSpace = (this.$store.state.bridge_orientation=='V')?this.real_height:this.real_width;
            return availableSpace >= (this.bridgesArea + this.tighterBridgeWidth)
        },

        /**
         *  Return the tighter bridge width
         */
        tighterBridgeWidth: function () {
            return this.$store.state.bridges_selected.reduce(
                function ( min, elem ) {
                    return (min>elem.width)?elem.width:min;
                }
                , 0);
        },

        /**
         * Actual area covered by bridges
         */
        bridgesArea: function () {
            return this.$store.state.bridges_selected.reduce(function ( accumulatore, elem ) {
                return accumulatore + elem.width;
            }, 0);
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
            this.canvasHeight = parseInt( this.$store.state.dimensions.length * this.config.ratio );
            console.log( "CH: " + this.canvasHeight );

            // # Force dimensions
            $( "#canvas-container" ).height( this.canvasHeight );
            $( ".edge_2d_v" ).height( this.canvasHeight );

            // # Initialize canvas
            this.canvas = new fabric.Canvas( 'canvas', { width: this.canvasWidth, height: this.canvasHeight } );

            // # No selection
            this.canvas.selection = false;

            /**
             * [description]
             * @param  {[type]} ['object:moving'] [description]
             * @param  {[type]} (options          [description]
             * @return {[type]}                   [description]
             */
            this.canvas.on( ['object:moving'],  (options) => {
                this.handleMoving( options );
            });

            /**
             * [description]
             * @param  {[type]} ['object:added'] [description]
             * @param  {[type]} (options         [description]
             * @return {[type]}                  [description]
             */
            this.canvas.on( ['object:added'], (options) => {
                this.handleMoving( options );
            });  

            // # Scope fix
            var self = this;


            fabric.util.addListener( this.canvas.upperCanvasEl, 'click', (e) => {
                try {
                    console.log("Inside the click listener!");
                    console.log("Active canvas",self.canvas.getActiveObject());
                    // # Avoid null pbjects
                    if( null == this.canvas.getActiveObject() ) {
                        return;
                    }

                    console.log("Active canvas type",this.canvas.getActiveObject().get( 'type' ));
                    // # Avoid canvas trying to remove itself
                    if( this.canvas.getActiveObject().get( 'type' ) != "divider" ) {
                        return;
                    }

                    // # Cache active object ID
                    let id = this.canvas.getActiveObject().get( 'id' );

                    // Updating this.selectedItem and $store.objectWorkingOn
                    // @todo: selectedItem deve diventare una property di $store.objectWorkingOn
                    this.selectedItem = this.canvas.getActiveObject();
                    this.$store.commit('setobjectWorkingOn',{type:'divider',id:id});



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

            fabric.util.removeListener( this.canvas.upperCanvasEl, 'click', function( e ) {});

            /**
             * Double click listener ( Divider deletion )
             * @param  {Object} e )  original event triggered
             * @return {void}
             */
            fabric.util.addListener( this.canvas.upperCanvasEl, 'dblclick', function( e ) {

                try {
                    console.log("Inside the dblclick listener!");
                    console.log("Active canvas",self.canvas.getActiveObject());
                    // # Avoid null pbjects
                    if( null == self.canvas.getActiveObject() ) {
                        return;
                    }

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
         * @return {void}
         */
        ratioComputer: function() {

            // # Container available width
            var available_width = this.canvasWidth;

            console.log( "AW :" + available_width );

            console.log( "RW :" + this.real_width );

            console.log( "ratio computed: " +  ( available_width / this.real_width ) );
            
            // # Ratio computed using max allowed rect width
            this.config.ratio = ( available_width / this.real_width ).toFixed( 2 );
            this.snap = 30;//parseInt( this.snap * this.config.ratio );
            console.log( "RATIO " + this.config.ratio );
            console.log( "SNAP " + this.snap );
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

            let pos = [ "top", "left", "right", "bottom" ];

            var self = this;
            for( var posId in pos ) {

                if( pos[ posId ] == event.target.id ) {
                    self.$store.commit( "setDrawerBorderSelected", { id: pos[ posId ], val: true } );
                    self.selectedItem = { type: "border", id: event.target.id };
                    continue;
                } 

                this.$store.commit( "setDrawerBorderSelected", { id: pos[ posId ], val: false } );
            };

            $( '#tab-container a[href="#colors"]' ).tab( 'show' );
        },  

        selectBridge: function() {
            this.selectedItem = { type: "bridge", id: this.$store.state.bridges_selected[ 0 ].id };
            $( '#tab-container a[href="#colors"]' ).tab( 'show' );
        },


        _updateDividerSku: function ( e ) {
            let payload = {
                id: this.$store.state.objectWorkingOn.id,
                sku: e.target.dataset.sku
            };

            //Update Image in canvas
            // # todo: usare meglio la logica :D
            let img = this.selectedItem.getElement();
            img.src = e.target.src;
            img.onload =  () => {
                console.log( "YES" );
                this.canvas.renderAll();
            };

            this.$store.commit("updateDividerSku",payload);
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

                case "divider":
                    console.log( hex );
                    console.log( this.selectedItem.id );
                    this.$store.commit( "setDividerHex", { id: this.selectedItem.id, hexa: hex } );
                    //this.selectedItem.setBackgroundColor( hex );
                    this.selectedItem.set({
                        url: 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg'
                    });

                    var self = this;
                    var img = this.selectedItem.getElement();
                    img.src = 'http://lorempixel.com/output/nature-q-c-640-480-8.jpg';
                    img.onload = function () {
                        console.log( "YES" );
                        self.canvas.renderAll();
                    }

                    //this.canvas.renderAll();
                break;

                case "bridge":
                    this.$store.commit( "setBridgeHex", hex );
                    this.bridge_hex = hex;
                    // this.selectedItem.setBackgroundColor( hex );
                    // this.canvas.renderAll();
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

            // # Lock obj inside the canvas
            this._lockToContainer(options);

            // # Collision mnagement
            this._preventCollision(options);

            // # get the new coords
            let coords = options.target.calcCoords().bl;
            let payload = {
                id: options.target.id,
                x: coords.x,
                y: coords.y
            }
            this.$store.commit('updateDividerPosition',payload);
        },

        _preventCollision: function ( options ) {

            // Loop through objects
            this.canvas.forEachObject( ( obj ) => {
                //#
                //obj.setCoords();
                //#
                //var activeObject = this.canvas.getActiveObject();
                if ( obj === options.target ) return;
                //#
                //if ( obj === activeObject ) return;

                // If objects intersect
                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || 
                    obj.isContainedWithinObject( options.target) ) {

                    var distX = ((obj.getLeft() + obj.getWidth()) / 2) - ((options.target.getLeft() + options.target.getWidth()) / 2);
                    var distY = ((obj.getTop() + obj.getHeight()) / 2) - ((options.target.getTop() + options.target.getHeight()) / 2);
                    console.log( "distX " + distX );
                    console.log( "distY " + distY );

                    // Set new position
                    this.findNewPos( distX, distY, options.target, obj );
                }

                // this.snap objects to each other horizontally

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
            });

            options.target.setCoords();

            // If objects still overlap
            // Todo: fix when too much full for find a new position

            let outerAreaLeft = null, outerAreaTop = null, outerAreaRight = null, outerAreaBottom = null;

            this.canvas.forEachObject((obj) => {

                if (obj === options.target) return;

                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || 
                    obj.isContainedWithinObject(options.target)) {

                    var intersectLeft = null,
                        intersectTop = null,
                        intersectWidth = null,
                        intersectHeight = null,
                        intersectSize = null,
                        targetLeft = options.target.getLeft(),
                        targetRight = targetLeft + options.target.getWidth(),
                        targetTop = options.target.getTop(),
                        targetBottom = targetTop + options.target.getHeight(),
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
                        intersectWidth = options.target.getWidth() - (intersectLeft - targetLeft);
                    }

                    // Find intersect information for Y axis
                    if(targetTop >= objectTop && targetTop <= objectBottom) {
                        intersectTop = targetTop;
                        intersectHeight = obj.getHeight() - (intersectTop - objectTop);

                    } else if(objectTop >= targetTop && objectTop <= targetBottom) {
                        intersectTop = objectTop;
                        intersectHeight = options.target.getHeight() - (intersectTop - targetTop);
                    }

                    // Find intersect size (this will be 0 if objects are touching but not overlapping)
                    if(intersectWidth > 0 && intersectHeight > 0) {
                        intersectSize = intersectWidth * intersectHeight;
                    }

                    // Set outer snapping area
                    if(obj.getLeft() < outerAreaLeft || outerAreaLeft == null) {
                        outerAreaLeft = obj.getLeft();
                    }

                    if(obj.getTop() < outerAreaTop || outerAreaTop == null) {
                        outerAreaTop = obj.getTop();
                    }

                    if((obj.getLeft() + obj.getWidth()) > outerAreaRight || outerAreaRight == null) {
                        outerAreaRight = obj.getLeft() + obj.getWidth();
                    }

                    if((obj.getTop() + obj.getHeight()) > outerAreaBottom || outerAreaBottom == null) {
                        outerAreaBottom = obj.getTop() + obj.getHeight();
                    }

                    // If objects are intersecting, reposition outside all shapes which touch
                    if(intersectSize) {
                        var distX = (outerAreaRight / 2) - ((options.target.getLeft() + options.target.getWidth()) / 2);
                        var distY = (outerAreaBottom / 2) - ((options.target.getTop() + options.target.getHeight()) / 2);

                        // Set new position
                        this.findNewPos(distX, distY, options.target, obj);
                    }
                }
            });
            options.target.setCoords();
        },

        _lockToContainer: function (options) {

            // # Don't allow objects off the canvas
            if(options.target.getLeft() < this.snap) {
                options.target.setLeft( 0 );
            }

            if(options.target.getTop() < this.snap) {
                options.target.setTop( 0 );
            }

            if((options.target.getWidth() + options.target.getLeft()) > (this.canvasWidth - this.snap)) {
                options.target.setLeft( this.canvasWidth - options.target.getWidth() );
            }

            if((options.target.getHeight() + options.target.getTop()) > (this.canvasHeight - this.snap)) {
                options.target.setTop( this.canvasHeight - options.target.getHeight() );
            }
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

                oImg.dropped = true;
                
                // # Set ID unique
                oImg.id =_divider.id;

                // # Set Sku
                //oImg.sku = _imgSku;

                // # Add image to canvas
                this.canvas.add( oImg ); 

                var coords = oImg.calcCoords().bl;
                var centerCoords = oImg.getCenterPoint();

                oImg.type = "divider";

                this.selectedItem = oImg;


                _divider.x=coords.x;
                _divider.y=coords.y;
                // # Push divider
                this.$store.commit( "pushDivider", _divider );
                // # Set ObjectWorking On
                this.$store.commit('setobjectWorkingOn',{type:'divider',id:_divider.id});


            });


            // # todo: find a way to dont open tab in this way
            $( '#tab-container a[href="#colors"]' ).tab( 'show' );

            // # Clean data property
            this.draggingDivider={};

            // # Return
            return false;
        },

        findNewPos: function ( distX, distY, target, obj ) {

            // See whether to focus on X or Y axis
            if( Math.abs( distX ) > Math.abs( distY ) ) {
                if ( distX > 0 ) {
                    target.setLeft( obj.getLeft() - target.getWidth() );
                } else {
                    target.setLeft( obj.getLeft() + obj.getWidth() );
                }
            } else {
                if ( distY > 0 ) {
                    target.setTop( obj.getTop() - target.getHeight() );
                } else {
                    target.setTop( obj.getTop() + obj.getHeight() );
                }
            }
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
            console.log( this.$store.state.has_bridge );
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
        this.$store.commit('setComponentHeader','gestione divisori');
        this.initCanvas();
    }

}

</script>
