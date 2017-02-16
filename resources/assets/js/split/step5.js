var step5 = new Vue({

    el: 'step5',

    data: {
       
    },

    methods: {

       savedrawer: function() {
            this.$http.post( '/split/savedrawer', Configuration ).then( response => {
            console.log( "success" );
          }, response => {
            console.log( "something went wrong" );
          });
       }
    },

    mounted() { // # Window onload eq
        console.log("Step5 mounted!")
    }

});
