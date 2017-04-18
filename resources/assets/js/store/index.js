// # Import needed packages
import Vue          from 'vue'
import Vuex         from 'vuex'
import vuexI18n     from 'vuex-i18n'
import mutations    from './mutations'
import getters      from './getters'
import translations from './translations'

// # Ie11 polyfill workarounds
require('es6-promise').polyfill();

// # Use Vuex
Vue.use( Vuex );

/**
 * Vuex store holds application state
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

    /**
     * Store actions
     * @type {Object}
     */
    actions: {

        /**
         * Init all App Elements from API
         * @param commit
         * @param context
         */
        initApp: function ( { commit }, context ) {

            // # Let Pace track loading
            Pace.track( function () {
                
                let promises = [
                    Axios.get( '/split/drawerstypes' ),
                    Axios.get( '/split/bridges' ),
                    Axios.get( '/split/supports' ),
                    Axios.get( '/split/dividers'),
                    Axios.get( '/split/edgestextures')
                ];

                // # Resolve all promises. If any of them fail push into the router '/split/500'
                // # Actually loads alla resources needed in the application bootstrap phase
                Promise.all( promises ).then(

                    ( [ responseTypes, responseBridges, responseSupports, responseDividers, responseTextures ] ) => {

                        // # Success
                        commit( 'setDrawersTypes', responseTypes.data );
                        commit( 'setBridgesTypes', responseBridges.data );
                        commit( 'setSupportsTypes',responseSupports.data );
                        commit( 'setDividerTypes', responseDividers.data );
                        commit( 'setTextureTypes', responseTextures.data );
                    },
                    () => { 
                        // # Fail
                        context.push( { path: '/split/500' } );
                    }  
                );
            });
        }
    },
    
    /**
     * Store getters
     * @type {Object}
     */
    getters: getters,

    /**
     * Actual state ( app data )
     * @type {Object}
     */
    state: {

        /**
         * Current workin' object in step4
         * @type {Object}
         */
        objectWorkingOn: {

            type: false,
            id: false,
            obj: {}
        },

        /**
         * Canvas onload flag
         * @type {Boolean}
         */
        canvasReady: false,

        /**
         * Camvas svg representation
         * @type {String}
         */
        canvasSvg : "",

        /**
         * Current header label
         * @type {String}
         */
        currentComponentHeader: '',

        /**
         * Tipes of textures
         */
        textureTypes:[],

        /**
         * Types of drawers
         * @type {Array}
         */
        drawerTypes:[],

        /**
         * Bridge types
         * @type {Array}
         */
        bridgeTypes:[],

        /**
         * Bridge support types
         * @type {Array}
         */
        supportTypes:[],

        /**
         * Divider types
         * @type {Array}
         */
        dividerTypes: {
            dividersCategories: [],
            dividers: []
        },

        /**
         * Application default language
         * @type: {string}
         */
        language: "it",

        /**
         * Id of the drawer, 0 means is new drawer
         * @type {Number}
         */
        drawerId: 0,

        /**
         * Drawert type, 0 means no choice
         * @type {Number}
         */
        drawertype: 0,

        /**
         * Drawer type category, 0 means no category
         * @type {Number}
         */
        drawer_type_category: 0,

        /**
         * Lineabox family flag
         * @type {Boolean}
         */
        is_lineabox: false,

        /**
         * Step2 Advice acceptance flag
         * @type {Boolean}
         */
        step2_adviceAccepted: false,

        /**
         * Drawer Dimensions
         * @type {Object}
         */
        dimensions: {

            /**
             * Drawer width
             * @type {Number}
             */
            width: 800,

            /**
             * Shoulder height
             * @type {Number}
             */
            shoulder_height: 100,

            /**
             * Drawer length
             * @type {Number}
             */
            length: 600,

            /**
             * Default Drawer width
             * @type {Number}
             */
            default_width: 800,

            /**
             * Default Drawer height
             * @type {Number}
             */
            default_height: 600,

            /**
             * Default Shoulder height
             * @type {Number}
             */
            default_shoulder_height: 100,

            /**
             * Actual width subtracted by the extra supports added for a bridge
             * @type {Number}
             */
            delta_width: 0,

            /**
             * Actual length subtracted by the extra supports added for a bridge
             * @type {Number}
             */
            delta_length: 0,

            /**
             * Actual lineabox MIN shoulder height
             * @type {Number}
             */
            actual_lineabox_shoulder_height_LOW: 45.5,

            /**
             * Actual lineabox MID shoulder height
             * @type {Number}
             */
            actual_lineabox_shoulder_height_MID: 72,

            /**
             * Actual lineabox HIGH shoulder height
             * @type {Number}
             */
            actual_lineabox_shoulder_height_HIGH: 148,
        },

        /**
         * Drawer width must not exceed a value for a H bridge to be chosen
         * @type {Boolean}
         */
        is_suitable_width_4hbridge: true,

        /**
         * Shoulder height must exceed a minimum value to allow for a bridge to be placed
         * @type {Boolean}
         */
        is_suitable_height_4bridge: true,

        /**
         * Bridge Orientation: H or V
         * Orientation is a common data for all the bridge placed, no bridge overlapping allowed
         * @type {String}
         */
        bridge_orientation: "",

        /**
         * Drawer has bridge flag
         * @type {Boolean}
         */
        has_bridge: false,

        /**
         * Bridge Support unique support ID
         * @type {Number}
         */
        bridge_supportID: 0,

        /**
         * Orientation of the bridgeSupport
         */
        bridge_support_orientation: false,

        /**
         * Bridge unique support ID
         * @type {Number}
         */
        bridge_ID: 0,

        /**
         * Bridge supports selected list
         * @type {Array}
         */
        bridge_supports_selected: [],

        /**
         * Bridge selected list
         * @type {Array}
         */
        bridges_selected: [],

        /**
         * Dividers selected list
         * @type {Array}
         */
        dividers_selected:[],

        /**
         * Drawer Borders
         * @type {Object}
         */
        borders: {
            top: "",
            left: "",
            bottom: "",
            right: "",
        },

        /**
         * Drawer border top data
         * @type {Object}
         */
        drawer_border_top: { hex: '', selected: false },

        /**
         * Drawer border left data
         * @type {Object}
         */
        drawer_border_left: { hex: '', selected: false },

        /**
         * Drawer border right data
         * @type {Object}
         */
        drawer_border_right: { hex: '', selected: false },

        /**
         * Drawer border bottom data
         * @type {Object}
         */
        drawer_border_bottom: { hex: '', selected: false },

        /**
         * ratio computed for drawer representation in step4
         * @type {Number}
         */
        step4_2D_ratio: 1,

        /**
         * [pdf description]
         * @type {Object}
         */
        pdf: {

            /**
             * Brochure download flag
             * @type {Boolean}
             */
            brochure: false,

            /**
             * Summary download flag ( should not change )
             * @type {Boolean}
             */
            summary: true,

            /**
             * User email for summary/brochure mail send
             * @type {String}
             */
            email: "",

            /**
             * Send flag = !download flag
             * @type {Boolean}
             */
            send: false,

            /**
             * Download flag
             * @type {Boolean}
             */
            download: false
        },

        /**
         * Step1 completion flag
         * @type {Boolean}
         */
        onecompleted: false,

        /**
         * Step2 completion flag
         * @type {Boolean}
         */
        twocompleted: false,

        /**
         * Step3 completion flag
         * @type {Boolean}
         */
        threecompleted: false,

        /**
         * Step ponte completion flag
         * @type {Boolean}
         */
        bridgecompleted: false,

        /**
         * Step4 completion flag
         * @type {Boolean}
         */
        fourcompleted: false,

        /**
         * Step5 completion flag
         * @type {Boolean}
         */
        fivecompleted: false

    },

});

/**
 * Here we enable the i18n plugin and inject the languages terms from translations.js
 */

// # Tell Vue to use VuexI18n plugin with store
Vue.use( vuexI18n.plugin, store );

// # Add to the applications all languages defined.
$.each( translations,( code, terms ) => { Vue.i18n.add( code,terms ); } );

// # Set the default locale
Vue.i18n.set( "it" );

// # Set the fallback locale
Vue.i18n.fallback( "it" );

// # Export store "component"
export default store;