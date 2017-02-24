var step2 = new Vue({

    el: 'step1',

    data: {

    },

    watch: {

    },

    methods: {
        check: function() {
            Commons.movesmoothlyTo( "#step2"); 
        }
    },

    mounted() {
        console.log("Step1 Mounted!");
    }
});