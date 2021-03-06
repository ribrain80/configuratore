// # Import needed packages
import Vue          from 'vue'
import Vuex         from 'vuex'
import vuexI18n     from 'vuex-i18n'
import mutations    from './mutations'
import getters      from './getters'
import translations from './translations'
import fakeScene    from '../3d/dummy/dummyScene'

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
            
            Pace.track( function() {
                
                $( "#cover" ).show();

                // # Retrieve resources from the server
                let promises = [

                    Axios.get( '/split/drawerstypes' ),
                    Axios.get( '/split/bridges' ),
                    Axios.get( '/split/supports' ),
                    Axios.get( '/split/dividers'),
                    Axios.get( '/split/edgestextures'),
                    Axios.get( '/split/dividersplain'),
                    Axios.get( '/split/gallery-images' ),
                    Axios.get( '/split/carousel-images' ),
                ];

                // # Resolve all promises. If any of them fail push into the router '/split/500'
                // # Actually loads alla resources needed in the application bootstrap phase
                Promise.all( promises ).then(

                    ( [ responseTypes, responseBridges, responseSupports, responseDividers, 
                        responseTextures, responseDividersPlain, responseGalleryImages, responseCarouselImages ] ) => {

                        // # Success
                        commit( 'setDrawersTypes', responseTypes.data );
                        commit( 'setBridgesTypes', responseBridges.data );
                        commit( 'setSupportsTypes',responseSupports.data );
                        commit( 'setDividerTypes', responseDividers.data );
                        commit( 'setTextureTypes', responseTextures.data );
                        commit( 'setDividerTypesPlain', responseDividersPlain.data );
                        commit( 'setGalleryImages', responseGalleryImages.data );
                        commit( 'setCarouselImages', responseCarouselImages.data );

                    },
                    () => { 
                        
                        // # Fail
                        Pace.stop();
                        context.push( { path: '/split/500' } );
                    }  
                );

                return Promise.resolve();

            });

            
        },

        /**
         * Clean up all step4 related elements
         * @param  {[type]} options.commit [description]
         * @param  {[type]} options.state  [description]
         * @param  {[type]} context        [description]
         * @return {[type]}                [description]
         */
        clearStep4Reached: function( { commit, state }, context ) {

            commit( "clearAllBridgeData" );

            _.forEach( state.dividers_selected, ( cur ) => {
                state.dividerHelper.removeDivider( cur.id );
                commit( "clearDividers" );
            });         

            commit( "clearDrawerBorders" );

            commit( "setFourcompleted", false );
            commit( "setFivecompleted", false );
            commit( "setFourreached", false );
            
        },

        /**
         * Add a divider to the 3d scene
         * TODO Usa le Promise https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions
         * TODO nel chiamante prendi il valore di ritorno della promise e fai qualcosa
         *
         * params structure:
         * params.id : Divider id
         * params.model: Divider 3d model
         * params.texture: Divider texture
         * params.coords: an obj like this: {x: ... , z: ... } we dont need the y coord
         * params.rotate: a boolean flag to know if rotate the model before add
         *
         * @param state
         * @param commit
         * @param params
         */
        add3dDivider: function ( { commit, state }, divider ) {
            
            //Check if action is allowed !!
            if (state.dividerHelper) {
                console.log("DIVIDER OBJ ADDED ON 3D:", divider);
                let _model = state.dividerTypesPlain[divider.sku];
                let ratio = state.step4_2D_ratio;

                let realW = divider.realWidth ;
                let realH = divider.realHeight ;

                let x = 0;
                let y = 0;

                if (divider.orientation=="H") {
                    console.log("QUI!!!!!!!!!!!!!!!!!!!!!!!!");
                    x = (divider.x / ratio) + (realW/2);
                    y = (divider.y / ratio) - (realH/2);
                } else {
                  /*  x = (divider.x / ratio) + (realH/2);
                    y = (divider.y / ratio) - (realW/2);*/

                  y = (divider.y/ratio) - (divider.realHeight/2);
                  x = (divider.x/ratio) + (divider.realWidth/2);
                }



                let coords = {
                    x: x,
                    z: y,
                    y:0
                };

                state.dividerHelper.addDivider(
                    divider.id,
                    _model.model3d,
                    _model.baseTexture,
                    coords,
                    divider.orientation=="H"
                );
            }
        },

        /**
         * Remove a divider from the 3d scene
         * @param commit
         * @param state
         * @param dividerId
         */
        remove3dDivider: function ({ commit,state }, dividerId) {
            state.dividerHelper.removeDivider(dividerId);
            commit( "removeDivider", dividerId );
        },

        /**
         * Remove all divider from 3d scene
         * @param commit
         * @param state
         */
        remove3dAllDividers: function ( {commit,state} ) {
            _.forEach(state.dividers_selected, (cur)=>{
                state.dividerHelper.removeDivider(cur.id);
                commit('clearDividers');
            });

        },

        /**
         * Change a divider position
         * params structure:
         * params.id: divider id
         * params.coords: an obj like this: {x: ... , y: ... } we dont need the z coord
         */
        update3dDividerPos: function ({ commit,state }, params) {
            let ratio = state.step4_2D_ratio;

            let x = (params.x / ratio) ;
            let y = (params.y / ratio) ;

            // # Calc correction if supports are present
            // # Check if there are supports
            if ( state.bridge_supportID ) {
                let ns = state.bridge_supports_selected.length;
                let xCorrection = 0;
                let yCorrection = 0;
                let supportWidth = 6;
                if (state.bridge_orientation=="V") {
                    // Handle vertical bridge supports
                    yCorrection = supportWidth/2;
                } else {
                    // Handle horizzontal bridge supports
                    xCorrection = supportWidth;
                }
                x += xCorrection;
                y += yCorrection;

            }


            state.dividerHelper.updateDividerPosition(params.id,x, y);
        },

        /**
         * Change a divider texture
         * params structure
         * params.id: divider id
         * params.texture: Divider texture
         * @param commit
         * @param params
         */
        update3dDividerTexture: function ( { commit,state }, params ) {
            let _model = state.dividerTypesPlain[params.sku];
            state.dividerHelper.updateDividerTexture(
                params.id,
                _model.baseTexture
            );
        },


        update3dDrawerPartTexture: function ({ commit,state }, params) {
            console.log("update3dDrawerPartTexture",params);
            state.dividerHelper.updateDividerTexture(
                params.id,
                params.image
            );
        },


        update3dSupportTexture: function ({ commit,state }, sku) {
            let supportsByCategory = (state.bridge_supportID==1)?state.supportTypes[455]:state.supportTypes[900];
            let supportsByCategoryItems = supportsByCategory['items'];
            let itemToPutIn = supportsByCategoryItems.filter((item)=> {
                return (item.sku==sku);
            });
            let newObj = itemToPutIn[0];

            state.dividerHelper.updateSupportsTexture(newObj.texture);

            // # Change into the store
            commit('changeSupportSku',newObj);

        },

        changeBridgeSku: function ({ commit,state },payload) {
            state.dividerHelper.updateBridgesTexture(payload.img);
            commit('changeBridgeSku',payload.sku);

        },

        add3DBridge: function ({ commit,state }) {
            if (state.bridge_orientation=="V") {
                state.dividerHelper.addBridgeV(state.dimensions.length,state.bridge_ID,state.bridge_supportID,state.bridges_selected.length-1);
            } else {
                state.dividerHelper.addBridgeH(state.dimensions.width,state.bridge_ID,state.bridge_supportID,state.bridges_selected.length-1);
            }
        },

        remove3DBridge: function ({ commit,state }) {
            state.dividerHelper.removeBridge();
        },


        genDrawer: function ({ commit,state }, type) {

            state.dividerHelper.genDrawer(type,state.dimensions.width,state.dimensions.length,state.dimensions.shoulder_height);
            state.camera.chanegPosition(type,-state.dimensions.width/2,0,-state.dimensions.length/2);

            //Gestione iniziale ponte !!!
            if (state.has_bridge) {
                if (state.bridge_orientation=="V") {
                    state.dividerHelper.addBridgeV(state.dimensions.length,state.bridge_ID,state.bridge_supportID,0);
                } else {
                    state.dividerHelper.addBridgeH(state.dimensions.width,state.bridge_ID,state.bridge_supportID,0);
                }
            }



            //type = -10;
            if (!state.bridge_supportID) {
                return;
            }


            let h = (state.bridge_supportID==1)?45.5:90;
            let supportTexture = false;
            if (state.bridge_supports_selected[0]) {
                let tmp=state.bridge_supports_selected[0];
                supportTexture = tmp.texture;
            }
            // # Handling supports
            switch (type) {
                case 1:
                case 2:
                    // # Lineabox 3/4 lati
                    // # Only if bridge is vertical
                    if (state.bridge_orientation=="V") {
                        state.dividerHelper.addSupport("front", state.dimensions.width, state.dimensions.length, h, supportTexture);
                    }
                    break;
                case 3:
                    //lineabox 2 lati
                    // solo se ponte verticale
                   if (state.bridge_orientation=="V") {
                        state.dividerHelper.addSupport("front",state.dimensions.width, state.dimensions.length, h, supportTexture);
                        state.dividerHelper.addSupport("back",state.dimensions.width, state.dimensions.length, h, supportTexture);
                    }
                    break;
                case 4:

                    // Cassetto generico
                    if (state.bridge_orientation=="V") {
                        state.dividerHelper.addSupport("front",state.dimensions.width, state.dimensions.length, h, supportTexture);
                        state.dividerHelper.addSupport("back",state.dimensions.width, state.dimensions.length, h, supportTexture);
                    } else {
                        state.dividerHelper.addSupport("left",state.dimensions.length, state.dimensions.width, h, supportTexture);
                        state.dividerHelper.addSupport("right",state.dimensions.length, state.dimensions.width, h, supportTexture);
                    }
                    break;
            }

        },



        /**
         * Change all 3d divider texture
         * @param commit
         * @param texture texture to apply
         */
        updateAllDividerTexture: function ( { commit,state }, sku ) {
            let _model = state.dividerTypesPlain[sku];
            let texture = _model.baseTexture;
            _.forEach(state.dividers_selected, (cur)=>{
                // # Recupero lo sku da mettere
                let divsByCat = state.dividerTypes.dividers[cur.category];
                let divsBySubCat = divsByCat[cur.subCategory];
                let _items = divsBySubCat['items'];

                let _obj = _items.filter((cur)=>{
                    return cur.baseTexture==texture;
                })[0];
                let payload = {
                    id: cur.id,
                    sku: _obj.sku
                };
                commit( "updateDividerSku", payload );

                state.dividerHelper.updateDividerTexture(
                    cur.id,
                    texture
                );


               /* state.dividerHelper.removeDivider(cur.id);
                commit('clearDividers');*/
            });
        },


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
         * Threejs Scene or DummyScene
         * First init as Dummy
         * @type {Object}
         */
        scene: new fakeScene(),

        /**
         * [renderer description]
         * @type {Boolean}
         */
        renderer : false,

        /**
         * [camera description]
         * @type {Boolean}
         */
        camera : false,

        /**
         * [dividerHelper description]
         * @type {Boolean}
         */
        dividerHelper : false,

        /**
         * Current workin' object in step4
         * @type {Object}
         */
        objectWorkingOn: {

            /**
             * [type description]
             * @type {Boolean}
             */
            type: false,

            /**
             * [id description]
             * @type {Boolean}
             */
            id: false,

            /**
             * [obj description]
             * @type {Object}
             */
            obj: {}
        },

        /**
         * Canvas svg representation
         * @type {String}
         */
        canvasSvg : "",

        /**
         *
         */
        drawer3dImage: "",

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

            /**
             * [dividersCategories description]
             * @type {Array}
             */
            dividersCategories: [],

            /**
             * [dividers description]
             * @type {Array}
             */
            dividers: []
        },

        /**
         * [dividerTypesPlain description]
         * @type {Object}
         */
        dividerTypesPlain: {},

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
            shoulder_height: 72,

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
            default_shoulder_height: 72,

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
         * Drawer Borders
         * @type {Object}
         */
        borders: {

            /**
             * [top description]
             * @type {String}
             */
            top: "",

            /**
             * [left description]
             * @type {String}
             */
            left: "",

            /**
             * [bottom description]
             * @type {String}
             */
            bottom: "",

            /**
             * [right description]
             * @type {String}
             */
            right: "",
        },

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
        fivecompleted: false,

        /**
         * fourreached flag
         * @type {Boolean}
         */
        fourreached: false,

        /**
         * [currentStep description]
         * @type {Number}
         */
        currentStep: 1,

        /**
         * [gallery_images description]
         * @type {Array}
         */
        gallery_images: [],

        /**
         * [carousel_images description]
         * @type {Array}
         */
        carousel_images: []

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
