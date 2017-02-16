var step4 = new Vue({

    el: 'step4',

    data: {
        dividers:[],
        selected:[]
    },

    methods: {

        initDividers: function () {
            this.$http.get('/split/dividers').then(response => {
                this.dividers=response.body;
            }, response => {

            });
        },

        pushDivider: function ( event ) {

            var id = event.target.id;
            var id_index = $.inArray( id, this.selected );

            if(  id_index != -1 ) {
                this.selected.splice( id_index, 1 );
                return;
            } 

            this.selected.push( id );
            console.log( this.selected );
        }
    },

    watch: {
        // whenever question changes, this function will run
        selected: function (val) {
            Configuration.dividers = val;
        }
    },

    mounted() { // # Window onload eq
        console.log("Step4 mounted!")
        this.initDividers();
    }

});
