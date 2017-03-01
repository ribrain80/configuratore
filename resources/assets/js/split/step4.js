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
        },

        genHref:function (val) {
            return "#elem"+val;
        },

        getDividerByCat: function(val) {
            return this.dividers.dividers[val];
        },

        check: function() {

            if( this.selected.length == 0 ) {
                console.log( "in" );
                $( "#error-modal" ).find('.modal-body').text( "Devi selezionare almeno un divisorio" );
                $( '#error-modal' ).modal();
                Commons.movesmoothlyTo( "#step4"); 
                return false;  
            } else {
                Commons.movesmoothlyTo( "#step5"); 
            }
        }, 

    },

    watch: {
        // whenever question changes, this function will run
        selected: function (val) {
            Configuration.dividers = val;
        }
    },

    mounted() { // # Window onload eq

        console.log("Step4 mounted!");
        this.initDividers();

        //see http://www.greensock.com/draggable/ for more details.

        /*var droppables = $(".box");
        console.log(droppables);

        //the overlapThreshold can be a percentage ("50%", for example, would only trigger when 50% or more of the surface area of either element overlaps) or a number of pixels (20 would only trigger when 20 pixels or more overlap), or 0 will trigger when any part of the two elements overlap.
        var overlapThreshold = "0"; 

        //we'll call onDrop() when a Draggable is dropped on top of one of the "droppables", and it'll make it "flash" (blink opacity). Obviously you can do whatever you want in this function.
        function onDrop(dragged, dropped) {
          TweenMax.fromTo(dropped, 0.1, {opacity:1}, {opacity:0, repeat:3, yoyo:true});
        }

        Draggable.create( droppables, {

          type:"x,y",
          bounds:"#container",
          edgeResistance:0.65,

          onDrag: function(e) {
            var i = droppables.length;
                while (--i > -1) {
                    if (this.hitTest(droppables[i], overlapThreshold)) {
                     $(droppables[i]).addClass("highlight");
                    } else {
                     $(droppables[i]).removeClass("highlight");
                    }
                   
                   ALTERNATE TEST: you can use the static Draggable.hitTest() method for even more flexibility, like passing in a mouse event to see if the mouse is overlapping with the element...
                   if (Draggable.hitTest(droppables[i], e) && droppables[i] !== this.target) {
                     $(droppables[i]).addClass("highlight");
                   } else {
                     $(droppables[i]).removeClass("highlight");
                   }
                   
                }
          },
          onDragEnd:function(e) {
                var i = droppables.length;
                while (--i > -1) {
                    if (this.hitTest(droppables[i], overlapThreshold)) {
                        console.log( this.target );
                        onDrop(this.target, droppables[i]);
                    }
                }
            }
        });*/
    }

});
