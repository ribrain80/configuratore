// # Import needed packages
import Vue          from 'vue'
import Vuex         from 'vuex'
import vuexI18n     from 'vuex-i18n'
import mutations    from './mutations'
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
        initApp: function ( { commit },context) {

            // # Let Pace track loading
            Pace.track( function() {
                
                let promises = [
                    Axios.get( '/split/drawerstypes' ),
                    Axios.get( '/split/bridges' ),
                    Axios.get( '/split/supports' ),
                    Axios.get( '/split/dividers')
                ];

                // # Resolve all promises. If any of them fail push into the router '/split/500'
                // # Actually loads alla resources needed in the application bootstrap phase
                Promise.all( promises ).then(

                    ( [ typesResponse, responseBridges, responseSupports, dividersResponse ] ) => {

                        // # Success
                        commit( 'setDrawersTypes', typesResponse.data );
                        commit( 'setBridgesTypes', responseBridges.data );
                        commit( 'setSupportsTypes',responseSupports.data );
                        commit( 'setDividerTypes', dividersResponse.data );
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
    getters: {

        /**
         * Return all dividers variations depending on the selected item
         * @todo: trivial implementation -- just work but i can do it much better
         * @param state
         * @returns {Array}
         */
        getDividerVariants: function (state) {

            // Execute only if type is set
            if (state.objectWorkingOn.type) {

                //1) recupero l'oggetto divider da state.dividers_selected
                let _tmp = state.dividers_selected.filter(cur => {
                    return cur.id==state.objectWorkingOn.id;
                });

                //2) If there is an object with id equals to state.objectWorkingOn.id extract the related items variants
                if (_tmp.length) {
                    // #todo: find a better way to navigate into the object
                    let curDivider = _tmp[0];
                    let itemxcategory = state.dividerTypes.dividers[curDivider.category];
                    let itemxcategoryxsubcategory = itemxcategory[curDivider.subCategory];
                    return itemxcategoryxsubcategory.items;
                }
            }

            // Default return empty array
            return [];
        },

        /**
         * Return the sum of the areas of the selected dividers
         * @param state
         * @returns {*}
         */
        busyArea: function (state) {
           return state.dividers_selected.reduce((accumulatore,cur) => {return accumulatore+=cur.area;},0);
        },


        /**
         * Return how much space is still availabe on the drawer
         * @todo: Work with real area (delta)
         * @param state
         * @returns {*}
         */
        freeArea: function (state) {

            //Calc Internal Area 
            let rw = +state.dimensions.width;
            let rh = +state.dimensions.length;
            let internalArea = rw * rh;

            //#Iterate over dividers_selected and subtract divider area to internalArea
            return state.dividers_selected.reduce((accumulatore,cur) => {return accumulatore-=cur.area;},internalArea);
        },

        /**
         * Returns a subset of the store.state object
         * the subset consists in the data needed by the server 
         * 
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

    },

    /**
     * Actual state ( app data )
     * @type {Object}
     */
    state: {

        objectWorkingOn: {
            type:false,
            id:false,
        },

        /**
         * Current header label
         * @type {String}
         */
        currentComponentHeader: 'Info',

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
        language:'it',

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
            email: '',

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
$.each( translations,( code, terms ) => { Vue.i18n.add( code,terms ); });

// # Set the default locale
Vue.i18n.set( 'it' );

// # Set the fallback locale
Vue.i18n.fallback( 'it' );

// # Export store "component"
export default store;
