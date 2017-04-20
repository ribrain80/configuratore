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
    import Light    from '../3d/components/splitligth';
    import Controls    from '../3d/components/controls';
    import Divider  from '../3d/entity/Divider';
    import DividerHelper from '../3d/utils/DividerHelper';
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

                // # Main scene creation and set on Store
                this.$store.commit('setScene',new THREE.Scene());

                // # Get Device Pixel Ratio first for retina todo: add to the store!!!
                if(window.devicePixelRatio) {
                    Config.dpr = window.devicePixelRatio;
                }

                // # Renderer creation and set on Store
                this.$store.commit('setRenderer',new Renderer(this.$store.state.scene, this.container));

                // # Camera creation and set on Store
                this.$store.commit('setCamera',new Camera(this.$store.state.renderer.threeRenderer));

                // # Add OrbitController to the Camera
                this.controls = new Controls(this.$store.state.camera.threeCamera, this.container);

                // # Add lights to the scene
                new Light(this.$store.state.scene);

                // # DividerHelper Create ad set on the store
                this.$store.commit('setDividerHelper',new DividerHelper(new THREE.LoadingManager(),this.$store.state.scene));

             /*   let cc = {
                    x:0,
                    y:0,
                    z:0
                };

                let cd = {
                    x:-150,
                    y:10,    //just a bit over the cassetto
                    z:-170
                };

                let cd1 = {
                    x:150,
                    y:10,    //just a bit over the cassetto
                    z:-170
                };

                let _drawer = {
                    id: 'gino',
                    model: '/images/3dmodels/cassetto_legno.obj',
                    texture: '/images/textures/04_Faggio.jpg',
                    coords: cc
                };

                let _d1 = {
                    id: 'd1',
                    model: '/images/3dmodels/divider.obj',
                    texture: '/images/textures/22_Blu.jpg',
                    coords: cd
                };

                let _d2 = {
                    id: 'd2',
                    model: '/images/3dmodels/divider.obj',
                    texture: '/images/textures/32_Lino chiaro.jpg',
                    coords: cd1
                };

                this.$store.dispatch('add3dDivider',_drawer);
                this.$store.dispatch('add3dDivider',_d1);
                this.$store.dispatch('add3dDivider',_d2);*/




                this.render();





            },

            render: function () {
                this.$store.state.renderer.render(this.$store.state.scene, this.$store.state.camera.threeCamera);
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
        }
    }
</script>
