var step5 = new Vue({

    el: 'step5',

    data: {
        brochure: false,
        summary: true,
        email: '',
        send: false,
        download: false,
        alert_message: '',
        has_error: false
    },

    methods: {

        savedrawer: function() {
            
            if( Configuration.drawertype < 1 ) {
                this.has_error = true;
                this.alert_message = "Non hai selezionato la tipologia del cassetto";
                Commons.movesmoothlyTo( "#step2" );
                return false;
            }

            if( !Configuration.dimensions.width || !Configuration.dimensions.length || !Configuration.dimensions.shoulder_height) {
                this.has_error = true;
                this.alert_message = "Controlla le dimensioni del cassetto";
                Commons.movesmoothlyTo( "#step3" );
                return false;
            }

            if( !Configuration.dividers.length ) {
                this.has_error = true;
                this.alert_message = "Non hai scelto alcun divisorio";
                Commons.movesmoothlyTo( "#step4" );
                return false;
            }            

            if( this.brochure === false && this.summary == false ) {
                this.has_error = true;
                this.alert_message = "è necessario scegliere almeno una delle opzioni tra Brochure e Riepilogo";
                return false;
            }

            if ( event.target.id == "email" ) {

                if( this.email.length === 0 ) {
                    console.log( "IN" );
                    this.has_error = true;
                    this.alert_message = "è necessario indicare un indirizzo email per la spedizione";
                    return false;
                }

                if( !this.validateEmail() ) {
                    this.has_error = true;
                    this.alert_message = "l'email indicata non è valida";
                    return false;
                }                

                this.send = true;
                this.download = false;

                this.has_error=true;
                this.alert_message="Funzionalità non testabile in homestead";
                return false;
            }


            if ( event.target.id == "download" ) {
                this.send = false;
                this.download = true;
            }

            var self = this;

            Pace.track( function() {
                console.log( Configuration );
                self.$http.post( '/split/savedrawer', Configuration).then( response => {
                    self.has_error = false;
                    window.open(response.body.pdfpath,'_blank');
                }, response => {
                    self.alert_message = "impossibile completare l'operazione, si prega di riprovare più tardi";
                    self.has_error = true;
                });
            });
        },

        validateEmail: function() {
            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test( this.email );
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
