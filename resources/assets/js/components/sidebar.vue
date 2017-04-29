<style scoped>
    /** Setto localmente tutti gli a con cursor default e risetto a pointer solo per quelli reached e per la gallery*/
    a {
        cursor: default;
    }
    .reached a, #gallery-trigger {
        cursor: pointer;
    }

</style>
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
                <span class="pointer-navigator"></span>
                <ul class="nav hidden-xs router-links" id="nav">
                    <li :class="[this.$store.state.currentStep == 1 ? 'current-step' : '', this.$store.state.onecompleted ? 'reached' : '']">
                        <router-link :to="this.$store.state.onecompleted ? '/split/step1' : ''" >
                            <span >{{ "step1.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="[this.$store.state.currentStep == 2 ? 'current-step' : '', this.$store.state.twocompleted ? 'reached' : '']">
                        <router-link :to="this.$store.state.twocompleted ? '/split/step2' : ''">
                            <span >{{ "step2.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="[this.$store.state.currentStep == 3 ? 'current-step' : '',this.$store.state.threecompleted ? 'reached' : '']">
                        <router-link :to="this.$store.state.threecompleted ? '/split/step3' : ''">
                            <span >{{ "step3.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="[this.$store.state.currentStep == 'p' ? 'current-step' : '',this.$store.state.bridgecompleted ? 'reached' : '']">
                        <router-link :to="this.$store.state.bridgecompleted ? '/split/stepponte' : ''">
                            <span >{{ "stepponte.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="[this.$store.state.currentStep == 4 ? 'current-step' : '',this.$store.state.fourcompleted ? 'reached' : '']">
                        <router-link :to="this.$store.state.fourcompleted ? '/split/step4' : ''">
                            <span >{{ "step4.header-title" | translate }}</span>
                        </router-link>
                    </li>
                    
                    <li :class="[this.$store.state.currentStep == 5 ? 'current-step' : '',this.$store.state.fivecompleted ? 'reached' : '']">
                        <router-link :to="this.$store.state.fivecompleted ? '/split/step5' : ''">
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

                currentStep: this.$store.state.currentStep
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

        watch: {
            currentStep: function(){
                console.log("changed currentstep locl ");
            }
        },
        mounted() {

            let $nav = $(".navigator #nav").find("li");
            $(window).on("resize",function() {
                let pos = 0;
                let $pointer = $(".navigator .pointer-navigator");
                let $active = $nav.find("a.router-link-active");
                let $parentActive = $active.parent("li");
               
                pos = parseInt($parentActive.position().top);
                $pointer.removeAttr("style").attr("style","transform: translateY(" + pos.toString() + "px)");
            });

            $nav.on("mouseenter mouseleave click",function(e) {
                let pos = 0;
                let $pointer = $(".navigator .pointer-navigator");
                let $active = $nav.find("a.router-link-active");
                let $parentActive = $active.parent("li");
                let isReached = $(this).hasClass("reached");
                let isCurrStepReached = $(this).hasClass("current-step reached")
                
                pos = parseInt($(this).position().top);

                if(isReached) $pointer.addClass("reached");
                if(isCurrStepReached) $pointer.removeClass("reached");                
                if(e.type === "mouseleave") {
                    pos = parseInt($parentActive.position().top);
                    $pointer.removeClass("reached");   
                } 
                if(isReached)
                    $pointer.removeAttr("style").attr("style","transform: translateY(" + pos.toString() + "px)");
                
                e.stopPropagation();
            });

        }
    }

</script>