import Vue          from 'vue'
import Vuex         from 'vuex'
import vuexI18n     from 'vuex-i18n'
import mutations    from './mutations'
import translations from './translations'

Vue.use( Vuex );

/**
 * [store description]
 * @type {Vuex}
 */
const store = new Vuex.Store({

    /**
     * Inject I18n module
     */
    modules:{
        i18n: vuexI18n.store
    },

    /**
     * Inject mutations from mutations.js
     */
    mutations:mutations,

    state: {

        /**
         * Linguagio dell'interfaccia grafica
         * @type: string
         */
        language:'it',

        /**
         * Id of the drawer, if 0 it is a new drawer
         */
        drawerId:0,

        /**
         * [drawertype description]
         * @type {Number}
         */
        drawertype: 0,


        /**
         * [bridge_category description]
         * @type {Number}
         */
        drawer_type_category: 0,

        /**
         * [is_lineabox description]
         * @type {Boolean}
         */
        is_lineabox: false,

        /**
         * [dimensions description]
         * @type {Object}
         */
        dimensions: {

            /**
             * [width description]
             * @type {Number}
             */
            width: 800,

            /**
             * [shoulder_height description]
             * @type {Number}
             */
            shoulder_height: 100,

            /**
             * [length description]
             * @type {Number}
             */
            length: 600,

            /**
             * [available_width description]
             * @type {Number}
             */
            delta_width: 0,

            /**
             * [available_length description]
             * @type {Number}
             */
            delta_length: 0,
        },

        /**
         * drawer width must not exceed a value for a H bridge to be chosen
         * @type {Boolean}
         */
        is_suitable_width_4hbridge: true,

        /**
         * shoulder height must exceed a minimum value to allow for a bridge to be chosen
         * @type {Boolean}
         */
        is_suitable_height_4bridge: true,

        /**
         * [bridge_orientation description]
         * @type {String}
         */
        bridge_orientation: "",

        /**
         * [has_bridge description]
         * @type {Boolean}
         */
        has_bridge: false,

        /**
         * [bridge_supportID description]
         * @type {Number}
         */
        bridge_supportID: 0,

        /**
         * [bridge_ID description]
         * @type {Number}
         */
        bridge_ID: 0,

        /**
         * [bridge_supports_selected description]
         * @type {Array}
         */
        bridge_supports_selected: [],

        /**
         * [bridges_selected description]
         * @type {Array}
         */
        bridges_selected: [],

        /**
         * [dividers description]
         * @type {Array}
         */
        dividers_selected:[],

        /**
         * [pdf description]
         * @type {Object}
         */
        pdf: {

            brochure: false,
            summary: true,
            email: '',
            send: false,
            download: false
        },

        /**
         * [onecompleted description]
         * @type {Boolean}
         */
        onecompleted: false,

        /**
         * [twocompleted description]
         * @type {Boolean}
         */
        twocompleted: false,

        /**
         * [threecompleted description]
         * @type {Boolean}
         */
        threecompleted: false,

        /**
         * [bridgecompleted description]
         * @type {Boolean}
         */
        bridgecompleted: false,

        /**
         * [fourcompleted description]
         * @type {Boolean}
         */
        fourcompleted: false,

        /**
         * [fivecompleted description]
         * @type {Boolean}
         */
        fivecompleted: false

    },


});

/**
 * Here we enable the i18n plugin and inject the languages terms from translations.js
 */

//Warn Vue to use VuexI18n plugin with store
Vue.use(vuexI18n.plugin, store);

// Add to the applications all languages defined.
$.each(translations,(code,terms)=>{Vue.i18n.add(code,terms);});

// set the start locale to use
Vue.i18n.set('it');

// set the fallback locale to use
Vue.i18n.fallback('it');

export default store;