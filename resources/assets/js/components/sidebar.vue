<template>
    <div class="col-md-1 col-lg-2 sidebar">
        <div class="row">
            <div class="col-xs-12 logo orange sidebar-elem logo">
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 nuovaconf sidebar-elem">
                <a data-toggle="modal" data-target="#new-conf-modal">{{ "menu.newconf" | translate }}</a>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 sidebar-elem navigator">
                <ul class="nav hidden-xs router-links" id="nav">
                    <li>
                        <router-link to="/split/step1" class="">
                            <div class=" "></div> <span class="">{{ "informazioni" | translate}}</span>
                        </router-link>
                    </li>
                    <li class="vertline "></li>
                    <li>
                        <router-link to="/split/step2">
                            <div class=" "></div> <span class="">{{"scelta tipologia di cassetto" | translate}}</span>
                        </router-link>
                    </li>
                    <li class="vertline "></li>
                    <li>
                        <router-link to="/split/step3">
                            <div class=" "></div> <span class="">{{"dimensioni cassetto" | translate}}</span>
                        </router-link>
                    </li>
                    <li class="vertline "></li>
                    <li>
                        <router-link to="/split/stepponte">
                            <div class=" "></div> <span class="">{{"scelta elemento ponte" | translate}}</span>
                        </router-link>
                    </li>
                    <li class="vertline "></li>
                    <li>
                        <router-link to="/split/step4">
                            <div class=" "></div> <span class="">{{"gestione divisori" | translate}}</span>
                        </router-link>
                    </li>
                    <li class="vertline "></li>
                    <li>
                        <router-link to="/split/step5">
                            <div class=" "></div> <span class="">{{ "download" | translate}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="row pushdown">
                <div class="col-xs-12 sidebar-elem navigator">
                    <a class="btn btn-primary btn-block btn-salice" id="gallery-trigger">{{ "menu.gallery" | translate }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Vue object managing bridge / bridge support choice
     * @type {Vue}
     */
    export default {

        /**
         * Object data
         * @type {Object}
         */
        data: function() {

            return {}
        },

        methods: {
            getClasses: function (step) {

                return "";
            }
        },
        mounted() {

        }
    }

</script>