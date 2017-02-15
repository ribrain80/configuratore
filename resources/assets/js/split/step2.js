var splitcreate = new Vue({
    el: 'step2',
    data: {
        drawerId:'',
        nextStepRoute:'',
        selected:'',
        hasError:true,
        types:[],
    },

    methods: {

        initTypes: function () {
            this.$http.get('/split/drawerstypes').then(response => {
                this.types=response.body;
            }, response => {
                this.hasError=true;
            });
        },
        setType: function (type) {
            this.selected=type;
            this.hasError=false;
        }
    },
    mounted() {
        console.log("Step2 Mounted!")
        this.initTypes();
    }
});
