@extends('split.master')

@section('content')
    <section>
        <div class="row" id="step1">
            <div class="col-md-12" >
                <h3>STEP 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Vestibulum id metus ac nisl bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet sagittis. In tincidunt orci sit amet elementum vestibulum. Vivamus fermentum in arcu in aliquam. Quisque aliquam porta odio in fringilla. Vivamus nisl leo, blandit at bibendum eu, tristique eget risus. Integer aliquet quam ut elit suscipit, id interdum neque porttitor. Integer faucibus ligula.Quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Ut tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio. Phasellus auctor velit at lacus blandit, commodo iaculis justo viverra. Etiam vitae est arcu. Mauris vel congue dolor. Aliquam eget mi mi. Fusce quam tortor, commodo ac dui quis, bibendum viverra erat. Maecenas mattis lectus enim, quis tincidunt dui molestie euismod. Curabitur et diam tristique, accumsan nunc eu, hendrerit tellus. Tibulum consectetur scelerisque lacus, ac fermentum lorem convallis sed.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Vestibulum id metus ac nisl bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet sagittis. In tincidunt orci sit amet elementum vestibulum. Vivamus fermentum in arcu in aliquam. Quisque aliquam porta odio in fringilla. Vivamus nisl leo, blandit at bibendum eu, tristique eget risus. Integer aliquet quam ut elit suscipit, id interdum neque porttitor. Integer faucibus ligula.Quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Ut tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio. Phasellus auctor velit at lacus blandit, commodo iaculis justo viverra. Etiam vitae est arcu. Mauris vel congue dolor. Aliquam eget mi mi. Fusce quam tortor, commodo ac dui quis, bibendum viverra erat. Maecenas mattis lectus enim, quis tincidunt dui molestie euismod. Curabitur et diam tristique, accumsan nunc eu, hendrerit tellus. Tibulum consectetur scelerisque lacus, ac fermentum lorem convallis sed.</p>
            </div>
        </div>
    </section>
    <section>
        <step2></step2>
    </section>
    <section>
        <step3></step3>
    </section>
    <section>
        <step4></step4>
    </section>
    <section>
        <step5></step5>
    </section>

    <!--PORCHERIA -->
    @push('jsfooter')
    <script src="{{ asset('js/split/step2.js') }}"></script>
    <script src="{{ asset('js/split/step3.js') }}"></script>
    <script src="{{ asset('js/split/step4.js') }}"></script>
    <script src="{{ asset('js/split/step5.js') }}"></script>
    <script>
        var Configuration = {
            data: {
                drawertype:step2.selected,
                dimensions: {
                    width:step3.width,
                    depth:step3.depth,
                    length:step3.length
                },
                dividers:step4.selected,
                bridges:[]
            }
        };
    </script>
    @endpush

@endsection
