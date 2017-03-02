var step3 = new Vue({

    // # Bound element
    el: 'step3',

    // # Object data
    data: {

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
            drawer_text: 'Cassetto',

            // # Shoulder settings
            shoulder_stroke: '#999999',
            shoulder_linewidth: 7,
            shoulder_text: "Sponda",
            shoulder_height_upper_limit: 250,
            shoulder_height_lower_limit: 45.5, 

            // # Lineabox shoulder fixed measures ( height ) 
            lineabox_shoulders_height: [
                { text: 77, value: 77, selected: true },
                { text: 104, value: 104, selected: false },
                { text: 180, value: 180, selected: false }
            ],

            // # Bridge related limits
            maxSuitableWidth4Bridge: 1200,

            // # Pixel Multiplier
            ratio: 2
        },

        // # check on drawer max width allowed for H bridges
        widthNotSuitable4Bridge: false,

        // # Lineabox flag ( from previous step watch )
        lineabox: false,

        // # Container dimensions
        canvas_width: 0,
        canvas_height: 0,

        // # Data bound
        length: 600,
        width: 800,
        depth: 100,

        // # Out of range flags
        widthOOR: false,
        lengthOOR: false,
        depthOOR: false, 

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
    },

    methods: {

        /**
         * Inits the Two object container and every shape needed in its initial state
         * @return {[void]}
         */
        inittwo: function () {

            // # Container init
            this.container = document.getElementById( 'animation' );

            // # TWO Instance
            this.two = new Two({ autostart: true }).appendTo( this.container );

            // # Drawer
            this.makeRect( 80, 110, this.mm2Pixel( this.width ), this.mm2Pixel( this.length ), 20, 0 );

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
            this.makeShoulder(  rectObj.left + ( this.mm2Pixel( this.length ) / 2 ) + 5, 
                                rectObj.bottom + 40 + ( this.mm2Pixel( this.depth ) ) / 2, 
                                this.length, 
                                this.depth );

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
         * [mm2Pixel description]
         * @param  {[type]} mm [description]
         * @return {[type]}    [description]
         */
        mm2Pixel: function ( mm ) {
            
            try {
                return Math.ceil( parseInt( mm ) / 10 ) * this.config.ratio;
            } catch ( e ) {
                return 100;
            }   
        },

        /**
         * [widthOutOfRange description]
         * @return {[type]} [description]
         */
        widthOutOfRange: function() {
      
            if( parseInt( this.width ) > this.config.rect_width_upper_limit ) {
                this.widthOOR = true;
                return true;
            }

            if( parseInt( this.width ) < this.config.rect_width_lower_limit ) {
                this.widthOOR = true;
                return true;
            }            
            
            this.widthOOR = false;
            return false;
        },

        widthIsNotSuitable4Bridge: function() {

            if( parseInt( this.width ) > this.config.maxSuitableWidth4Bridge ) {
                this.widthNotSuitable4Bridge = true;
                return true;
            }

            this.widthNotSuitable4Bridge = false;
            return false;
        },

        /**
         * [lengthOutOfRange description]
         * @return {[type]} [description]
         */
        lengthOutOfRange: function() {
      
            if( parseInt( this.length ) > this.config.rect_height_upper_limit ) {
                this.lengthOOR = true;
                return true;
            }

            if( parseInt( this.length ) < this.config.rect_height_lower_limit ) {
                this.lengthOOR = true;
                return true;
            }            
            
            this.lengthOOR = false;
            return false;
        },

        /**
         * [depthOutOfRange description]
         * @return {[type]} [description]
         */
        depthOutOfRange: function() {
      
            if( parseInt( this.depth ) > this.config.shoulder_height_upper_limit ) {
                this.depthOOR = true;
                return true;
            }

            if( parseInt( this.depth ) < this.config.shoulder_height_lower_limit ) {
                this.depthOOR = true;
                return true;
            }            
            
            this.depthOOR = false;
            return false;
        },    

        /**
         * [checkChoice description]
         * @return {[type]} [description]
         */
        checkChoice: function() {

            if( !this.width ) {
                this.widthOOR = true;
                return false;
            }

            if( !this.length ) {
                this.lengthOOR = true;
                return false;
            }

            if( !this.depth ) {
                this.depthOOR = true;
                return false;
            }

            // # Check Out of Bound
            if( this.widthOutOfRange() || this.lengthOutOfRange() || this.depthOutOfRange() ) {
                 return false;
            }

            return true;
        },         

        /**
         * [makeShoulderWidthInfoLine description]
         * @param  {[type]} x1 [description]
         * @param  {[type]} y1 [description]
         * @param  {[type]} x2 [description]
         * @param  {[type]} y2 [description]
         * @return {[type]}    [description]
         */
        makeShoulderWidthInfoLine: function( x1, y1, x2, y2 ) {

            this.hor_line_shoulder = this.two.makeLine( x1, 
                                                        y1, 
                                                        x2, 
                                                        y2 );
                                                        
            this.hor_line_shoulder.stroke = this.config.line_stroke;  
        },

        /**
         * [makeShoulderWidthInfoText description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
        makeShoulderWidthInfoText: function( x, y ) {

            this.hor_text_shoulder = this.two.makeText( this.length + " " +  this.config.measure_label, 
                                                        x, 
                                                        y, 
                                                        this.config.font_weight );

            this.hor_text_shoulder.size = this.config.font_size;
            this.hor_text_shoulder.stroke = this.config.text_stroke;
            this.hor_text_shoulder.family = this.config.font_family; 
        },

        /**
         * [makeShoulderLengthInfoLine description]
         * @param  {[type]} x1 [description]
         * @param  {[type]} y1 [description]
         * @param  {[type]} x2 [description]
         * @param  {[type]} y2 [description]
         * @return {[type]}    [description]
         */
        makeShoulderLengthInfoLine: function( x1, y1, x2, y2 ) {

            // # Length line ( drawer )
            this.vert_line_shoulder = this.two.makeLine( x1, 
                                                         y1, 
                                                         x2, 
                                                         y2 );

            this.vert_line_shoulder.stroke = this.config.line_stroke;
        },

        /**
         * [makeShoulderLengthInfoText description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
        makeShoulderLengthInfoText: function( x, y ) {

            // # Length text ( drawer )
            this.vert_text_shoulder = this.two.makeText( this.depth + " " + this.config.measure_label, 
                                                         x, 
                                                         y,
                                                         this.config.font_weight );

            this.vert_text_shoulder.size = this.config.font_size;
            this.vert_text_shoulder.stroke = this.config.text_stroke;
            this.vert_text_shoulder.family = this.config.font_family;
            this.vert_text_shoulder.rotation = Math.PI/2;
        },     

        /**
         * [makeShoulderLabel description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
        makeShoulderLabel: function( x, y ) {

            this.shoulder_text = this.two.makeText( this.config.shoulder_text,
                                                    x, 
                                                    y, 
                                                    this.config.font_weight );

            this.shoulder_text.size = this.config.font_size;
            this.shoulder_text.stroke = this.config.text_stroke;
            this.shoulder_text.family = this.config.font_family;
        },

        /**
         * [makeRect description]
         * @param  {[type]} x             [description]
         * @param  {[type]} y             [description]
         * @param  {[type]} width         [description]
         * @param  {[type]} length        [description]
         * @param  {[type]} translation_x [description]
         * @param  {[type]} translation_y [description]
         * @return {[type]}               [description]
         */
        makeRect: function( x, y, width, length, translation_x, translation_y ) {

            // # Rectangle ( drawer )
            this.rect = this.two.makeRectangle( x, y, width, length );
            this.rect.linewidth = this.config.rect_linewidth;
            this.rect.stroke = this.config.rect_stroke;
            this.rect.translation.x += translation_x;
            if( translation_y > 0 ) {
                this.rect.translation.y = translation_y;
            }
        },

        /**
         * [makeRectWidthInfoLine description]
         * @param  {[type]} x1 [description]
         * @param  {[type]} y1 [description]
         * @param  {[type]} x2 [description]
         * @param  {[type]} y2 [description]
         * @return {[type]}    [description]
         */
        makeRectWidthInfoLine: function( x1, y1, x2, y2 ) {

            // # Width line ( drawer )
            this.hor_line_rect = this.two.makeLine( x1, y1, x2, y2 );
            this.hor_line_rect.stroke = this.config.line_stroke;           
        },

        /**
         * [makeRectWidthInfoText description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
        makeRectWidthInfoText: function( x, y ) {
           
            // # Width text ( drawer )
            this.hor_text_rect = this.two.makeText( this.width + " " + this.config.measure_label, x, y, this.config.font_weight );
            this.hor_text_rect.size = this.config.font_size;
            this.hor_text_rect.stroke = this.config.text_stroke;
            this.hor_text_rect.family = this.config.font_family; 
        },

        /**
         * [makeRectLengthInfoLine description]
         * @param  {[type]} x1 [description]
         * @param  {[type]} y1 [description]
         * @param  {[type]} x2 [description]
         * @param  {[type]} y2 [description]
         * @return {[type]}    [description]
         */
        makeRectLengthInfoLine: function( x1, y1, x2, y2 ) {
            
            // # Length line ( drawer )
            this.vert_line_rect = this.two.makeLine( x1, y1, x2, y2 );
            this.vert_line_rect.stroke = this.config.line_stroke;
        },

        /**
         * [makeRectLengthInfoText description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
        makeRectLengthInfoText: function( x, y ) {
            
            // # Length text ( drawer )
            this.vert_text_rect = this.two.makeText( this.length + " " + this.config.measure_label, x, y, this.config.font_weight );
            this.vert_text_rect.size = this.config.font_size;
            this.vert_text_rect.stroke = this.config.text_stroke;
            this.vert_text_rect.family = this.config.font_family;
            this.vert_text_rect.rotation = Math.PI/2;
        },

        /**
         * [makeShoulder description]
         * @param  {[type]} x      [jdej3io]
         * @param  {[type]} y      [description]
         * @param  {[type]} width  [description]
         * @param  {[type]} length [description]
         * @return {[type]}        [description]
         */
        makeShoulder: function( x, y, width, length ) {

            this.shoulder = this.two.makeRectangle( x, y, this.mm2Pixel( width ), this.mm2Pixel( length ) );
            this.shoulder.linewidth = this.config.shoulder_linewidth;
            this.shoulder.stroke = this.config.shoulder_stroke;
        },

        /**
         * [makeDrawerLabel description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
        makeDrawerLabel: function( x, y ) {

            this.drawer_text = this.two.makeText( this.config.drawer_text, x, y, this.config.font_weight );
            this.drawer_text.size = this.config.font_size;
            this.drawer_text.stroke = this.config.text_stroke;
            this.drawer_text.family = this.config.font_family;
        },

        /**
         * Updates Drawer related objects on data change
         * @return {[void]}
         */
        updateDrawer: function() {

            // # Skip when there are less than 3 digit
            /*if( this.width.length < 3 || this.length.length < 3 || this.depth.length < 1 ) {
                return;
            }*/

            // # dimensions check
            if( ! this.checkChoice() ) {
                return false;
            }

            if( this.widthIsNotSuitable4Bridge() ) {
                $( "#error-modal" ).find('.modal-body').text( "La larghezza inserita non permetterà l'inserimento di un elemento ponte" );
                $( '#error-modal' ).modal();
            }

            // # Clean up if any previous error stills
            this.widthOOR = false; this.lengthOOR = false; this.depthOOR = false;

            // # Remove to redraw
            this.two.clear();

            // # Drawer
            this.makeRect( this.mm2Pixel( this.width ) / 2, 100, this.mm2Pixel( this.width ), this.mm2Pixel( this.length ), 20, 50 + this.mm2Pixel( this.length ) / 2 );

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
            this.makeShoulder(  rectObj.left + ( this.mm2Pixel( this.length ) / 2 ) + 5, 
                                rectObj.bottom + 40 + ( this.mm2Pixel( this.depth ) ) / 2, 
                                this.length, 
                                this.depth);

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

        check: function() {

            if( !this.checkChoice() ) {

                $( "#error-modal" ).find('.modal-body').text( "Controlla i valori inseriti" );
                $( '#error-modal' ).modal();
                Commons.movesmoothlyTo( "#step3"); 
                return false;  

            }

            // # Cassetto
            if( Configuration.drawertype == 4 ) {

                if( this.depth > 70 ) {
                    Commons.movesmoothlyTo( "#step-ponte"); 
                    return false;
                }
                Commons.movesmoothlyTo( "#step4"); 
            }

            if( this.depth > 77 ) {
                Commons.movesmoothlyTo( "#step-ponte"); 
                return false;
            }
            
            Commons.movesmoothlyTo( "#step4"); 


        },        

    },

    watch: {

        width: function (val) {
            Configuration.dimensions.width = val;
        },

        length: function (val) {
            Configuration.dimensions.length = val;
        },

        depth: function (val) {
            Configuration.dimensions.depth = val;
            this.updateDrawer();
        },

        widthNotSuitable4Bridge: function( val ) {
            console.log( "changed");
            stepponte.$data.widthNotSuitable4Bridge = val;
        }

    },

    mounted() { // # Window onload eq
        console.log("Step3 mounted");
        this.inittwo();
    }

});
