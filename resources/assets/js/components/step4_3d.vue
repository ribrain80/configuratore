<template>
    <div>
        <div v-show="!this.canUseWebGl">LA TUA SCHEDA VIDEO NON SUPPORTA WEBGL ....</div>
        <div id="step4_3d_container"></div>
    </div>

</template>

<script>


    import Detector from '../3d/utils/detector';
    import Renderer from '../3d/components/renderer';
    import Camera   from '../3d/components/camera';
    import Light    from '../3d/components/light';
    import Divider  from '../3d/entity/Divider';
    import Config   from '../3d/config';
    import * as THREE from 'three';
    /**
     * Vue object managing info section / welcome page
     * @type {Vue}
     */
    export default {

        /**
         * Object data
         * @type {Object}
         */
        data: function() {
            return {
                canUseWebGl:true,
                container:{},
                scene:{},
                camera:{},
                renderer:{},
                meshes:[],
                clock:{},
                OBJLoader:{},
                manager:{}
            }
        },

        /**
         * Object methods
         * @type {Object}
         */
        methods: {
            _init: function() {

                console.log('Init 3d scene');

                this.container = document.getElementById('step4_3d_container');

                //Start clock
                this.clock = new THREE.Clock();

                // Main scene creation
                this.scene = new THREE.Scene();
                this.scene.fog = new THREE.FogExp2(Config.fog.color, Config.fog.near);

                // Get Device Pixel Ratio first for retina
                if(window.devicePixelRatio) {
                    Config.dpr = window.devicePixelRatio;
                }

                this.renderer = new Renderer(this.scene, this.container);

                // Components instantiation
                this.camera = new Camera(this.renderer.threeRenderer);
                //this.controls = new Controls(this.camera.threeCamera, container);
                this.light = new Light(this.scene);

                // Create and place lights in scene
                const lights = ['directional'];
                for(let i = 0; i < lights.length; i++) {
                    this.light.place(lights[i]);
                }




                this.manager = new THREE.LoadingManager();

                /*
                var onProgress = function ( xhr ) {
                    if ( xhr.lengthComputable ) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( Math.round(percentComplete, 2) + '% downloaded' );
                    }
                };

                var onError = function ( xhr ) {
                };*/

                let divider = new Divider(this.manager,this.scene,'https://threejs.org/examples/obj/male02/male02.obj','/images/textures/08_Radica.jpg');

                this.render();





            },

            render: function () {
                this.renderer.render(this.scene, this.camera.threeCamera);
                // RAF
                requestAnimationFrame(this.render.bind(this));
            }

        },

        /**
         * Window onload eq 4 Vue
         * @return {void}
         */
        mounted () {
            //Check if the browser support webgl
            this.canUseWebGl= Detector.webgl;
            if (Detector.webgl) {
                this.canUseWebGl= true;
                this._init();


            }
        },

        updated() {
        }
    }
</script>
