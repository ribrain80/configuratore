<template>

<!-- Container -->
<div class="container-fluid" id="step3">

        <!-- Alerts: User Warning -->
        <div class="row top1" style="display:none;">
            <div class="col-lg-12">
                <div class="alert alert-warning alert-dismissible fade in" >
                    <strong>{{ 'attenzione' | translate }}</strong> 
                    {{ $t('step3.advice', { Rwll: config.rect_width_lower_limit , Rwul: config.rect_width_upper_limit, Rhll: config.rect_length_lower_limit, Rhul: config.rect_length_upper_limit, Shll: config.shoulder_height_lower_limit, Shup : config.shoulder_height_upper_limit, maxw4b: getMaxWidth4BridgeByDrawerType } ) }} 
                </div>
            </div>
        </div>
        
        <!-- Alerts: User Error -->
        <div class="row top1">
          <div class="col-lg-12" v-if="showAlert">
              <div class="alert alert-danger alert-dismissible fade in" id="alert">
                  <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>{{ 'attenzione' | translate }}</strong> {{ alert_message }}
              </div>
          </div>
        </div>
        
        <div class="row">
          
          <!-- Left container "form" -->
          <div class="col-lg-6">
              
              <!-- form group -->
              <div class="form-horizontal">
                  
                  <!-- Width -->
                  <div class="form-group">

                    <label class="col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 control-label">
                      <a class="i-icon pull-left" id="width-popover" rel="popover" data-content="">&nbsp;</a> 
                      <span class="pull-left"><strong>LA</strong> - {{ 'step3.drawer_width_label' | translate }}</span>
                    </label>

                    <div :class="['col-lg-5', 'col-md-5' ]">

                      <div class="row">
                        <div class="col-lg-10"><input type="text" :class="[ 'form-control', 'text-right', width_OOR ? 'text-danger' : 'text-success']" @focus.once="resetAdvice()" v-model="$store.state.dimensions.width" @keyup="updateDrawer" @blur="isSuitableForHBridge" autocomplete="off" />
                        </div>
                        <div class="col-lg-2 input-mm">mm</div>
                      </div>

                        <span class="help-block pull-right"><span :class="[ 'limit-helper', isWidthUnderMin ? 'text-danger' : 'text-muted']">min {{ config.rect_width_lower_limit}} </span> <span :class="[ 'limit-helper', isWidthOverMax ? 'text-danger' : 'text-muted']">max {{ config.rect_width_upper_limit}}</span></span>

                    </div>

                    <div class="col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 pull-left">
                      <img src="/images/others/step-3/LA_lineabox_3_lati.png" class="img-responsive img-rounded" id="width-info-image"/>
                    </div>

                  </div>

                  <!-- Length -->
                  <div class="form-group">

                    <label class="col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 control-label pull-left">
                      <a class="i-icon pull-left" id="length-popover" rel="popover" data-content="">&nbsp;</a> 
                      <span class="pull-left"><strong>PS</strong> - {{ 'step3.drawer_length_label' | translate }}</span>
                    </label>

                    <div :class="['col-lg-5', 'col-md-5']">


                      <div class="row">
                        <div class="col-lg-10"><input type="text" :class="[ 'form-control', 'text-right', length_OOR ? 'text-danger' : 'text-success']" @focus.once="resetAdvice()" v-model="$store.state.dimensions.length" @keyup="updateDrawer" autocomplete="off" />
                        </div>
                        <div class="col-lg-2 input-mm">mm</div>
                      </div>

                      
                      <span class="help-block pull-right"><span :class="[ 'limit-helper', isLengthUnderMin ? 'text-danger' : 'text-muted']">min {{ config.rect_length_lower_limit }}</span> <span :class="[ 'limit-helper', isLengthOverMax ? 'text-danger' : 'text-muted']">max {{ config.rect_length_upper_limit }}</span></span>
                    </div>

                    <div class="col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 pull-left">
                      <img src="/images/others/step-3/PS_lineabox_3_lati.png" class="img-responsive img-rounded" id="length-info-image"/>
                    </div>   

                  </div>
                    
                  <!-- Shoulder height -->
                  <!-- Custom drawer -->
                  <div v-if="$store.state.is_lineabox === false" class="form-group">

                    <label class="col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 control-label pull-left">
                      <a class="i-icon pull-left" id="sh-popover" rel="popover">&nbsp;</a> 
                      <span class="pull-left"><strong>HA</strong> - {{ 'step3.drawer_edge_height_label' | translate }}</span>
                    </label>

                    <div :class="['col-lg-5', 'col-md-5']">
                      
                      <div class="row">
                        <div class="col-lg-10"><input type="text" :class="[ 'form-control', 'text-right', shoulder_height_OOR ? 'text-danger' : 'text-success']" @focus.once="resetAdvice()" v-model="$store.state.dimensions.shoulder_height" @keyup="updateDrawer" @blur="isSuitableHeightForBridge" autocomplete="off" />
                        </div>
                        <div class="col-lg-2 input-mm">mm</div>
                      </div>

                      <span class="help-block pull-right"><span :class="[ 'limit-helper', isShoulderHeightUnderMin ? 'text-danger' : 'text-muted']">min {{ config.shoulder_height_lower_limit }}</span> <span :class="[ 'limit-helper', isShoulderHeightOverMax ? 'text-danger' : 'text-muted']">max {{ config.shoulder_height_upper_limit }}</span></span>

                    </div>

                    <div class="col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 pull-left">
                      <img src="/images/others/step-3/HA_cassetto_generico.png" class="img-responsive img-rounded" id="sh-info-image"/>
                    </div>  

                  </div>
                  
                  <!-- Lineabox drawer -->
                  <div class="form-group" v-else>

                      <div class="row">

                          <div class="col-lg-12">
                            <label class="col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 control-label pull-left">
                              <a class="i-icon pull-left" id="sh-popover" rel="popover" data-content="">&nbsp;</a> 
                              <span class="pull-left"><strong>HA</strong> - {{ 'step3.drawer_edge_height_label' | translate }}</span>
                            </label>
                          </div>
                      </div>

                      <div class="row top1">
                        <div class="col-lg-12">
                          <div v-for="option in config.lineabox_shoulders_height">
                              <div class="col-lg-4">
                                  <div :class="[ 'panel panel-default', option.value == $store.state.dimensions.shoulder_height ? 'border-selected' : 'border-deselected' ]">
                                      <div class="panel-body" @focus.once="resetAdvice()" 
                                           @click="setShoulderHeight( $event, option.value )" 
                                           @blur="isSuitableHeightForBridge">
                                          <img :src="'/images/others/step-3/HA_lineabox_'+option.dimension+'.png'" 
                                               :class="['img', 'img-responsive', 'HA_' + option.dimension, option.value == $store.state.dimensions.shoulder_height ? 'selected_HA' : '' ]"/>
                                      </div>
                                  </div>
                                  <span :class="[ 'help-block', 'text-center', 'ha-lineabox',  option.value == $store.state.dimensions.shoulder_height ? 'text-success' : 'text-danger' ]">{{option.dimension}} mm</span>
                              </div>
                              
                          </div>
                        </div>

                    </div>
                </div>
          </div>
          </div>
          <!-- Canvas container -->
          <div class="col-lg-6 center-block" >
              <div id="animation"></div>
          </div>
          
        </div>

        <div class="container-fluid">
          <div class="row top2">
              
              <div class="col-lg-2 col-md-2 pull-left">
                  <router-link to="/split/step2" tag="button" class="btn btn-danger btn-back">{{ 'back' | translate }}</router-link>
              </div>
              <div class="col-lg-2 col-md-2 pull-left">
                  <button class="btn btn-danger btn-reset" @click="reset">{{ 'reset' | translate }}</button>
              </div>            
              <div class="col-lg-2 col-md-2 pull-right">
                  <button class="btn btn-danger" @click.stop.prevent="check">{{ 'avanti' | translate }}</button>
              </div>

          </div>
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
              font_family: 'FranklinGothicURW-Boo',
              font_weight: 300,
              measure_label: "mm",

              // # Rect related info
              rect_stroke: '#999999',
              rect_linewidth: 7,
              rect_width_upper_limit: 1800,
              rect_length_upper_limit: 900,
              rect_width_lower_limit: 102,
              rect_length_lower_limit: 240,
              drawer_text: "Cassetto",

              // # Shoulder settings
              shoulder_stroke: '#999999',
              shoulder_linewidth: 7,
              shoulder_text: "step3.shoulder_label",
              shoulder_height_upper_limit: 250,
              shoulder_height_lower_limit: 45.5,

              // # Lineabox shoulder fixed measures ( height ) 
              lineabox_shoulders_height: [
                  { dimension: "77", text: "77 - 45.5", value: this.$store.state.dimensions.actual_lineabox_shoulder_height_LOW, selected: true },
                  { dimension: "104", text: "104 - 72" , value: this.$store.state.dimensions.actual_lineabox_shoulder_height_MID, selected: false },
                  { dimension: "180", text: "180 - 148" , value: this.$store.state.dimensions.actual_lineabox_shoulder_height_HIGH, selected: false }
              ],

              // # Bridge related limits
              max_suitable_width_4_Hbridge: 1200,

              // # Base scale factor
              base_scale_factor: 10,

              // # Pixel Multiplier
              ratio: 3,

              // # Shapes top margin
              standard_top_margin: 2,
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
          shoulder_text: {},

          // # Advice
          advice_accepted: false,

          sh_dim: ""

        }
    },

    computed: {

        /**
         * Computes actual max width depending on drawer type selected
         * @return {Number}
         */
        getMaxWidth4BridgeByDrawerType: function () {
          return !this.$store.state.is_lineabox ? this.config.max_suitable_width_4_Hbridge : parseFloat( this.config.max_suitable_width_4_Hbridge ) - 12
        },

        /**
         * Checks width upper limit
         * @return {Boolean}
         */
        isWidthOverMax: function() {
            // # Upper limit check
            return this.$store.state.dimensions.width > this.config.rect_width_upper_limit;
        },

        /**
         * Checks width lower limit
         * @return {Boolean}
         */
        isWidthUnderMin: function() {
            return this.$store.state.dimensions.width < this.config.rect_width_lower_limit;
        },

        /**
         * Checks length upper limit
         * @return {Boolean}
         */        
        isLengthOverMax: function() {
            return this.$store.state.dimensions.length > this.config.rect_length_upper_limit;
        },

        /**
         * Checks length lower limit
         * @return {Boolean}
         */        
        isLengthUnderMin: function() {
            return this.$store.state.dimensions.length < this.config.rect_length_lower_limit;
        },

        /**
         * Checks shoulder_height upper limit
         * @return {Boolean}
         */        
        isShoulderHeightOverMax: function() {
            return this.$store.state.dimensions.shoulder_height > this.config.shoulder_height_upper_limit;
        },

        /**
         * Checks shoulder_height lower limit
         * @return {Boolean}
         */        
        isShoulderHeightUnderMin: function() {
            return this.$store.state.dimensions.shoulder_height < this.config.shoulder_height_lower_limit;
        }
    },

    watch: {
        sh_dim: function() {
          console.log( "chamged" );
        }
    },

    /**
     * Object methods
     * @type {Object}
     */
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
            this.two = new Two( { autostart: true, width: $( "#animation" ).width() - 40 } ).appendTo( this.container );

            // # Drawer
            this.makeRect( this.mm2Pixel( this.$store.state.dimensions.width ) / 2, 
                           this.config.standard_top_margin, 
                           this.mm2Pixel( this.$store.state.dimensions.width ), 
                           this.mm2Pixel( this.$store.state.dimensions.length ), 
                           20, 
                           this.config.standard_top_margin + this.mm2Pixel( this.$store.state.dimensions.length ) / 2 );
            
            // # Get drawer dimensions
            var rectObj = this.rect.getBoundingClientRect();

            // # Width line ( drawer )
            this.makeRectWidthInfoLine( rectObj.left, rectObj.bottom + 20, rectObj.right, rectObj.bottom + 20 );

            // # Width text ( drawer )
            this.makeRectWidthInfoText( ( rectObj.width / 2 ) + rectObj.left, rectObj.bottom + 30 );

            // # Drawer label text
            this.makeDrawerLabel( rectObj.width / 2 + rectObj.left, rectObj.height / 2 + rectObj.top );

            this.makeShoulder(  rectObj.right + 30, 
                                this.config.standard_top_margin + this.mm2Pixel( this.$store.state.dimensions.length ) / 2, 
                                this.$store.state.dimensions.shoulder_height , 
                                this.$store.state.dimensions.length
                             );                                

            // # Get drawer dimensions
            var shoulderObj = this.shoulder.getBoundingClientRect();

            // # Width line ( shoulder )
            this.makeShoulderWidthInfoLine( shoulderObj.left, 
                                            shoulderObj.bottom + 20, 
                                            shoulderObj.right,
                                            shoulderObj.bottom + 20 );

            // # Width text ( shoulder )
            this.makeShoulderWidthInfoText( parseInt( shoulderObj.left ) + ( shoulderObj.width / 2 ) + 10,
                                            shoulderObj.bottom + 30 );

            // # Length line ( shoulder )
            this.makeShoulderLengthInfoLine( shoulderObj.right + 20, 
                                             shoulderObj.top, 
                                             shoulderObj.right + 20, 
                                             shoulderObj.bottom );

            // # Length text ( shoulder )rectObj.right + 30,  ( rectObj.height / 2 ) + rectObj.top
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
            var computed_ratio = parseFloat( available_width / this.config.rect_width_upper_limit ).toFixed( 2 );

            console.log( "ratio computed" + computed_ratio  );

            // # Secure dimensions tuning
            this.config.ratio = parseFloat( computed_ratio - ( computed_ratio / 2.5 ) ).toFixed( 2 );

            console.log( "config ratio adjusted" + this.config.ratio  );
        },

        /**
         * Converts any real dimension into a suitable pixel rapresentation of it
         * Conversion is based of a scale factor and a pixel ratio ( should be related to the device screen dimension )  
         * @param  {double} mm input in millimeters
         * @return {int}    computed ( adapted ) integer output
         */
        mm2Pixel: function ( mm ) {
            
            try {
                return Math.floor( mm  * this.config.ratio );
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
            if( this.$store.state.dimensions.width > this.getMaxWidth4BridgeByDrawerType ) {

                // # Don't show the modal if the width is > max width ( there is a previous error )
                if( !this.isWidthOverMax ) {

                    // # Show modal alert
                    $( "#error-modal" )
                    .find( '.modal-body' )
                    .text( Vue.i18n.translate( "step3.modal.too_large", { max: this.getMaxWidth4BridgeByDrawerType } ) );

                    $( '#error-modal' ).modal();  
                }               
                             
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

            // # Don't show the modal if the shoyulder height is > max shoulder height ( there is a previous error )
            if( this.$store.state.dimensions.shoulder_height > this.config.shoulder_height_upper_limit ) {

              // # In any case reset it
              this.$store.commit( "isSuitableHeightForBridge", false );

              return false;
            }

            // # Drawer type check
            // # If is a custom drawer
            if( this.$store.state.drawertype == 4 ) {

                // # Under 72 mm bridge is not allowed
                if( this.$store.state.dimensions.shoulder_height < this.$store.state.dimensions.actual_lineabox_shoulder_height_MID ) {

                    $( "#error-modal" )
                    .find( '.modal-body' )
                    .text( Vue.i18n.translate('step3.modal.not_enougth_high', 
                         { min: this.$store.state.dimensions.actual_lineabox_shoulder_height_MID }) );

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
            // # Under 45.5 mm bridge is not allowed
            if( this.$store.state.dimensions.shoulder_height < this.$store.state.dimensions.actual_lineabox_shoulder_height_MID ) {

                $( "#error-modal" )
                .find( '.modal-body' )
                .text( Vue.i18n.translate('step3.modal.not_enougth_high', 
                     { min: this.$store.state.dimensions.actual_lineabox_shoulder_height_MID } ) );


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
            if( this.$store.state.dimensions.length > this.config.rect_length_upper_limit ) {
                return true;
            }

            // # Lower limit check
            if( this.$store.state.dimensions.length < this.config.rect_length_lower_limit ) {
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
         * Advice user that changing data will reset next step data ( if any )
         * @return {Booelan}
         */
        resetAdvice: function() {

              // # Only if advice is not already been viewed
              if( !this.advice_accepted && ( this.$store.state.bridgecompleted || this.$store.state.fourcompleted ) ) {
                  
                  // # Show modal alert
                  $( "#error-modal" ).find('.modal-body').text( Vue.i18n.translate("resetadvice") );
                  $( '#error-modal' ).modal();

                  // # no more till this step will be reloaded
                  this.advice_accepted = true;

                  return false;
              }

              return true;
        },

        /**
         * Resets dimensions to defautl values
         * @return {void}
         */
        reset: function () {
          this.$store.commit( "setDefaultDimensions" );
          this.updateDrawer();
        },

        /**
         * [setShoulderHeight description]
         * @param {[type]} event [description]
         * @param {[type]} val   [description]
         */
        setShoulderHeight: function( event, val ) {

            // # Commit mutation and update draw
            this.$store.commit( "setShoulderHeight", val );
            this.updateDrawer();

            // # Dynamically change popover content
            let popover = $( '#sh-popover' ).data( 'bs.popover' );
            let nuPopoverContent = $( event.target ).clone( false );
            nuPopoverContent.removeClass( 'selected_HA' );
            popover.options.content = nuPopoverContent;            
        }, 

        /**
         * [clearAllData description]
         * @return {[type]} [description]
         */
        clearAllData: function() {
          this.$store.commit( "clearAllBridgeData" );
          this.$store.commit( "clearDividers" );
          this.$store.commit( "clearDrawerBorders" );
        },

        /**
         * Check dimensions constraints
         * @return {bool} true if all constraint are satisfied
         */
        checkChoice: function() {

            // # NaN management :: width
            if( isNaN( this.$store.state.dimensions.width ) ) {
              this.$store.commit( "setWidth", this.$store.state.dimensions.default_width );
              return false;
            }

            // # NaN management :: length
            if( isNaN( this.$store.state.dimensions.length ) ) {
              this.$store.commit( "setLength", this.$store.state.dimensions.default_height );
              return false;
            }        

            // # NaN management :: shoulder_height
            if( isNaN( this.$store.state.dimensions.shoulder_height ) ) {
              this.$store.commit( "setShoulderHeight", this.$store.state.dimensions.default_shoulder_height );
              return false;
            }                        

            // # Check width
            if( !this.$store.state.dimensions.width ) {
                this.width_OOR = true;
            }

            // # Check length
            if( !this.$store.state.dimensions.length ) {
                this.length_OOR = true;
            }

            // # Check shoulder_height
            if( !this.$store.state.dimensions.shoulder_height ) {
                this.shoulder_height_OOR = true;
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
            this.hor_text_shoulder = this.two.makeText( this.$store.state.dimensions.shoulder_height + " " +  this.config.measure_label, 
                                                        x, 
                                                        y, 
                                                        this.config.font_weight );
            // # Text settings
            this.hor_text_shoulder.size = this.config.font_size;
            this.hor_text_shoulder.stroke = this.config.text_stroke;
            this.hor_text_shoulder.family = this.config.font_family; 
            this.hor_text_shoulder.weight = this.config.font_weight;
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
            this.vert_text_shoulder = this.two.makeText( this.$store.state.dimensions.length + " " + this.config.measure_label, 
                                                         x, 
                                                         y,
                                                         this.config.font_weight );

            // # Text settings
            this.vert_text_shoulder.size = this.config.font_size;
            this.vert_text_shoulder.stroke = this.config.text_stroke;
            this.vert_text_shoulder.family = this.config.font_family;
            this.vert_text_shoulder.weight = this.config.font_weight;

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
            this.shoulder_text = this.two.makeText( Vue.i18n.translate( this.config.shoulder_text ),
                                                    x, 
                                                    y, 
                                                    this.config.font_weight );
            // # Text settings
            this.shoulder_text.size = this.config.font_size;
            this.shoulder_text.stroke = this.config.text_stroke;
            this.shoulder_text.family = this.config.font_family;
            this.shoulder_text.weight = this.config.font_weight;

            // # Rotate text 90 degrees clockwise
            this.shoulder_text.rotation = Math.PI/2;
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
            this.hor_text_rect = this.two.makeText( this.$store.state.dimensions.width + " " + this.config.measure_label, 
                                                    x, 
                                                    y, 
                                                    this.config.font_weight );

            // # Text settings
            this.hor_text_rect.size = this.config.font_size;
            this.hor_text_rect.stroke = this.config.text_stroke;
            this.hor_text_rect.family = this.config.font_family; 
            this.hor_text_rect.weight = this.config.font_weight;
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
            this.vert_text_rect = this.two.makeText(  this.$store.state.dimensions.length + " " + this.config.measure_label, 
                                                      x, 
                                                      y, 
                                                      this.config.font_weight );

            // # Text settings
            this.vert_text_rect.size = this.config.font_size;
            this.vert_text_rect.stroke = this.config.text_stroke;
            this.vert_text_rect.family = this.config.font_family;
            this.vert_text_rect.weight = this.config.font_weight;
            
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
            this.shoulder = this.two.makeRectangle( x, 
                                                    y, 
                                                    this.mm2Pixel( width ), 
                                                    this.mm2Pixel( length ) );

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
            this.drawer_text = this.two.makeText( Vue.i18n.translate( this.config.drawer_text ), 
                                                  x, 
                                                  y, 
                                                  this.config.font_weight );

            // # Text settings
            this.drawer_text.size = this.config.font_size;
            this.drawer_text.stroke = this.config.text_stroke;
            this.drawer_text.family = this.config.font_family;
            this.drawer_text.weight = this.config.font_weight;
        },

        /**
         * Updates Drawer related objects on each dimension data change
         * @return {void}
         */
        updateDrawer: function() {

            // # Dimensions check
            if( ! this.checkChoice() ) {
                return false;
            }

            // # Clean up data
            this.clearAllData();

            // # Clean up if any previous error stills
            this.width_OOR = false; this.length_OOR = false; this.shoulder_height_OOR = false;

            // # Remove to redraw
            this.two.clear();

            // # Drawer
            this.makeRect( this.mm2Pixel( this.$store.state.dimensions.width ) / 2, 
                           this.config.standard_top_margin, 
                           this.mm2Pixel( this.$store.state.dimensions.width ), 
                           this.mm2Pixel( this.$store.state.dimensions.length ), 20, 
                           this.config.standard_top_margin + this.mm2Pixel( this.$store.state.dimensions.length ) / 2 );

            // # Get width line dimensions
            var width_line_bounding_client_rect = this.hor_line_rect.getBoundingClientRect();

            // # Get drawer dimensions
            var rectObj = this.rect.getBoundingClientRect();

            // # Width line ( drawer )
            this.makeRectWidthInfoLine( rectObj.left, rectObj.bottom + 20, rectObj.right, rectObj.bottom + 20 );

            // # Width text ( drawer )
            this.makeRectWidthInfoText( ( rectObj.width / 2 ) + rectObj.left, rectObj.bottom + 30 );

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

            // # Get drawer positions and dimensions
            var rectObj = this.rect.getBoundingClientRect();

            // # Shoulder redraw                
            this.makeShoulder(  rectObj.right + ( this.mm2Pixel( this.$store.state.dimensions.shoulder_height ) / 2 ) + 20, 
                                this.config.standard_top_margin + this.mm2Pixel( this.$store.state.dimensions.length ) / 2, 
                                this.$store.state.dimensions.shoulder_height , 
                                this.$store.state.dimensions.length
                             );    

            // # Get drawer dimensions
            var shoulderObj = this.shoulder.getBoundingClientRect();

            // # Width line ( shoulder )
            this.makeShoulderWidthInfoLine( shoulderObj.left, 
                                            shoulderObj.bottom + 20, 
                                            shoulderObj.right,
                                            shoulderObj.bottom + 20 );

            // # Width text ( shoulder )
            this.makeShoulderWidthInfoText( parseInt( shoulderObj.left ) + ( shoulderObj.width / 2 ) + 10,
                                            shoulderObj.bottom + 30 );

            // # Length line ( shoulder )
            this.makeShoulderLengthInfoLine( shoulderObj.right + 20, 
                                             shoulderObj.top, 
                                             shoulderObj.right + 20, 
                                             shoulderObj.bottom );

            // # Length text ( shoulder )rectObj.right + 30,  ( rectObj.height / 2 ) + rectObj.top
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
                $( "#error-modal" ).find('.modal-body').text( Vue.i18n.translate( "step3.modal.generic" ) );
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
            if( 4 == this.$store.state.drawertype ) {

                // # Over 72 mm bridge is allowed, go to the bridge step
                if( this.$store.state.dimensions.shoulder_height > this.$store.state.dimensions.actual_lineabox_shoulder_height_MID ) {

                    // # bridge is allowed, go to the bridge step
                    this.$store.commit( "isSuitableHeightForBridge", true );
                    this.$router.push( { path: '/split/stepponte' } );
                    return true;
                }

                // # Under 72 mm no bridge allowed, skip the bridge choice step
                this.$store.commit( "setBridgecompleted", true );
                this.$store.commit( "isSuitableHeightForBridge", false );
                this.$router.push( { path: '/split/step4' } );
                return true;
            }

            // # Lineabox choice
            if( this.$store.state.dimensions.shoulder_height > this.$store.state.dimensions.actual_lineabox_shoulder_height_LOW ) { // 45.5 means choice: 77
                
                // # bridge is allowed, go to the bridge step
                this.$store.commit( "isSuitableHeightForBridge", true );
                this.$router.push( { path: '/split/stepponte' } );
                return false;
            }
            
            // # No bridge allowed, skip the bridge choice step
            this.$store.commit( "setBridgecompleted", true );
            this.$store.commit( "isSuitableHeightForBridge", false );
            this.$router.push( { path: '/split/step4' } );
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
    beforeRouteEnter: ( to, from, next ) => {
 
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
        })
    },  

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () { 

        // # Log mount 
        console.log( "Dimensions choice mounted" );
              
        // # Set component header title
        this.$store.commit( "setComponentHeader", this.$store.state.is_lineabox ? "step3.header-title.lineabox" : "step3.header-title-custom" );

        // # Init canvas
        this.initTwo();

        // # Dimensions info popovers
        // # WIDTH
        $('#width-popover').popover({ 
            placement: 'auto right', 
            content: $( "#width-info-image" ).clone( true ), 
            html: true,
            container: 'body'
        });

        // # LENGTH
        $('#length-popover').popover({ 
            placement: 'auto right', 
            content: $( "#length-info-image" ).clone( true ), 
            html: true,
            container: 'body'
        });

        if( this.$store.state.is_lineabox ) {

          // # SHOULDER HEIGHT popover ( lineabox )
          $('#sh-popover').popover({ 
              placement: 'auto right', 
              content: $( ".selected_HA" ).clone( false ), 
              html: true,
              container: 'body'
          });    

        } else {

          // # SHOULDER HEIGHT popover ( custom drawer )
          $('#sh-popover').popover({ 
              placement: 'auto right', 
              content: $( "#sh-info-image" ).clone( false ), 
              html: true,
              container: 'body'
          });            
          
        }
      
    }
}
</script>