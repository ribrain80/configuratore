<html>
    <head>
        @include('shared.masterHead')
    </head>
    <body>
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
                <div class="navbar-collapse collapse" id="navbar">

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
                <div class="col-sm-2 col-md-1 sidebar">

                        <div class="row placeholders">
           					 <div class="col-xs-6 col-sm-3 placeholder">
	                            <a href="#">
									<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="100" class="img-responsive" alt="Generic placeholder thumbnail">
	                            </a>
                            </div>
                        </div>
                        <div class="row placeholders">
           					 <div class="col-xs-6 col-sm-3 placeholder">
	                            <a href="#">
									<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="100" class="img-responsive" alt="Generic placeholder thumbnail">
	                                <span class="sr-only">
	                                    (current)
	                                </span>
	                            </a>
                            </div>
                        </div>
                        <div class="row placeholders">
           					 <div class="col-xs-6 col-sm-3 placeholder">
	                            <a href="#">
									<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="100" class="img-responsive" alt="Generic placeholder thumbnail">

	                            </a>
                            </div>
                        </div>

                    </ul>
                </div>
                <div class="col-sm-10 col-sm-offset-2 col-md-11 col-md-offset-1 main">
                    <div class="row placeholders">
                        <languageselector></languageselector>
                        <div class="row">
                            @yield( "content" )
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @include('shared.jsfooter')
    </body>
</html>
