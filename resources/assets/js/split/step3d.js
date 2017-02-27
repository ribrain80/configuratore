var step3d = new Vue({

    el: 'step3d',

    data: {
        rederSystem: {
            domRenderId:'renderer',
            scene:null,
            camera:null,
            controls:null,
            renderer:null
        },
        drawer:{
            x:6,
            y:6
        }

    },

    watch: {

    },

    methods: {
        _init3d: function () {
            this.rederSystem.scene = new THREE.Scene();
            this.rederSystem.scene.background = new THREE.Color( 0xffffff );
            this.rederSystem.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
            this.rederSystem.camera.position.z = 5;
            this.rederSystem.controls = new THREE.TrackballControls( this.rederSystem.camera );
            this.rederSystem.controls.target.set( 0, 0, 0 );
            this.rederSystem.renderer = new THREE.WebGLRenderer();
            this.rederSystem.renderer.setSize( window.innerWidth - 150, window.innerHeight - 150 );




            $('#'+this.rederSystem.domRenderId).append( this.rederSystem.renderer.domElement );
            var self = this;
            var render = function () {
                requestAnimationFrame( render );
                self.rederSystem.controls.update();
                self.rederSystem.renderer.render(self.rederSystem.scene, self.rederSystem.camera);
            }
            render();
        },

        _initDrawer:function () {
            var geometry = new THREE.PlaneGeometry( this.drawer.x, this.drawer.y );
            var material = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( geometry, material );
            plane.position.x = this.drawer.x/2;
            plane.position.y = this.drawer.x/2;
            this.rederSystem.scene.add( plane );
        },

        addElement: function (w,l,h,x,y) {
            var geometry = new THREE.BoxGeometry( w, l, h );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var cube = new THREE.Mesh( geometry, material );
            cube.position.z = h/2;
            cube.position.x = x + w/2;
            cube.position.y = y + l/2;
            this.rederSystem.scene.add( cube );
        },


    },

    mounted() {
        console.log("Step3d Mounted!");
        this._init3d();
        this._initDrawer();
        this.addElement(2,2,2,0,0);




/*
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );*/






    }
});