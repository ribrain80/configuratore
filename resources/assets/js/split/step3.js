var Step3 = new Vue({

    el: '#drawer_dimensions',

    data: {

        // # Container element
        container: {},

        // # Config vars
        config: {
            rect_stroke: '#999999',
            rect_linewidth: 7,
            line_stroke: '#222222',
            text_stroke: '#222222',
            font_size: 12,
            font_family: 'Raleway',
            font_weight: 'normal',
            drawer_text: 'Cassetto',
            shoulder_stroke: '#999999',
            shoulder_linewidth: 7,
            shoulder_text: "Sponda"
        },

        // # Container dimensions
        canvas_width: 0,
        canvas_height: 0,

        // # Data bound
        length: 100,
        width: 100,
        depth: 20,

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
        shoulder_text: {},

        // # Alert message
        showAlert: false,
        alert_message : ""
    },

    methods: {

        /**
         * Inits the Two object container and every shape needed in its initial state
         * @return {[void]}
         */
        inittwo: function () {

            // # Container init
            this.container = document.getElementById('animation');

            // # TWO Instance
            this.two = new Two({ autostart: true }).appendTo( this.container );

            // # Drawer
            this.makeRect( 50, 100, 100, 100, 20, 0 );
            
            // # Width line ( drawer )
            this.makeRectWidthInfoLine( 18, 30, 120, 30 );

            // # Width text ( drawer )
            this.makeRectWidthInfoText( 70, 15 );

            // # Length line ( drawer )
            this.makeRectLengthInfoLine( 140, 50, 140, 150 );

            // # Length text ( drawer )
            this.makeRectLengthInfoText( 160, 100 );

            // # Drawer label
            this.makeDrawerLabel( 70, 100 );

            // # Rectangle ( Shoulder )
            this.makeShoulder( 70, 200, 100, 30 );

            // # Width line ( shoulder )
            this.makeShoulderWidthInfoLine( 17, 230, 124, 230 );

            // # Width text ( shoulder )
            this.makeShoulderWidthInfoText( 75, 240 );

            // # Length line ( shoulder )
            this.makeShoulderLengthInfoLine( 140, 180, 140, 217 );

            // # Length text ( shoulder )
            this.makeShoulderLengthInfoText( 160, 200 );            

            // # Shoulder label
            this.makeShoulderLabel( 70, 200 );
        },

        /**
         * [widthOutOfRange description]
         * @return {[type]} [description]
         */
        widthOutOfRange: function() {
      
            if( parseInt( this.width ) > 200 ) {
                this.widthOOR = true;
                this.alert_message = "La larghezza indicata supera il valore consentito";
                return true;
            }
            
            this.widthOOR = false;
            return false;
        },

        /**
         * [lengthOutOfRange description]
         * @return {[type]} [description]
         */
        lengthOutOfRange: function() {
      
            if( parseInt( this.length ) > 200 ) {
                this.lengthOOR = true;
                this.alert_message = "La lunghezza indicata supera il valore consentito";
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
      
            if( parseInt( this.depth ) > 40 ) {
                this.depthOOR = true;
                this.alert_message = "L'altezza indicata per la sponda supera il valore consentito";
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

            if( !this.width || !this.length || !this.depth ) {
                this.showAlert = true;
                this.alert_message = "Tutti i campi devono essere compilati";
                this.two.clear();
                return false;
            }

            this.showAlert = false;
            document.forms[ 0 ].submit();
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

            this.hor_text_shoulder = this.two.makeText( this.length + " cm", 
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
            this.vert_text_shoulder = this.two.makeText( this.depth + " cm", 
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
            this.hor_text_rect = this.two.makeText( this.width + " cm", x, y, this.config.font_weight );
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
            this.vert_text_rect = this.two.makeText( this.length + " cm", x, y, this.config.font_weight );
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

            this.shoulder = this.two.makeRectangle( x, y, width, length );
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

            // # Clean up if any previous error stills
            this.showAlert = false;

            // # Check Out of Bound
            if( this.widthOutOfRange() || this.lengthOutOfRange() || this.depthOutOfRange() ) {
                 this.showAlert = true;
                 return false;
            }

            // # Remove to redraw
            this.two.clear();

            // # Drawer
            this.makeRect( this.width / 2, 100, this.width, this.length, 20, 50 + parseInt( this.length ) / 2 );

            // # Get width line dimensions
            var width_line_bounding_client_rect = this.hor_line_rect.getBoundingClientRect();

            // # Get drawer dimensions
            var rect_bounding_client_rect = this.rect.getBoundingClientRect();

            // # Rightmost point
            var rect_rightmost = rect_bounding_client_rect.right;

            // # Topmost point
            var rect_topmost = rect_bounding_client_rect.top;

            // # Bottommost point
            var rect_bottomomost = rect_bounding_client_rect.bottom;

            // # Bottommost point
            var rect_leftmost = rect_bounding_client_rect.left;

            // # Drawer current width
            var rect_width = rect_bounding_client_rect.width;

            // # Drawer current height
            var rect_height = rect_bounding_client_rect.height;

            // # Width line ( drawer )
            this.makeRectWidthInfoLine( rect_leftmost, 30, rect_rightmost, 30 );

            // # Width text ( drawer )
            this.makeRectWidthInfoText( ( rect_width / 2 ) + rect_leftmost, 15 );

            // # Length line ( drawer )
            this.makeRectLengthInfoLine( rect_rightmost + 20, rect_topmost, rect_rightmost + 20, rect_bottomomost );

            // # Length text ( drawer )
            this.makeRectLengthInfoText( rect_rightmost + 30,  ( rect_height / 2 ) + rect_topmost );

            // # Drawer label text
            this.makeDrawerLabel( rect_width/2 + rect_leftmost, rect_height/2 + rect_topmost );

            // # Update shoulder cause length is a dimension also there
            this.updateShoulder();
        },

        /**
         * Updates Shoulder objects on data change
         * @return {[type]} [description]
         */
        updateShoulder: function() {

            // # Remove to redraw
            /*this.two.remove( [ this.shoulder, this.vert_text_shoulder, 
                               this.vert_line_shoulder, this.hor_text_shoulder, 
                               this.hor_line_shoulder, this.shoulder_text ]);
                               */

            var rect_bounding_client_rect = this.rect.getBoundingClientRect();

            // # Shoulder redraw                
            this.makeShoulder(  rect_bounding_client_rect.left + ( parseInt( this.length ) / 2 ) + 5, 
                                rect_bounding_client_rect.bottom + 40 + ( parseInt( this.depth ) ) / 2, 
                                this.length, 
                                this.depth);

            // # Get drawer dimensions
            var shoulder_bounding_client_rect = this.shoulder.getBoundingClientRect();

            // # Rightmost point
            var shoulder_rightmost = shoulder_bounding_client_rect.right;

            // # Topmost point
            var shoulder_topmost = shoulder_bounding_client_rect.top;

            // # Bottommost point
            var shoulder_bottomomost = shoulder_bounding_client_rect.bottom;

            // # Bottommost point
            var shoulder_leftmost = shoulder_bounding_client_rect.left;

            // # Drawer current width
            var shoulder_width = shoulder_bounding_client_rect.width;

            // # Drawer current height
            var shoulder_height = shoulder_bounding_client_rect.height;

            // # Width line ( shoulder )
            this.makeShoulderWidthInfoLine( shoulder_leftmost, 
                                            shoulder_bottomomost + 20, 
                                            shoulder_rightmost,
                                            shoulder_bottomomost + 20 );

            // # Width text ( shoulder )
            this.makeShoulderWidthInfoText( shoulder_width/2 + 20,
                                            shoulder_bottomomost + 30 );

            // # Length line ( shoulder )
            this.makeShoulderLengthInfoLine( shoulder_rightmost + 10, 
                                             shoulder_topmost, 
                                             shoulder_rightmost + 10, 
                                             shoulder_bottomomost );

            // # Length text ( shoulder )
            this.makeShoulderLengthInfoText( shoulder_rightmost + 30, 
                                           ( shoulder_height / 2 ) + shoulder_topmost  );            

            // # Shoulder label
            this.makeShoulderLabel(  shoulder_width/2 + shoulder_leftmost, shoulder_height/2 + shoulder_topmost );

        },

    },

    mounted() { // # Window onload eq
        this.inittwo()
    }

});
