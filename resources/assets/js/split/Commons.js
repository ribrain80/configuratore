var Commons = {

    movesmoothlyTo: function( target ) {
        $( "html, body" ).delay( 1000 ).animate( { scrollTop: $( target ).offset().top - 70 }, 1000 ); 
    }
}