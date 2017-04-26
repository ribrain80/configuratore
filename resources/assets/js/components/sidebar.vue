<template>
    <div class="col-md-2 col-lg-2 sidebar">
        <div class="row">
            <div class="col-lg-12 logo orange sidebar-elem logo text-center">
                <img src="/images/logos/salice.png"/>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 nuovaconf sidebar-elem">
                <a data-toggle="modal" data-target="#new-conf-modal">{{ "menu.newconf" | translate }}</a>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 sidebar-elem navigator">
                <ul class="nav hidden-xs router-links" id="nav">
                    <li :class="this.$store.state.onecompleted ? 'reached' : ''">
                        <router-link to="/split/step1" >
                            <span >{{ "step1.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="this.$store.state.twocompleted ? 'reached' : ''">
                        <router-link to="/split/step2">
                            <span >{{ "step2.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="this.$store.state.threecompleted ? 'reached' : ''">
                        <router-link to="/split/step3">
                            <span >{{ "step3.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="this.$store.state.bridgecompleted ? 'reached' : ''">
                        <router-link to="/split/stepponte">
                            <span >{{ "stepponte.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="this.$store.state.fourcompleted ? 'reached' : ''">
                        <router-link to="/split/step4">
                            <span >{{ "step4.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="this.$store.state.fivecompleted ? 'reached' : ''">
                        <router-link to="/split/step5">
                            <span >{{ "step5.header-title" | translate }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>

        </div>
        <div class="row actions">
            <div class="col-lg-12 sidebar-elem navigator " >
                <a class="btn btn-danger btn-block btn-raised center-block" id="gallery-trigger">{{ "menu.gallery" | translate }}</a>
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

            return {
            }
        },

        methods: {
            getClass: function (step) {
                let cls = "";
                console.log( this.$store.router );
                switch (step) {

                }
                return "";
            }
        },
        mounted() {

        }
    }

</script>