<template>
    <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle lang-text" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false">{{ getShort() }} <span class="caret"></span></a>

            <ul class="dropdown-menu">
                <li v-for="language in languages">
                    <a :class="{ active: (language.code==activeLanguage) }" href="#_"
                       @click="changeLanguage(language.code)"> {{ language.label }} </a>
                </li>
            </ul>
        </li>
    </ul>
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
            languages:[
                {label:'Italiano ',code:'it',short:'Ita'},
                {label:'English ',code:'en',short:'Eng'},
                {label:'Español ',code:'es',short:'Epa'},
                {label:'Français ',code:'fr',short:'Fra'},
                {label:'Português ',code:'pt',short:'Por'},
                {label:'Deutsch ',code:'de',short:'Deu'},
                {label:'中国',code:'zh',short:'中国'},
            ]

        }
    },

    methods: {
        /**
         *  Return short language label
         */
        getShort: function () {
            let langObj = this.languages.filter((lang)=> {return lang.code==this.$store.state.language;});
            return langObj[0].short.toUpperCase();
        },
        /**
         * Change Gui Language
         * After language choice set the cookie for persistence
         * @param newLanguage
         */
        changeLanguage: function (newLanguage) {
            console.log('ChangeLanguage to: '+newLanguage);
            this.$cookie.set('langCookie',newLanguage);
            this.$store.commit( "setLanguage", newLanguage );
        }
    },
    mounted() {
        //Check if the choosed the language in other sessions
        let fromCookie = this.$cookie.get('langCookie');
        if (fromCookie) {
            this.$store.commit( "setLanguage", fromCookie );
        }
    }
}

</script>
