<template>
    <!-- Fixed navbar -->
    <div class="app-nav">
        <div class="row">
            <nav role="navigation" class="navbar navbar-default  navbar-inverse">
                <div class="col-xs-1 split-header">
                    Split
                </div>
                <div class="container-fluid">
                    <languageselector></languageselector>
                </div>
            </nav>
        </div>
        <div class="row component-header">
            <div class="col-xs-1"></div>
            <div class="col-xs-11">{{this.$store.state.currentComponentHeader | translate}}</div>
        </div>
    </div>
</template>

<script>

    /**
     * Vue object managing info section / welcome page
     * @type {Vue}
     */
    export default {

        /**
         * Object data
         * @type {Object}
         */
        data: function() { return {} },

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

            // # Log mount


        }
    }
</script>