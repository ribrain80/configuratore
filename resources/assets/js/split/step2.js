var step2 = new Vue({

    el: 'step2',

    data: {
        selected:0,
        hasError:false,
        choice: true,
        types:[]
    },

    watch: {
        // whenever question changes, this function will run
        selected: function (val) {
            Configuration.drawertype = val;
        }
    },

    methods: {

        initTypes: function () {
            this.$http.get('/split/drawerstypes').then(response => {
                this.types = response.body;
            }, response => {
                this.hasError = true;
            });
        },

        setType: function (type) {
            this.selected = type;
            if (type>0) {
                this.choice = false;
            } else {
                this.choice = true;
            }
        },

        openCategory: function (catId) {
            //Resetto le scelte
            this.selected=0;
            this.choice=true;
            //Nascondo tutte le category
            $('.drawerlist').hide();
            //Mostro solo quella con quell'id (animazione per ora non mi importa)
            $('#'+catId).toggle();

        },

        check: function() {

            console.log( this.selected );

            if( this.selected == 0 ) {
                $( "#error-modal" ).find('.modal-body').text( "Non hai scelto la tipologia" );
                $( '#error-modal' ).modal();
                return false;
            } else {
               Commons.movesmoothlyTo( "#step3"); 
            }
           
        }
    },
    mounted() {
        console.log("Step2 Mounted!")
        this.initTypes();
    }
});