<!DOCTYPE html>
<html lang="en">

<head>
    @include('shared.masterHead')
</head>
<body data-spy="scroll" data-target=".scrollspy"  data-offset="70px">
<nav role="navigation" class="navbar navbar-default navbar-fixed-top navbar-inverse">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <img alt="Brand" class="navbar-brand" src="{{ asset('/images/salice.jpg') }}">
        </div>
        <!-- Collection of nav links and other content for toggling -->
        <div id="navbarCollapse" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a lang="it" id="newone" href='{{route('split.onepage')}}'>Nuova configurazione</a></li>
                <li><a lang="it" id="oldone" href='{{route('split.load')}}'>Carica configurazione salvata in precedenza</a></li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Scelta lingua <span class="caret"></span></a>
                    <languageselector></languageselector>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-2 col-md-1 scrollspy" >
            <ul class="nav hidden-xs hidden-sm affix-top" data-spy="affix" data-offset="70px" id="nav">
                <li><a href="#step1">Step1</a></li>
                <li><a href="#step2">Step2</a></li>
                <li><a href="#step3">Step3</a></li>
                <li><a href="#step4">Step4</a></li>
            </ul>
        </div>
        <div class="col-sm-10 col-md-11" id="maincontent">
            @yield( "content" )
        </div>
    </div>
</div>
@include('shared.jsfooter')
</body>
</html>                                		