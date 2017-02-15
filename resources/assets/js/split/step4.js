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
        pushDivider: function (id) {
            this.selected.push(id);
        }
    },

    mounted() { // # Window onload eq
        console.log("Step4 mounted!")
        this.initDividers();
    }

});
