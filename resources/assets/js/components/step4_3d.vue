<template>
    <div>
        <div v-show="!this.canUseWebGl">LA TUA SCHEDA VIDEO NON SUPPORTA WEBGL ....</div>
        <div v-show="this.canUseWebGl">LA TUA SCHEDA VIDEO  SUPPORTA WEBGL .... OK!!!</div>
    </div>

</template>

<script>


    import Detector from '../3d/utils/detector';
    /**
     * Vue object managing info section / welcome page
     * @type {Vue}
     */
    export default {

        /**
         * Object data
         * @type {Object}
         */
        data: function() { return {
            canUseWebGl:false
        } },

        /**
         * Object methods
         * @type {Object}
         */
        methods: {


        },

        /**
         * Window onload eq 4 Vue
         * @return {void}
         */
        mounted () {
            //Check if the browser support webgl
            this.canUseWebGl= Detector.webgl;



        }
    }
</script>