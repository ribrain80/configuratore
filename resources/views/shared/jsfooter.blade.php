<script src="{{asset('js/lang/i18n.js')}}"></script>
@stack('jsfooter')
@yield( "page-related-footer-js" )

<script>
    var h = document.body.clientHeight;
    var hn = $('.navbar').outerHeight();
    $('section').innerHeight(h-hn);
</script>