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
    import Controls    from '../3d/components/controls';
    import Divider  from '../3d/entity/Divider';
    import DividerFactory from '../3d/utils/DividerFactory';
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
                manager:{},
                dividerFactory:{}
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

                // # fog disabled
                this.scene.fog = new THREE.FogExp2(Config.fog.color, Config.fog.near);

                // Get Device Pixel Ratio first for retina
                if(window.devicePixelRatio) {
                    Config.dpr = window.devicePixelRatio;
                }

                this.renderer = new Renderer(this.scene, this.container);

                // Components instantiation
                this.camera = new Camera(this.renderer.threeRenderer);
                this.controls = new Controls(this.camera.threeCamera, this.container);
                this.light = new Light(this.scene);

                // Create and place lights in scene
                const lights = ['directional','ambient'];
                for(let i = 0; i < lights.length; i++) {
                    this.light.place(lights[i]);
                }

                this.manager = new THREE.LoadingManager();

                this.dividerFactory = new DividerFactory(this.manager,this.scene);

                let cc = {
                    x:0,
                    y:0,
                    z:0
                };

                let cd = {
                    x:-150,
                    y:10,    //just a bit over the cassetto
                    z:-170
                };

                this.dividerFactory.addDivider('gino','/images/3dmodels/cassetto_legno.obj','/images/textures/08_Radica.jpg',cc);
                this.dividerFactory.addDivider('gino2','/images/3dmodels/divider.obj','/images/textures/22_Blu.jpg',cd);

                //this.dividerFactory.removeDivider('gino');

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
