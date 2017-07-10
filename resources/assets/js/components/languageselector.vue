<template>

    <!-- Langiage selector dropdown -->
    <ul class="nav navbar-nav navbar-right">

        <li class="dropdown">

            <!-- Short names hooks -->
            <a href="#" class="dropdown-toggle lang-text" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false">{{ getShort() }} <span class="glyphicon glyphicon-menu-down menu-arrow"></span></a>
            
            <!-- Actual names and binding -->
            <ul class="dropdown-menu">
                <li v-for="language in languages">
                    <a :class="{ active: (language.code==activeLanguage) }" href="#_"
                       @click="changeLanguage( language.code )"> {{ language.label }} </a>
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

            /**
             * Availabel loclizations
             * @type {Array}
             */
            languages: [

                { label:'Italiano ', code:'it', short:'Ita' },
                { label:'English ',  code:'en', short:'Eng' },
                { label:'Español ',  code:'es', short:'Esp' },
                { label:'Français ', code:'fr', short:'Fra' },
                { label:'Português ',code:'pt', short:'Por' },
                { label:'Deutsch ',  code:'de', short:'Deu' },
                { label:'中国',      code:'zh', short:'中国' },
            ]

        }
    },

    /**
     * Object methods
     * @type {Object}
     */
    methods: {

        /**
         *  Return short language label
         */
        getShort: function () {
            let langObj = this.languages.filter( ( lang ) => { return lang.code == this.$store.state.language; } );
            return langObj[ 0 ].short.toUpperCase();
        },

        /**
         * Change Gui Language
         * After language choice set the cookie for persistence
         * @param newLanguage
         */
        changeLanguage: function (newLanguage) {

            console.log( 'Changing Language to: ' + newLanguage );

            // # Set cookie an commit
            this.$cookie.set( 'langCookie', newLanguage );
            this.$store.commit( "setLanguage", newLanguage );

            // # Title and Meta dynamic translation
            document.title = Vue.i18n.translate( "split.page.title" );
            $( "meta[name=description]" ).attr( "content", Vue.i18n.translate( "split.meta.description" ) );    
        }
    },

    /**
     * Window onload eq 4 Vue
     * @return {void}
     */
    mounted () {
        
        // # Check if the choosed the language in other sessions
        let fromCookie = this.$cookie.get('langCookie');
        if (fromCookie) {
            this.$store.commit( "setLanguage", fromCookie );
        }
    }
}
</script>
