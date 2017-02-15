var step4 = new Vue({

    el: 'step4',

    data: {
        dividers:[]
    },

    methods: {
        initDividers: function () {
            this.$http.get('/split/dividers').then(response => {
                this.dividers=response.body;
            }, response => {

            });
        }
    },

    mounted() { // # Window onload eq
        console.log("Step4 mounted!")
        this.initDividers();
    }

});
