<template>

    <!-- Container -->
    <div class="row" id="step3">
        
        <!-- Title -->
        <div class="col-lg-12">
            <h2 lang="it">Dimensioni cassetto</h2>
        </div>

        <!-- Alerts: User Warning -->
        <div class="col-lg-12">
            <div class="alert alert-warning alert-dismissible fade in"  lang="it">
                <!--<button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> --><strong lang="it">Attenzione!</strong> tutti i campi sono obbligatori ed espressi in millimetri, la larghezza deve essere compresa tra {{ config.rect_width_lower_limit}} e {{ config.rect_width_upper_limit}}, la lunghezza tra {{ config.rect_height_lower_limit }} e {{ config.rect_height_upper_limit }}, l'altezza sponda tra {{ config.shoulder_height_lower_limit }} e {{ config.shoulder_height_upper_limit }}. <br /> Larghezze superiori a {{ config.maxSuitableWidth4Bridge }} impediranno il posizionamento dell'elemento ponte orizzontale.
            </div>
        </div>
        
        <!-- Alerts: User Error -->
        <div class="col-lg-12" v-if="showAlert">
            <div class="alert alert-danger alert-dismissible fade in" id="alert" lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>Attenzione!</strong> {{ alert_message }}
            </div>
        </div>
        
        <!-- Left container "form" -->
        <div class="col-lg-4">
            
            <!-- form group -->
            <div class="form-horizontal">
                
                <!-- Width -->
                <div v-bind:class="[ 'form-group', width_OOR ? 'has-danger' : 'has-success' ]">
                  <label class="col-sm-7 control-label" lang="it">Larghezza interna cassetto</label>
                  <div class="col-sm-5">
                    <input type="text" class="form-control" id="length" aria-describedby="basic-addon1" v-model="$store.state.dimensions.width" @keyup="updateDrawer" @blur="isSuitableForHBridge" autocomplete="off">
                    <span  class="help-block">min {{ config.rect_width_lower_limit}} max {{ config.rect_width_upper_limit}}</span>
                  </div>
                </div>

                <!-- Length -->
                <div class="form-group" v-bind:class="{ 'has-danger': length_OOR, 'has-success': !length_OOR }">
                  <label class="col-sm-7 control-label" lang="it">Profondità interna cassetto</label>
                  <div class="col-sm-5">
                    <input type="text" class="form-control" id="width" aria-describedby="basic-addon2" v-model="$store.state.dimensions.length" @keyup="updateDrawer" autocomplete="off" >
                    <span class="help-block">min {{ config.rect_height_lower_limit }}  max {{ config.rect_height_upper_limit }}</span>
                  </div>
                </div>
                  
                <!-- Shoulder height -->
                <!-- Custom drawer -->
                <div class="form-group" v-if="$store.state.is_lineabox === false" v-bind:class="{ 'has-danger': shoulder_height_OOR, 'has-success': !shoulder_height_OOR }">
                  <label class="col-sm-7 control-label" lang="it">Altezza interna sponda</label>
                  <div class="col-sm-5">
                    <input type="text" class="form-control" id="depth" aria-describedby="basic-addon3" v-model="$store.state.dimensions.shoulder_height" @keyup="updateDrawer" @blur="isSuitableHeightForBridge" autocomplete="off">
                    <span class="help-block">min {{ config.shoulder_height_lower_limit }} max {{ config.shoulder_height_upper_limit }}</span>
                  </div>
                </div>
                
                <!-- Lineabox drawer -->
                <div class="form-group" v-else>

                    <div class="row">
                        <div class="col-lg-12">
                          <label class="control-label" lang="it">Altezza interna sponda</label>
                        </div>
                        <div v-for="option in config.lineabox_shoulders_height">
                          <div class="col-lg-4">
                              <div class="panel panel-default" :class="{ 'bg-success': option.value == $store.state.dimensions.shoulder_height }">
                                  <div class="panel-body" @click="setShoulderHeight( option.value )" lang="it" @blur="isSuitableHeightForBridge">{{option.text}}</div>
                              </div>
                          </div>
                        </div>
                        <span class="help-block">Per il cassetto lineabox sono disponibili 3 altezze predefinite per la sponda</span>

                    </div>

                </div>

                <!--<div class="form-group" v-else v-bind:class="{ 'has-danger': shoulder_height_OOR, 'has-success': !shoulder_height_OOR }">
                  <label for="inputPassword3" class="col-sm-7 control-label" lang="it">Altezza interna sponda</label>
                  <div class="col-sm-5" id="depth">
                      <select v-model="$store.state.dimensions.shoulder_height" @change="updateDrawer" @blur="isSuitableHeightForBridge">
                          <option v-for="option in config.lineabox_shoulders_height" :selected="option.selected ? 'selected' : ''" v-bind:value="option.value">{{option.text}}</option>
                      </select>
                      <span class="help-block">Per il cassetto lineabox sono disponibili 3 altezze predefinite per la sponda</span>
                  </div>
                </div>-->

            </div>
        </div>

        <!-- Canvas container -->
        <div class="col-lg-7" >
            <div class="col-lg-12" id="animation"></div>
        </div>
        
        <!-- Next button -->
        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
        </div>

    </div>

