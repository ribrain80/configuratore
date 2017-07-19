<template>
    <div>
        <div v-if="!this.canUseWebGl">LA TUA SCHEDA VIDEO NON SUPPORTA WEBGL ....</div>
        <div v-else>
            <div class="row">
                <div class="col-sm-12">
                    <div id="step4_3d_container"></div>
                </div>
                <div class="col-sm-12 center-block" style="text-align:center;margin-top:5px">
                    <button class="btn-sm btn-3d-control" @click="fakePan(40)"><span class="glyphicon glyphicon glyphicon-arrow-up" aria-hidden="true"></span></button>
                    <button class="btn-sm btn-3d-control" @click="fakePan(38)"><span class="glyphicon glyphicon glyphicon-arrow-down" aria-hidden="true"></span></button>
                    
                    <button class="btn-sm btn-3d-control" @click="fakePan(39)"><span class="glyphicon glyphicon glyphicon-arrow-left" aria-hidden="true"></span></button>
                    <button class="btn-sm btn-3d-control" @click="fakePan(37)"><span class="glyphicon glyphicon glyphicon-arrow-right" aria-hidden="true"></span></button>
                </div>
            </div>

        </div>

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

            fakePan: function (direction) {
                console.log("FAKE PAN!!!!!");
                let fakeUp = new Event('fakepan');
                fakeUp.keyCode = direction;
                window.dispatchEvent( fakeUp );
            },

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
