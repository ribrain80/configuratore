<template>
    <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false">{{ $store.state.language }} <span class="caret"></span></a>

            <ul class="dropdown-menu">
                <li v-for="language in languages">
                    <a :class="{ active: (language.code==activeLanguage) }" class="langlink" href="#_"
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
                {label:'Italiano ',code:'it'},
                {label:'English ',code:'en'},
                {label:'Español ',code:'es'},
                {label:'Français ',code:'fr'},
                {label:'Português ',code:'pt'},
                {label:'Deutsch ',code:'de'},
                {label:'中国 ',code:'zh'},
            ]

        }
    },

    methods: {
        changeLanguage: function (newLanguage) {
            console.log('ChangeLanguage to: '+newLanguage);
            this.activeLanguage=newLanguage;
            this.$cookie.set('langCookie',newLanguage);
            this.$store.commit( "setLanguage", newLanguage );
        }
    },
    mounted() {
        let fromCookie = this.$cookie.get('langCookie');
        if (fromCookie) {
            this.activeLanguage=fromCookie;
            this.$store.commit( "setLanguage", fromCookie );
        }
    }
}

</script>
