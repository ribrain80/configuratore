<html>
    <head>
        @include('shared.masterHead')
    </head>
    <body data-spy="scroll" data-target=".scrollspy" data-offset="70">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button aria-controls="navbar" aria-expanded="false" class="navbar-toggle collapsed" data-target="#navbar" data-toggle="collapse" type="button">
                        <span class="sr-only">
                            Toggle navigation
                        </span>
                        <span class="icon-bar">
                        </span>
                        <span class="icon-bar">
                        </span>
                        <span class="icon-bar">
                        </span>
                    </button>
				      <a class="navbar-brand" href="#">
				        <img alt="Brand" src="{{ asset('/images/salice.jpg') }}">
				      </a>
                </div>
                <div class="navbar-collapse collapse">

                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="#">
                                Login
                            </a>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-2 col-md-1 scrollspy">
                    <ul class="nav hidden-xs hidden-sm" data-spy="affix" id="nav">
                        <li><a href="#step1">Step1</a></li>
                        <li><a href="#step2">Step2</a></li>
                        <li><a href="#step3">Step3</a></li>
                        <li><a href="#step4">Step4</a></li>
                    </ul>
                </div>
                <div class="col-sm-10 col-sm-offset-2 col-md-11 col-md-offset-1 main">
                    <div class="row">
                        <languageselector></languageselector>
                        <div class="row">
                            @yield( "content" )
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>

        $( function() {
            $('#nav').affix({
                offset: {
                    top: $('#nav').offset().top
                }
            });
        });

        </script>
        @include('shared.jsfooter')
    </body>
</html>
