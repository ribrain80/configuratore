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
    mutations: mutations,

    actions: {
        /**
         * Init all App Elements from API
         * @param commit
         * @param context
         */
        initApp: function ({ commit },context) {

            let promises = [
                Axios.get( '/split/drawerstypes' ),
                Axios.get( '/split/bridges' ),
                Axios.get( '/split/supports' ),
                Axios.get( '/split/dividers')
            ];

            //Resolve all promises. If any of them fail push into the router '/split/500'
            Promise.all(promises).then(
                ([typesResponse,responseBridges,responseSupports,dividersResponse]) => {
                    commit('setDrawersTypes',typesResponse.data);
                    commit('setBridgesTypes',responseBridges.data);
                    commit('setSupportsTypes',responseSupports.data);
                    commit('setDividerTypes',dividersResponse.data);
                }, //success
                ()=> {
                    console.log("QUA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    context.push({ path: '/split/500' });
                }  //fail
            );
        }
    },
    
    getters: {
        /**
         * Return a subset of the store.state object
         * @method exported
         * @param state
         * @return CallExpression
         */
        exported: function (state) {

            //Subset of the state properties that we need for save a drawer
            //Use a subset reduce the bandwidth usage
            let needed_props = ['drawerId' ,'pdf', 'dimensions', 'language', 'drawertype',
                'bridge_orientation', 'bridge_supportID', 'bridge_ID',
                'bridge_supports_selected', 'bridges_selected', 'dividers_selected' ];

            //return am object with a subset of the state object properties using the pick function from lodash libray
            return _.pick(state,needed_props);

        },

        actual_lineabox_shoulder_height_LOW: function (state) {
            return state.dimensions.actual_lineabox_shoulder_height_LOW;
        }
    },

    state: {

        /**
         * Types of drawers
         */
        drawerTypes:[],

        /**
         * Bridge types
         */
        bridgeTypes:[],

        /**
         * Bridge support types
         */
        supportTypes:[],

        /**
         * Divider types
         */
        dividerTypes:[],

        /**
         * Application language
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

            /**
             * [actual_lineabox_shoulder_height description]
             * @type {Number}
             */
            actual_lineabox_shoulder_height_LOW: 45.4,

            /**
             * [actual_lineabox_shoulder_height_MID description]
             * @type {Number}
             */
            actual_lineabox_shoulder_height_MID: 72,

            /**
             * [actual_lineabox_shoulder_height_HIGH description]
             * @type {Number}
             */
            actual_lineabox_shoulder_height_HIGH: 148,
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