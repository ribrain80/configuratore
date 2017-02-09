var step2 = new Vue({

    el: '#drawer_dimensions',

    data: {

        container: {},
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
            shoulder_linewidth: 7
        },

        canvas_width: 0,
        canvas_height: 0,

        length: 100,
        width: 100,
        depth: 10,

        two: {},
        shouder: {},
        rect: {},
        hor_text_rect: "",
        hor_line_rect: {},
        vert_text_rect: {},
        vert_line_rect: {},
        drawer_text: {},
        board_text: {}
    },

    methods: {

        /**
         * Inits the two object container and every shape needed in its initial state
         * @return {[void]}
         */
        inittwo: function () {

            // # TWO Instance
            this.two = new Two({ width: 300, height: 300, autostart: true }).appendTo( this.container );

            // # Drawer
            this.makeRect( 50, 100, 100, 100, 20, 0 );
            
            // # Width line ( drawer )
            this.makeRectWidthInfoLine( 18, 30, 120, 30 );

            // # Width text ( drawer )
            this.makeRectWidthInfoText( "100", 70, 15 );

            // # Length line ( drawer )
            this.makeRectLengthInfoLine( 140, 50, 140, 150 );

            // # Length text ( drawer )
            this.makeRectLengthInfoText( "100", 160, 100 );

            // # Rectangle ( Shoulder )
            this.makeShoulder( 70, 200, 100, 30 );

            // # Drawer label
            this.makeDrawerLabel( 70, 100 );
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
         * @param  {[type]} text [description]
         * @param  {[type]} x    [description]
         * @param  {[type]} y    [description]
         * @return {[type]}      [description]
         */
        makeRectWidthInfoText: function( text, x, y ) {
           
            // # Width text ( drawer )
            this.hor_text_rect = this.two.makeText( text + " cm", x, y, this.config.font_weight );
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
         * @param  {[type]} text [description]
         * @param  {[type]} x    [description]
         * @param  {[type]} y    [description]
         * @return {[type]}      [description]
         */
        makeRectLengthInfoText: function( text, x, y ) {
            
            // # Length text ( drawer )
            this.vert_text_rect = this.two.makeText( text + " cm", x, y, this.config.font_weight );
            this.vert_text_rect.size = this.config.font_size;
            this.vert_text_rect.stroke = this.config.text_stroke;
            this.vert_text_rect.family = this.config.font_family;
            this.vert_text_rect.rotation = Math.PI/2;
        },

        /**
         * [makeShoulder description]
         * @param  {[type]} x      [description]
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
         * [updateDrawer description]
         * @return {[type]} [description]
         */
        updateDrawer: function() {

            // Remove to redraw
            this.two.remove( [ this.rect, this.hor_line_rect, this.hor_text_rect, this.drawer_text, this.vert_line_rect, this.vert_text_rect ] );

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
            this.makeRectWidthInfoText( this.width, ( rect_width / 2 ) + rect_leftmost, 15 );

            // # Length line ( drawer )
            this.makeRectLengthInfoLine( rect_rightmost + 20, rect_topmost, rect_rightmost + 20, rect_bottomomost );

            // # Length text ( drawer )
            this.makeRectLengthInfoText( this.length, rect_rightmost + 30,  ( rect_height / 2 ) + rect_topmost );

            // # Drawer label text
            this.makeDrawerLabel( rect_width/2 + rect_leftmost, rect_height/2 + rect_topmost );

            // # Update shoulder cause length is a dimension also there
            this.updateShoulder();
        },

        /**
         * [updateShoulder description]
         * @param  {[type]} rect_bounding_client_rect [description]
         * @return {[type]}                           [description]
         */
        updateShoulder: function(  ) {

            var rect_bounding_client_rect = this.rect.getBoundingClientRect();

            // # Remove before redraw
            this.two.remove( this.shoulder );

            console.log( rect_bounding_client_rect.left + parseInt( this.length ) );
            // # Shoulder redraw                
            this.makeShoulder(  rect_bounding_client_rect.left + ( parseInt( this.length ) / 2 ) - 7, 
                                rect_bounding_client_rect.bottom + 40 + ( parseInt( this.depth ) ) / 2, 
                                this.length, 
                                this.depth);

        },

    },

    mounted() { // # Window onload eq

        // # Canvas element init
        this.container = document.getElementById('animation');
        //console.log( "ready");
        //console.log( $( elem ).height() );
        this.inittwo()
    }

});
