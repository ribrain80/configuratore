@extends('split.master')

@section('content')
    <section>
        <step3d></step3d>
    </section>
@endsection
@push('jsfooter')
<script src="{{ asset('js/split/step3d.js') }}"></script>
<script>

   /* var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    controls = new THREE.TrackballControls( camera );
    controls.target.set( 0, 0, 0 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth - 150, window.innerHeight - 150 );
    $('#renderer').append( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var render = function () {

        requestAnimationFrame( render );
        controls.update();



        renderer.render(scene, camera);
    };

    render();*/
</script>
@endpush