var step2 = new Vue({

    el: '#drawer_dimensions',

    data: {

        length: 100,
        width: 100,
        depth: 10,
        two: {},
        shouder: {},
        rect: {},
        hor_text_rect: "",
        hor_line_rect: {},
        vert_line_rect: {}
    },

    methods: {

        inittwo: function () {

            var elem = document.getElementById('animation');

            this.two = new Two({ width: 300, height: 300, autostart: true }).appendTo(elem);

            this.rect = this.two.makeRectangle(100, 110, 100, 100);
            this.rect.linewidth = 7;
            this.rect.stroke = '#1C75BC';
            this.rect.fill = 'rgba(0, 200, 255, 0.75)';

            var line = this.two.makeLine(50, 30, 150, 30);
            line.stroke = '#222';

            var text = this.two.makeText(110, 100, 15, 'normal' );
            text.size = 12;
            text.stroke = "#222";
            text.family = "Raleway";


            this.shoulder = this.two.makeRectangle(100,  220, 100, 30);
            this.shoulder.linewidth = 2;
            this.shoulder.stroke = '#1C75BC';
            this.shoulder.fill = 'rgba(0, 200, 255, 0.75)';
        },

        updateDrawer: function() {
            this.two.remove( this.rect );
            this.rect = this.two.makeRectangle(100,110, this.width, this.length );
            this.rect.linewidth = 7;
            this.rect.stroke = '#1C75BC';
            this.rect.fill = 'rgba(0, 200, 255, 0.75)';
        },

        updateShoulder: function() {
            this.two.remove( this.shoulder );
            this.shoulder = this.two.makeRectangle(100, 220, this.length, this.depth);
            this.shoulder.linewidth = 2;
            this.shoulder.stroke = '#1C75BC';
            this.shoulder.fill = 'rgba(0, 200, 255, 0.75)';
        },

    },

    mounted() {
        this.inittwo()
    }

});