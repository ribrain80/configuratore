var stepponte = new Vue({

    el: 'step-ponte',

    data: {
        has_bridge: false,
        bridge_orientation: "H",
        bridge_height: 0,
        side_height: 0,
        selected:0,
        hasError:false,
        choice: true
    },

    watch: {

    },

    methods: {


        check: function() {

            /*
            console.log( this.selected );

            if( this.selected == 0 ) {
                $( "#error-modal" ).find('.modal-body').text( "Non hai scelto la tipologia" );
                $( '#error-modal' ).modal();
                return false;
            } else {
               Commons.movesmoothlyTo( "#step3"); 
            }
           */
          
          Commons.movesmoothlyTo( "#step4"); 
        }
    },
    mounted() {
        console.log("Step ponte Mounted!")
    }
});