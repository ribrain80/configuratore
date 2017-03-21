<template>
    
    <!-- Container -->
    <div class="row" id="step4">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2>{{  "step4.title" | translate }}</h2>
        </div>
        
        <!-- Canvas container -->
        <div class="col-lg-6 dragdrop-area" id="canvas-container">
            <canvas id="canvas" width="400" height="400" style="border:1px solid #ccc"></canvas>
        </div>

        <!-- Canvas container -->
        <div class="col-lg-6 dragdrop-area">
            3D Model
        </div>        
        
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
                        <div class="col-lg-4" v-for="divider in getDividerByCat(cat)">
                            <div class="panel panel-default" :class="{ 'bg-success': isSelected( divider.id ) }">
                                <div class="media" style="width: 100%">
                                    <div class="media-left" style="width: 20%">
                                            <img draggable="true" class="media-object img-thumbnail" :src="divider.image" style="height:100px ">
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
            canvas: {},
            images: []
        }
    },

    methods: {

        initCanvas: function() {

            this.canvas = new fabric.Canvas('canvas');
            var canvasWidth = document.getElementById('canvas').width;
            var canvasHeight = document.getElementById('canvas').height;
            var counter = 0;
            var rectLeft = 0;
            var snap = 20; //Pixels to snap
            this.canvas.selection = true;  


            this.canvas.on(['object:moving'], function (options) {
                console.log(options);
               
            });
            this.canvas.on(['object:added'], function (options) {
                console.log(options);
            });  

            this.images = document.querySelectorAll('.media-left img');

            var self = this;
            [].forEach.call( self.images, function (img) {
                img.addEventListener('dragstart', self.handleDragStart, false);
                img.addEventListener('dragend', self.handleDragEnd, false);
            });

            // Bind the event listeners for the canvas
            var canvasContainer = document.getElementById('canvas-container');
            canvasContainer.addEventListener('dragenter', self.handleDragEnter, false);
            canvasContainer.addEventListener('dragover', self.handleDragOver, false);
            canvasContainer.addEventListener('dragleave', self.handleDragLeave, false);
            canvasContainer.addEventListener('drop', self.handleDrop, false);              
        },

        handleDragStart: function( e ) {

            [].forEach.call( this.images, function ( img ) {
                img.classList.remove('img_dragging');
            });
            e.target.classList.add('img_dragging');
           
        },

        handleDragEnd: function(e) {
            // this/e.target is the source node.
            [].forEach.call(this.images, function (img) {
                img.classList.remove('img_dragging');
            });
        },        

        handleDragEnter: function ( e ) {
            // this / e.target is the current hover target.
            console.log("ENTER",e);
            e.target.classList.add('over');

        },

        handleDragOver: function ( e ) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
            // NOTE: comment above refers to the article (see top) -natchiketa

            return false;

        },  

        handleDragLeave: function ( e ) {
            e.target.classList.remove('over'); // this / e.target is previous target element.

        }, 

        handleDrop: function ( e ) {

            // this / e.target is current target element.

            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }

            var img = document.querySelector('.media-left img.img_dragging');

            console.log('event: ', e);

            var newImage = new fabric.Image(img, {
                width: img.width,
                height: img.height,
                // Set the center of the new object based on the event coordinates relative
                // to the canvas container.
                left: e.layerX,
                top: e.layerY
            });
            this.canvas.add(newImage);



            return false;

        },  

        handleDragLeave: function ( e ) {
            e.target.classList.remove('over'); // this / e.target is previous target element.

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

        this.initCanvas();
       // this.initDividers();
    }

}

</script>
