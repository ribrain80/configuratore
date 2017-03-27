<template>
    <section>
        <div class="spacer"></div>
        <div class="row">
            <div class="col-lg-6 col-md-6" id="step4_2d">
                <div class="row">
                    <div class="col-lg-12 col-md-12 dragdrop-area" id="canvas-container">
                        <canvas id="canvas" style="border:1px solid #ccc" class="center-block"></canvas>
                    </div>
                    <div class="spacer"></div>
                    <div class="col-lg-12 col-md-12" id="step4_3d">
                        <step4_3d></step4_3d>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6" id="step4Tabs">
                <div class="row">
                    <!-- Dividers container -->
                    <div class="col-lg-12" id="elementmenu">

                        <!-- Tab title ( Nav ) -->
                        <ul class="nav nav-tabs">
                            <li  :class="{active: !index}" v-for="(cat,index) in $store.state.dividerTypes.dividersCategories">
                                <a data-toggle="tab" :href="genHref(cat)"> Elem h-{{cat}}</a>
                            </li>
                        </ul>

                        <!-- Tab contents -->
                        <div class="tab-content">
                            <div :class="{active: !index}" :id="'elem'+cat" class="tab-pane fade in" v-for="(cat,index) in $store.state.dividerTypes.dividersCategories">
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
                                                             class="img   canBeDragged center-block  img-responsive "
                                                             src="http://homestead.app/images/dividers/445/200X100_H.png"
                                                             style="height: 80px"
                                                             :data-width  = "divider.width"
                                                             :data-height = "divider.length"
                                                             :data-sku = "divider.sku"
                                                             :data-rotate = "90"
                                                             :data-key = "dimension"
                                                             :data-cat = "cat"
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
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="spacer"></div>
        <div class="row">
            <div class="col-lg-3 col-md-3">
                <router-link to="/split/stepponte" tag="button" class="btn btn-danger btn-block">{{ 'back' | translate }}</router-link>
            </div>
            <div class="col-lg-3 col-md-3 pull-right">
                <button class="btn btn-danger btn-block" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
            </div>
        </div>
    </section>
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
            canvas: {},
            images: [],
            draggingDivider: {},
            snap: 10,
            canvasWidth:0,
            canvasHeight:0,

            config: {
                ratio: 3
            }
        }
    },

    computed: {
        // a computed getter
        real_width: function () {
            return this.$store.state.dimensions.width + this.$store.state.dimensions.delta_width;
        },

        real_height: function() {
            return this.$store.state.dimensions.length + this.$store.state.dimensions.delta_length;
        }
    },

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

            //TODO: Check me ...
            $( "#canvas-container" ).height( this.canvasHeight );

            

            // # Initialize canvas
            this.canvas = new fabric.Canvas( 'canvas', { width: this.canvasWidth, height: this.canvasHeight } );



            // # Force rendering
            this.canvas.renderAll();

            // # CHECK ME
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

            // # Draggable images selection
            this.images = document.querySelectorAll('.canBeDragged');

            // # Scope fix
            var self = this;

            [].forEach.call( self.images, function (img) {
                img.addEventListener( 'dragstart', self.handleDragStart, false);
                img.addEventListener( 'dragend', self.handleDragEnd, false);
            });

            // Bind the event listeners for the canvas
            var canvasContainer = document.getElementById('canvas-container');

            canvasContainer.addEventListener('dragenter', self.handleDragEnter, false);
            canvasContainer.addEventListener('dragover', self.handleDragOver, false);
            canvasContainer.addEventListener('dragleave', self.handleDragLeave, false);
            canvasContainer.addEventListener('drop', self.handleDrop, false); 

        },

        /**
         * Computes the correct ratio based on container width
         * @return {void}
         */
        ratioComputer: function() {

            // # Container available width
            var available_width = this.canvasWidth;

            // # Ratio computed using max allowed rect width
            this.config.ratio = ( available_width / this.real_width ).toFixed( 2 );
            this.snap = parseInt( this.snap * this.config.ratio );
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

        handleMoving: function ( options ) {

            options.target.setCoords();

            // Lock obj inside the canvas
            this._lockToContainer(options);

            this._preventCollision(options);
        },

        _preventCollision: function (options) {

            // Loop through objects
            this.canvas.forEachObject( (obj) => {

                if ( obj === options.target ) return;

                // If objects intersect
                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

                    var distX = ((obj.getLeft() + obj.getWidth()) / 2) - ((options.target.getLeft() + options.target.getWidth()) / 2);
                    var distY = ((obj.getTop() + obj.getHeight()) / 2) - ((options.target.getTop() + options.target.getHeight()) / 2);

                    // Set new position
                    this.findNewPos(distX, distY, options.target, obj);
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

            let outerAreaLeft = null,
                outerAreaTop = null,
                outerAreaRight = null,
                outerAreaBottom = null;

            this.canvas.forEachObject((obj) => {
                if (obj === options.target) return;

                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

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

            console.log( "TARGET " + options.target );
            // Don't allow objects off the canvas
            if(options.target.getLeft() < this.snap) {
                options.target.setLeft(0);
            }

            if(options.target.getTop() < this.snap) {
                options.target.setTop(0);
            }

            if((options.target.getWidth() + options.target.getLeft()) > (this.canvasWidth - this.snap)) {
                options.target.setLeft(this.canvasWidth - options.target.getWidth());
            }

            if((options.target.getHeight() + options.target.getTop()) > (this.canvasHeight - this.snap)) {
                options.target.setTop(this.canvasHeight - options.target.getHeight());
            }
        },

        handleDragStart: function( e ) {
            this.draggingDivider = e.target;
        },

        handleDragEnd: function(e) {

        },        

        handleDragEnter: function ( e ) {
            e.target.classList.add('over');

        },

        handleDragLeave: function ( e ) {
            e.target.classList.remove('over'); // this / e.target is previous target element.

        },

        handleDragOver: function ( e ) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
            // NOTE: comment above refers to the article (see top) -natchiketa

            return false;

        },

        handleDrop: function ( e ) {

            // this / e.target is current target element.

            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }

            //Caching img dataset
            var _imgW = +this.draggingDivider.dataset.width * this.config.ratio;
            var _imgH = +this.draggingDivider.dataset.height * this.config.ratio;
            var _imgID = this.draggingDivider.dataset.key + "_" + this.draggingDivider.dataset.cat + "_" + Date.now();
            var _imgSku = this.draggingDivider.dataset.sku;

            //Creation of canvas to insert

            fabric.Image.fromURL(this.draggingDivider.src,( oImg ) => {
                oImg.setWidth( _imgW );
                oImg.setHeight( _imgH );
                oImg.setLeft( e.layerX );
                oImg.setTop( e.layerY );
                oImg.setBackgroundColor( '#ccc' );    //Set a light gray background
                oImg.ID=_imgID;
                oImg.sku = _imgSku;
                this.canvas.add( oImg );    //Add img to the canvas container
            });


            var divider = {};
            divider.sku = _imgSku;
            divider.width = _imgW;
            divider.height = _imgH;
            divider.id = _imgID;
            //@todo: calculate again
            /*divider.x = coords.x;
            divider.y = coords.y;
            divider.centerx = centerCoords.x;
            divider.centery = centerCoords.y;*/

            console.log( divider );

            this.$store.commit( "pushDivider", divider );


            /*var self = this;
            window.fabric.util.addListener( this.canvas.upperCanvasEl, 'dblclick', function (event) {
                try {
                    var id = self.canvas.getActiveObject().ID;
                    self.canvas.getActiveObject().remove();
                    self.$store.commit( "removeDivider", id );
                } catch( e ) {
                    console.log( "is null")
                } 
            });



            var coords = canvasToInsert.calcCoords().bl;
            var centerCoords = canvasToInsert.getCenterPoint(); 

            var divider = {};
            divider.sku = canvasToInsert.sku;
            divider.width = canvasToInsert.width;
            divider.height = canvasToInsert.height;
            divider.x = coords.x;
            divider.y = coords.y;
            divider.centerx = centerCoords.x;
            divider.centery = centerCoords.y;
            divider.id = canvasToInsert.ID;
            console.log( divider );

            this.$store.commit( "pushDivider", divider );*/


            //Clean data property
            this.draggingDivider={};

            return false;

        },

        findNewPos: function ( distX, distY, target, obj ) {

            // See whether to focus on X or Y axis
            if(Math.abs(distX) > Math.abs(distY)) {
                if (distX > 0) {
                    target.setLeft(obj.getLeft() - target.getWidth());
                } else {
                    target.setLeft(obj.getLeft() + obj.getWidth());
                }
            } else {
                if (distY > 0) {
                    target.setTop(obj.getTop() - target.getHeight());
                } else {
                    target.setTop(obj.getTop() + obj.getHeight());
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