</template>

<script>
/**
 * Vue object managing drawer dimensions inputs
 * Uses Two.js for graphic representation of the object ( drawer )
 * @type {Vue}
 */
export default {

    /**
     * Object data
     * @type {Object}
     */
    data: function() { 

      return {

          // # Container element
          container: {},

          // # Config vars
          config: {

              // # General settings
              line_stroke: '#222222',
              text_stroke: '#222222',
              font_size: 12,
              font_family: 'Raleway',
              font_weight: 'normal',
              measure_label: "mm",

              // # Rect related info
              rect_stroke: '#999999',
              rect_linewidth: 7,
              rect_width_upper_limit: 1800,
              rect_height_upper_limit: 900,
              rect_width_lower_limit: 102,
              rect_height_lower_limit: 240,
              drawer_text: Vue.i18n.translate("Cassetto"),

              // # Shoulder settings
              shoulder_stroke: '#999999',
              shoulder_linewidth: 7,
              shoulder_text: Vue.i18n.translate("step3.shoulder_label"),
              shoulder_height_upper_limit: 250,
              shoulder_height_lower_limit: 45.4, 

              // # Lineabox shoulder fixed measures ( height ) 
              lineabox_shoulders_height: [
                  { text: "77 - 45.4 effettivi", value: 45.4, selected: true },
                  { text: "104 - 72 effettivi", value: 72, selected: false },
                  { text: "180 - 148 effettivi", value: 148, selected: false }
              ],

              // # Bridge related limits
              max_suitable_width_4_Hbridge: 1200,

              // # Base scale factor
              base_scale_factor: 10,

              // # Pixel Multiplier
              ratio: 3
          },

          // # Out of range flags
          width_OOR: false,
          length_OOR: false,
          shoulder_height_OOR: false, 

          // # Two instance
          two: {},

          // # Rect objects
          rect: {},
          hor_line_rect: {},
          hor_text_rect: "",
          vert_text_rect: {},
          vert_line_rect: {},
          drawer_text: {},

          // # Shoulder objects
          shoulder: {},
          hor_line_shoulder: {},
          hor_text_shoulder: "",
          vert_text_shoulder: {},
          vert_line_shoulder: {},
          shoulder_text: {}

        }
    },

    methods: {

        /**
         * Inits the Two object container and every shape needed in its initial state
         * rectangle ( drawer ) is used as a reference for each other object drown
         * @return {void}
         */
        initTwo: function () {

            // # Define ratio
            this.ratioComputer();

            // # Container init
            this.container = document.getElementById( 'animation' );

            // # TWO Instance, autostart means we do not have to reupdate the canvas each time there
            // # is an update on a shape/path/text
            this.two = new Two( { autostart: true } ).appendTo( this.container );

            // # Drawer
            this.makeRect( this.mm2Pixel( this.$store.state.dimensions.width ) / 2, 
                           100, 
                           this.mm2Pixel( this.$store.state.dimensions.width ), 
                           this.mm2Pixel( this.$store.state.dimensions.length ), 
                           20, 
                           50 + this.mm2Pixel( this.$store.state.dimensions.length ) / 2 );
            
            // # Get drawer dimensions
            var rectObj = this.rect.getBoundingClientRect();

            // # Width line ( drawer )
            this.makeRectWidthInfoLine( rectObj.left, 30, rectObj.right, 30 );

            // # Width text ( drawer )
            this.makeRectWidthInfoText( ( rectObj.width / 2 ) + rectObj.left, 15 );

            // # Length line ( drawer )
            this.makeRectLengthInfoLine( rectObj.right + 20, rectObj.top, rectObj.right + 20, rectObj.bottom );

            // # Length text ( drawer )
            this.makeRectLengthInfoText( rectObj.right + 30,  ( rectObj.height / 2 ) + rectObj.top );

            // # Drawer label text
            this.makeDrawerLabel( rectObj.width / 2 + rectObj.left, rectObj.height / 2 + rectObj.top );

            // # Shoulder redraw                
            this.makeShoulder(  rectObj.left + ( this.mm2Pixel( this.$store.state.dimensions.length ) / 2 ) + 5, 
                                rectObj.bottom + 40 + ( this.mm2Pixel( this.$store.state.dimensions.shoulder_height ) ) / 2, 
                                this.$store.state.dimensions.length, 
                                this.$store.state.dimensions.shoulder_height );

            // # Get drawer dimensions
            var shoulderObj = this.shoulder.getBoundingClientRect();

            // # Width line ( shoulder )
            this.makeShoulderWidthInfoLine( shoulderObj.left, 
                                            shoulderObj.bottom + 20, 
                                            shoulderObj.right,
                                            shoulderObj.bottom + 20 );

            // # Width text ( shoulder )
            this.makeShoulderWidthInfoText( parseInt( shoulderObj.width ) / 2 + 20,
                                            shoulderObj.bottom + 30 );

            // # Length line ( shoulder )
            this.makeShoulderLengthInfoLine( shoulderObj.right + 20, 
                                             shoulderObj.top, 
                                             shoulderObj.right + 20, 
                                             shoulderObj.bottom );

            // # Length text ( shoulder )
            this.makeShoulderLengthInfoText( shoulderObj.right + 30, 
                                           ( shoulderObj.height / 2 ) + shoulderObj.top  );            

            // # Shoulder label
            this.makeShoulderLabel(  shoulderObj.width / 2 + shoulderObj.left, shoulderObj.height / 2 + shoulderObj.top );
        },

        /**
         * Computes the correct ratio based on container width
         * @return {void}
         */
        ratioComputer: function() {

            // # Container available width
            var available_width = $( "#animation" ).width();

            // # Ratio computed using max allowed rect width
            var computed_ratio = ( available_width / this.config.rect_width_upper_limit );

            // # Secure dimensions tuning
            this.config.ratio = computed_ratio - ( computed_ratio / 4 );
        },

        /**
         * Converts any real dimension into a suitable pixel rapresentation of it
         * Conversion is based of a scale factor and a pixel ratio ( should be related to the device screen dimension )  
         * @param  {double} mm input in millimeters
         * @return {int}    computed ( adapted ) integer output
         */
        mm2Pixel: function ( mm ) {
            
            try {
                //return Math.floor(  ( mm / this.config.base_scale_factor ) * this.config.ratio );
                return Math.floor(  mm  * this.config.ratio );
            } catch ( e ) {
                // # Use a suitable default value
                return 250;
            }   
        },

        /**
         * Check width dimension limits and sets the related flag
         * @return {bool} true if dimension is OOR
         */
        widthOutOfRange: function() {
            
            // # Default value
            this.width_OOR = true;
            
            // # Upper limit check
            if( this.$store.state.dimensions.width > this.config.rect_width_upper_limit ) {
                return true;
            }

            // # Lower limit check
            if( this.$store.state.dimensions.width < this.config.rect_width_lower_limit ) {
                return true;
            }            
            
            // # In range
            this.width_OOR = false;

            return false;
        },

        /**
         * Check if width dimension exceeds horizontal bridge max dimension limit
         * @return {bool} true if dimension is OOR for the horizontal bridge to be available
         */
        isSuitableForHBridge: function() {

            // # Constraint check
            if( this.$store.state.dimensions.width > this.config.max_suitable_width_4_Hbridge ) {
                
                // # Show modal alert
                $( "#error-modal" ).find('.modal-body').text( "La larghezza inserita non permetterà l'inserimento di un elemento ponte" );
                $( '#error-modal' ).modal();
                
                // # Horizontal bridge will NOT be available
                this.$store.commit( "isSuitableForHBridge", false );
                return false;
            }

            // # Horizontal bridge will be available
            this.$store.commit( "isSuitableForHBridge", true );
            return true;
        },

        /**
         * Check if shoulder_height dimension exceeds horizontal bridge max dimension limit
         * @return {bool} true if dimension is OOR for the horizontal bridge to be available
         */
        isSuitableHeightForBridge: function() {

            // # Drawer type check
            // # If is a custom drawer
            if( Configuration.drawertype == 4 ) {

                // # Under 70 mm bridge is not allowed
                if( this.$store.state.dimensions.shoulder_height < 70 ) {

                    $( "#error-modal" ).find('.modal-body').text( "L'altezza inserita per la sponda interna non permetterà l'inserimento di un elemento ponte" );
                    $( '#error-modal' ).modal();

                    // # Bridge won't be available
                    this.$store.commit( "isSuitableHeightForBridge", false );
                    return false;
                }

                // # Bridge will be available
                this.$store.commit( "isSuitableHeightForBridge", true );
                return true;
            }

            // # LineaBox drawers
            // # Under 71.5 mm bridge is not allowed
            if( this.$store.state.dimensions.shoulder_height < 71.5 ) {
                $( "#error-modal" ).find('.modal-body').text( "L'altezza inserita per la sponda interna non permetterà l'inserimento di un elemento ponte" );
                $( '#error-modal' ).modal();
                
                // # Bridge won't be available
                this.$store.commit( "isSuitableHeightForBridge", false );
                return false;
            }

            // # Bridge will be available
            this.$store.commit( "isSuitableHeightForBridge", true );
            return true;
        },        


        /**
         * Check length dimension limits and sets the related flag
         * @return {bool} true if dimension is OOR
         */
        lengthOutOfRange: function() {
            
            // # Default value
            this.length_OOR = true;

            // # Upper limit check
            if( this.$store.state.dimensions.length > this.config.rect_height_upper_limit ) {
                return true;
            }

            // # Lower limit check
            if( this.$store.state.dimensions.length < this.config.rect_height_lower_limit ) {
                return true;
            }            
            
            // # In range
            this.length_OOR = false;

            return false;
        },

        /**
         * Check shoulder height dimension limits and sets the related flag
         * @return {bool} true if dimension is OOR
         */
        shoulderHeightOutOfRange: function() {
            
            // # Default value
            this.shoulder_height_OOR = true;

            // # Upper limit check
            if( this.$store.state.dimensions.shoulder_height > this.config.shoulder_height_upper_limit ) {
                return true;
            }

            // # Lower limit check
            if( this.$store.state.dimensions.shoulder_height < this.config.shoulder_height_lower_limit ) {
                return true;
            }            
            
            // # In range
            this.shoulder_height_OOR = false;

            return false;
        },  

        /**
         * [setShoulderHeight description]
         * @param {[type]} val [description]
         */
        setShoulderHeight: function( val ) {
            this.$store.commit( "setShoulderHeight", val );
            this.updateDrawer();
        }, 

        /**
         * Check dimensions constraints
         * @return {bool} true if all constraint are satisfied
         */
        checkChoice: function() {

            // # Check width
            if( !this.$store.state.dimensions.width ) {
                this.width_OOR = true;
                return false;
            }

            // # Check length
            if( !this.$store.state.dimensions.length ) {
                this.length_OOR = true;
                return false;
            }

            // # Check shoulder_height
            if( !this.$store.state.dimensions.shoulder_height ) {
                this.shoulder_height_OOR = true;
                return false;
            }

            // # Check Out of Bounds
            if( this.widthOutOfRange() || this.lengthOutOfRange() || this.shoulderHeightOutOfRange() ) {
                 return false;
            }

            // # Dimensions inputs satisfied constraints
            return true;
        },         

        /**
         * Draws shoulder width info ( upper ) line
         * @param  {int} x1 x start coord
         * @param  {int} y1 y start coord
         * @param  {int} x2 x end coord
         * @param  {int} y2 y end coord
         * @return {void}
         */
        makeShoulderWidthInfoLine: function( x1, y1, x2, y2 ) {

            // # Draw the line
            this.hor_line_shoulder = this.two.makeLine( x1, y1, x2, y2 );
            
            // # Assign a stroke                                 
            this.hor_line_shoulder.stroke = this.config.line_stroke;  
        },

        /**
         * Draws shoulder width info ( upper ) text
         * @param  {int} x x coord
         * @param  {int} y y coord
         * @return {void} 
         */
        makeShoulderWidthInfoText: function( x, y ) {

            // # Draw the text
            this.hor_text_shoulder = this.two.makeText( this.$store.state.dimensions.length + " " +  this.config.measure_label, 
                                                        x, 
                                                        y, 
                                                        this.config.font_weight );
            // # Text settings
            this.hor_text_shoulder.size = this.config.font_size;
            this.hor_text_shoulder.stroke = this.config.text_stroke;
            this.hor_text_shoulder.family = this.config.font_family; 
        },

        /**
         * Draws shoulder length info ( right ) line
         * @param  {int} x1 x start coord
         * @param  {int} y1 y start coord
         * @param  {int} x2 x end coord
         * @param  {int} y2 y end coord
         * @return {void}
         */
        makeShoulderLengthInfoLine: function( x1, y1, x2, y2 ) {

            // # Draw the line
            this.vert_line_shoulder = this.two.makeLine( x1, y1, x2, y2 );

            // # Assign a stroke         
            this.vert_line_shoulder.stroke = this.config.line_stroke;
        },

        /**
         * Draws shoulder length info ( right ) text
         * @param  {int} x x coord
         * @param  {int} y y coord
         * @return {void} 
         */
        makeShoulderLengthInfoText: function( x, y ) {

            // # Draw the text
            this.vert_text_shoulder = this.two.makeText( this.$store.state.dimensions.shoulder_height + " " + this.config.measure_label, 
                                                         x, 
                                                         y,
                                                         this.config.font_weight );

            // # Text settings
            this.vert_text_shoulder.size = this.config.font_size;
            this.vert_text_shoulder.stroke = this.config.text_stroke;
            this.vert_text_shoulder.family = this.config.font_family;

            // # Rotate text 90 degrees clockwise
            this.vert_text_shoulder.rotation = Math.PI/2;
        },     

        /**
         * Draws the shoulder label
         * @param  {int} x x coord
         * @param  {int} y y coord
         * @return {void} 
         */
        makeShoulderLabel: function( x, y ) {

            // # Draw the text
            this.shoulder_text = this.two.makeText( this.config.shoulder_text,
                                                    x, 
                                                    y, 
                                                    this.config.font_weight );
            // # Text settings
            this.shoulder_text.size = this.config.font_size;
            this.shoulder_text.stroke = this.config.text_stroke;
            this.shoulder_text.family = this.config.font_family;
        },

        /**
         * Draws a rectangle ( Drawer )
         * @param  {int} x             x coord
         * @param  {int} y             y coord
         * @param  {int} width         rect width
         * @param  {int} length        rect length
         * @param  {int} translation_x x translation
         * @param  {int} translation_y y translation
         * @return {void}
         */
        makeRect: function( x, y, width, length, translation_x, translation_y ) {

            // # Draw the shape ( rectangle )
            this.rect = this.two.makeRectangle( x, y, width, length );

            // # Shape settings
            this.rect.linewidth = this.config.rect_linewidth;
            this.rect.stroke = this.config.rect_stroke;

            // # Translations
            this.rect.translation.x += translation_x;
            if( translation_y > 0 ) {
                this.rect.translation.y = translation_y;
            }
        },

        /**
         * Draws rect width info ( upper ) line
         * @param  {int} x1 x start coord
         * @param  {int} y1 y start coord
         * @param  {int} x2 x end coord
         * @param  {int} y2 y end coord
         * @return {void}
         */
        makeRectWidthInfoLine: function( x1, y1, x2, y2 ) {

            // # Draw the line
            this.hor_line_rect = this.two.makeLine( x1, y1, x2, y2 );

            // # Assign a stroke
            this.hor_line_rect.stroke = this.config.line_stroke;           
        },

        /**
         * Draws rect width info ( upper ) text
         * @param  {int} x x coord
         * @param  {int} y y coord
         * @return {void} 
         */
        makeRectWidthInfoText: function( x, y ) {
           
            // # Draw the text
            this.hor_text_rect = this.two.makeText( this.$store.state.dimensions.width + " " + this.config.measure_label, x, y, this.config.font_weight );

            // # Text settings
            this.hor_text_rect.size = this.config.font_size;
            this.hor_text_rect.stroke = this.config.text_stroke;
            this.hor_text_rect.family = this.config.font_family; 
        },

        /**
         * Draws rect length info ( right ) line
         * @param  {int} x1 x start coord
         * @param  {int} y1 y start coord
         * @param  {int} x2 x end coord
         * @param  {int} y2 y end coord
         * @return {void}
         */
        makeRectLengthInfoLine: function( x1, y1, x2, y2 ) {
            
            // # Draw the line
            this.vert_line_rect = this.two.makeLine( x1, y1, x2, y2 );

            // # Assign a stroke
            this.vert_line_rect.stroke = this.config.line_stroke;
        },

        /**
         * Draws rect length info ( right ) text
         * @param  {int} x x coord
         * @param  {int} y y coord
         * @return {void} 
         */
        makeRectLengthInfoText: function( x, y ) {
            
            // # Draw the text
            this.vert_text_rect = this.two.makeText( this.$store.state.dimensions.length + " " + this.config.measure_label, x, y, this.config.font_weight );

            // # Text settings
            this.vert_text_rect.size = this.config.font_size;
            this.vert_text_rect.stroke = this.config.text_stroke;
            this.vert_text_rect.family = this.config.font_family;
            this.vert_text_rect.rotation = Math.PI/2;
        },

        /**
         * Draws a rectangle ( Shoulder )
         * @param  {int} x             x coord
         * @param  {int} y             y coord
         * @param  {int} width         rect width
         * @param  {int} length        rect length
         * @return {void}
         */
        makeShoulder: function( x, y, width, length ) {

            // # Draw the shape ( rectangle )
            this.shoulder = this.two.makeRectangle( x, y, this.mm2Pixel( width ), this.mm2Pixel( length ) );

            // # Shape settings
            this.shoulder.linewidth = this.config.shoulder_linewidth;
            this.shoulder.stroke = this.config.shoulder_stroke;
        },

        /**
         * Draws the drawer label
         * @param  {int} x x coord
         * @param  {int} y y coord
         * @return {void} 
         */
        makeDrawerLabel: function( x, y ) {

            // # Draw the text
            this.drawer_text = this.two.makeText( this.config.drawer_text, x, y, this.config.font_weight );

            // # Text settings
            this.drawer_text.size = this.config.font_size;
            this.drawer_text.stroke = this.config.text_stroke;
            this.drawer_text.family = this.config.font_family;
        },

        /**
         * Updates Drawer related objects on each dimension data change
         * @return {void}
         */
        updateDrawer: function() {

            // # Skip when there are less than ( x - 2 ) max digit
            if( this.$store.state.dimensions.width.length < 2 || 
                this.$store.state.dimensions.length.length < 2 || 
                this.$store.state.dimensions.shoulder_height.length < 1 ) {
                return;
            }

            // # dimensions check
            if( ! this.checkChoice() ) {
                return false;
            }

            // # Clean up if any previous error stills
            this.width_OOR = false; this.length_OOR = false; this.shoulder_height_OOR = false;

            // # Remove to redraw
            this.two.clear();

            // # Drawer
            this.makeRect( this.mm2Pixel( this.$store.state.dimensions.width ) / 2, 
                           100, 
                           this.mm2Pixel( this.$store.state.dimensions.width ), 
                           this.mm2Pixel( this.$store.state.dimensions.length ), 20, 
                           50 + this.mm2Pixel( this.$store.state.dimensions.length ) / 2 );

            // # Get width line dimensions
            var width_line_bounding_client_rect = this.hor_line_rect.getBoundingClientRect();

            // # Get drawer dimensions
            var rectObj = this.rect.getBoundingClientRect();

            // # Width line ( drawer )
            this.makeRectWidthInfoLine( rectObj.left, 30, rectObj.right, 30 );

            // # Width text ( drawer )
            this.makeRectWidthInfoText( ( rectObj.width / 2 ) + rectObj.left, 15 );

            // # Length line ( drawer )
            this.makeRectLengthInfoLine( rectObj.right + 20, rectObj.top, rectObj.right + 20, rectObj.bottom );

            // # Length text ( drawer )
            this.makeRectLengthInfoText( rectObj.right + 30,  ( rectObj.height / 2 ) + rectObj.top );

            // # Drawer label text
            this.makeDrawerLabel( rectObj.width / 2 + rectObj.left, rectObj.height / 2 + rectObj.top );

            // # Update shoulder cause length is a dimension also there
            this.updateShoulder();
        },

        /**
         * Updates Shoulder objects on data change
         * @return {[type]} [description]
         */
        updateShoulder: function() {

            var rectObj = this.rect.getBoundingClientRect();

            // # Shoulder redraw                
            this.makeShoulder(  rectObj.left + ( this.mm2Pixel( this.$store.state.dimensions.length ) / 2 ) + 5, 
                                rectObj.bottom + 40 + ( this.mm2Pixel( this.$store.state.dimensions.shoulder_height ) ) / 2, 
                                this.$store.state.dimensions.length, 
                                this.$store.state.dimensions.shoulder_height);

            // # Get drawer dimensions
            var shoulderObj = this.shoulder.getBoundingClientRect();

            // # Width line ( shoulder )
            this.makeShoulderWidthInfoLine( shoulderObj.left, 
                                            shoulderObj.bottom + 20, 
                                            shoulderObj.right,
                                            shoulderObj.bottom + 20 );

            // # Width text ( shoulder )
            this.makeShoulderWidthInfoText( parseInt( shoulderObj.width ) / 2 + 20,
                                            shoulderObj.bottom + 30 );

            // # Length line ( shoulder )
            this.makeShoulderLengthInfoLine( shoulderObj.right + 20, 
                                             shoulderObj.top, 
                                             shoulderObj.right + 20, 
                                             shoulderObj.bottom );

            // # Length text ( shoulder )
            this.makeShoulderLengthInfoText( shoulderObj.right + 30, 
                                           ( shoulderObj.height / 2 ) + shoulderObj.top  );            

            // # Shoulder label
            this.makeShoulderLabel(  shoulderObj.width / 2 + shoulderObj.left, shoulderObj.height / 2 + shoulderObj.top );

        },

        /**
         * Final check ( "Next" button click )
         * @return {bool} true if checks are ok
         */
        check: function() {

            // # Check inputs
            if( !this.checkChoice() ) {

                // # Show error modal and move the user at the top of this step
                $( "#error-modal" ).find('.modal-body').text( "Controlla i valori inseriti" );
                $( '#error-modal' ).modal();    

                // # Step3 has errors
                this.$store.commit( "setThreecompleted", false );

                // # Stay here and fix it
                return false;  
            }

            // # Step3 is completed, everything's ok
            this.$store.commit( "setThreecompleted", true );

            // # Drawer type check
            // # If is a custom drawer
            if( this.$store.state.drawertype == 4 ) {

                // # Over 70 mm bridge is allowed, go to the bridge step
                if( this.$store.state.dimensions.shoulder_height >= 72 ) {
                    this.$router.push({ path: '/split/stepponte' });
                    return false;
                }

                // # Under 70 mm no bridge allowed, skip the bridge choice step
                this.$router.push({ path: '/split/step4' });
                return true;
            }

            // # Lineabox choice
            if( this.$store.state.dimensions.shoulder_height >= 45.4 ) { // 45.5 means choice: 77
                // # bridge is allowed, go to the bridge step
                this.$router.push({ path: '/split/stepponte' });
                return false;
            }
            
            // # no bridge allowed, skip the bridge choice step
            this.$router.push({ path: '/split/step4' });
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
        })
    },     

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () { 

        // # Log mount 
        console.log( "Dimensions choice mounted" );

        // # Init canvas
        this.initTwo();
    }

}

</script>