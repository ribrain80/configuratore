var step5 = new Vue({
    el: 'step5',
    data: {
        brochure: false,
        summary: false,
        email: '',
        send: false,
        download: false
    },
    methods: {
        savedrawer: function() {
            if (event.target.id == "email") {
                this.send = true;
                this.download = false;
            }
            if (event.target.id == "download") {
                this.send = false;
                this.download = true;
            }
            console.log(Configuration);
            return false;
            this.$http.post('/split/savedrawer', Configuration).then(response => {
                console.log("success");
            }, response => {
                console.log("something went wrong");
            });
        }
    },
    watch: {
        brochure: function(val) {
            Configuration.pdf.brochure = val;
        },
        summary: function(val) {
            Configuration.pdf.summary = val;
        },
        email: function(val) {
            Configuration.pdf.email = val;
        },
        send: function( val ) {
          Configuration.pdf.send = val;
        },
        download: function( val ) {
          Configuration.pdf.download = val;
        }
    },
    mounted() { // # Window onload eq
        console.log("Step5 mounted!")
    }
});
