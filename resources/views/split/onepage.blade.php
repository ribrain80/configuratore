@extends('split.master')

@section('content')
    <section>
        <step1></step1>
    </section>
    <section>
        <step2></step2>
    </section>
    <section>
        <step3></step3>
    </section>
    <section>
        <stepponte></stepponte>
    </section>    
    <section>
        <step4></step4>
    </section>
    <section>
        <step5></step5>
    </section>

    @push('jsfooter')
    <script src="{{ asset('js/split/bus.js') }}"></script>
    <script src="{{ asset('js/split/Commons.js') }}"></script>
    <script src="{{ asset('js/split/Configuration.js') }}"></script>
    <script src="{{ asset('js/split/step1.js') }}"></script>
    <script src="{{ asset('js/split/step2.js') }}"></script>
    <script src="{{ asset('js/split/step3.js') }}"></script>
    <script src="{{ asset('js/split/step-ponte.js') }}"></script>
    <script src="{{ asset('js/split/step4.js') }}"></script>
    <script src="{{ asset('js/split/step5.js') }}"></script>
    <script src="{{ asset('js/lang/i18n.js')}}"></script>
    <script src="{{ asset('js/split/newconfiguration.js')}}"></script>
    @endpush

@endsection
