var step2 = new Vue({

    el: '#drawer_dimensions',

    data: {

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

        inittwo: function () {

            // # Canvas element
            var elem = document.getElementById('animation');


            // # TWO Instance
            this.two = new Two({ width: 300, height: 300, autostart: true }).appendTo(elem);

            // # Rectangle ( drawer )
            this.rect = this.two.makeRectangle( 50, 100, 100, 100 );
            this.rect.linewidth = 7;
            this.rect.stroke = '#999999';
            this.rect.translation.x += 20;

            // # Width line ( drawer )
            this.hor_line_rect = this.two.makeLine( 18, 30, 120, 30 );
            this.hor_line_rect.stroke = '#222';

            // # Width text ( drawer )
            this.hor_text_rect = this.two.makeText(100 + " cm", 70, 15, 'normal' );
            this.hor_text_rect.size = 12;
            this.hor_text_rect.stroke = "#222";
            this.hor_text_rect.family = "Raleway";

            // # Length line ( drawer )
            this.vert_line_rect = this.two.makeLine(140, 50, 140, 150);
            this.vert_line_rect.stroke = '#222';

            // # Length text ( drawer )
            this.vert_text_rect = this.two.makeText(100 + " cm", 160, 100, 'normal' );
            this.vert_text_rect.size = 12;
            this.vert_text_rect.stroke = "#222";
            this.vert_text_rect.family = "Raleway";
            this.vert_text_rect.rotation = Math.PI/2;

            // # Rectangle ( Shoulder )
            this.shoulder = this.two.makeRectangle(70, 200, 100, 30);
            this.shoulder.linewidth = 2;
            this.shoulder.stroke = '#999999';

            // # Drawer label
            this.drawer_text = this.two.makeText("Cassetto", 70, 100, 'normal' );
            this.drawer_text.size = 12;
            this.drawer_text.stroke = "#222";
            this.drawer_text.family = "Raleway";

        },

        updateDrawer: function() {

            // Remove to redraw
            this.two.remove( [ this.rect, this.hor_line_rect, this.hor_text_rect, this.drawer_text, this.vert_line_rect, this.vert_text_rect ] );

            // # Rectangle ( drawer )
            this.rect = this.two.makeRectangle(this.width/2,100, this.width, this.length );
            this.rect.linewidth = 7;
            this.rect.stroke = '#999999';
            this.rect.translation.x += 20;
            this.rect.translation.y = 50 + parseInt( this.length )/2;

            // # Width line ( drawer )
            this.hor_line_rect = this.two.makeLine(18, 30, parseInt(this.width) + parseInt( this.rect.linewidth ) + 15, 30);
            this.hor_line_rect.stroke = '#222';

            // # Width text ( drawer )
            this.hor_text_rect = this.two.makeText( parseInt( this.width ) + " cm", this.hor_line_rect.getBoundingClientRect().width/2 + 15, 15, 'normal' );
            this.hor_text_rect.size = 12;
            this.hor_text_rect.stroke = "#222";
            this.hor_text_rect.family = "Raleway";

            var rect_rightmost = this.rect.getBoundingClientRect().left + this.rect.getBoundingClientRect().width + 20;
            var rect_bottomomost = this.rect.getBoundingClientRect().bottom + 20;

            // # Length line ( drawer )
            this.vert_line_rect = this.two.makeLine(rect_rightmost, 50, rect_rightmost, 150);
            this.vert_line_rect.stroke = '#222';

            // # Length text ( drawer )
            this.vert_text_rect = this.two.makeText(this.length + " cm", rect_rightmost + 10, 100, 'normal' );
            this.vert_text_rect.size = 12;
            this.vert_text_rect.stroke = "#222";
            this.vert_text_rect.family = "Raleway";
            this.vert_text_rect.rotation = Math.PI/2;

            this.drawer_text = this.two.makeText("Cassetto", 70, 100, 'normal' );
            this.drawer_text.size = 12;
            this.drawer_text.stroke = "#222";
            this.drawer_text.family = "Raleway";

            this.updateShoulder();
        },

        updateShoulder: function() {

            var rect_bottomomost = this.rect.getBoundingClientRect().bottom + 20;

            this.two.remove( this.shoulder );
            this.shoulder = this.two.makeRectangle(this.rect.getBoundingClientRect().left + ( this.rect.getBoundingClientRect().width/2 ), rect_bottomomost + ( parseInt( this.depth ) ) / 2, this.length, this.depth);
            this.shoulder.linewidth = 2;
            this.shoulder.stroke = '#999999';

        },

    },

    mounted() {
        var elem = document.getElementById('animation');
        console.log( "ready");
        console.log( $( elem ).height() );
        this.inittwo()
    }

});

/*
 window.onload = function() {
 console.log( "win load");
 var elem = document.getElementById('animation');
 console.log( $( elem ).height() );
 }
 */
