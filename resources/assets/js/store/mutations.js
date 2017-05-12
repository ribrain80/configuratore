/**
 * Vuex store mutations ( functions that change store state )
 * @type {Object}
 */
const  mutations = {

    /**
     * Sets application language ( state and plugin )
     * 
     * @method setLanguage
     * @param {Object} state
     * @param {string} locale
     * @return 
     */
    setLanguage: function ( state, locale ) {
        console.log( "Setting language:" + locale );
        state.language = locale;
        Vue.i18n.set(locale);
    },

    /**
     * drawertype setter
     * 
     * @method setDrawerType
     * @param {Object} state
     * @param {Integer} typeID
     * @return 
     */
    setDrawerType: function ( state, typeID ) {
        console.log( "Drawer type changed to: " + typeID );
        state.drawertype = typeID;
    },

    /**
     * drawer_type_category setter
     * 
     * @method setDrawerTypeCategory
     * @param {Object} state
     * @param {Integer} val
     * @return 
     */
    setDrawerTypeCategory: function ( state, val ) {
        console.log( "Type category set to: " + val );
        state.drawer_type_category = val;
    },

    /**
     * is_lineabox setter
     * 
     * @method isLineaBox
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    isLineaBox: function ( state, val ) {
        console.log( "is_lineabox flag changed to: " + val );
        state.is_lineabox = val;
    },

    /**
     * step2_adviceAccepted setter
     * 
     * @param {Object} state
     * @param {Boolean} val
     */
    setStep2AdviceAccepted: function( state, val ) {
        console.log( "step2_adviceAccepted changed to: " + val );
        state.step2_adviceAccepted = val;
    },

    /**
     * width setter
     * 
     * @method setWidth
     * @param {Object} state
     * @param {Float} val
     * @return 
     */
    setWidth: function ( state, val ) {

        // # NaN Check
        if ( isNaN( val ) ) {
            
            // # Set to a default
            state.dimensions.width = state.dimensions.default_width;
            console.log( "width dimension ( NaN ) changed to: " + state.dimensions.default_width );
            return;
        }

        // # Set
        state.dimensions.width = val;
        console.log( "width dimension changed to: " + val );
    },

    /**
     * lenght setter
     * 
     * @method setLength
     * @param {Object} state
     * @param {Float} val
     * @return 
     */
    setLength: function ( state, val ) {

        // # NaN Check
        if ( isNaN( val ) ) {

            // # Set to a default
            state.dimensions.length = state.dimensions.default_height;
            console.log( "length dimension NaN changed to: " + state.dimensions.default_height );
            return;
        }

        // # Set
        state.dimensions.length = parseFloat(val).toFixed( 1 );
        console.log( "length dimension changed to: " + val );
    },

    /**
     * Description
     * @method setShoulderHeight
     * @param {Object} state
     * @param {Float} val
     * @return 
     */
    setShoulderHeight: function (state, val) {

        // # NaN Check
        if ( isNaN( val ) ) {
            
            // # Set to a default
            state.dimensions.shoulder_height = state.dimensions.default_shoulder_height;
            console.log( "shoulder_height dimension NaN changed to: " + state.dimensions.default_shoulder_height );
            return;
        }

        // # Set
        state.dimensions.shoulder_height = parseFloat( val ).toFixed( 1 );
        console.log( "shoulder height dimension changed to: " + val );
    },

    /**
     * Reset dimsnsion to default
     * @param {Object} state
     * @param {Float} val
     */
    setDefaultDimensions: function( state, val ) {

        // # Set Width
        state.dimensions.width = parseFloat( state.dimensions.default_width );

        // # Set Length
        state.dimensions.length = parseFloat( state.dimensions.default_height );

        // # Set Shoulder height
        state.dimensions.shoulder_height = parseFloat( state.dimensions.default_shoulder_height );

        console.log( "All dimensions has been reset" );
    },

    /**
     * bridge_orientation setter
     * s
     * @method setBridgeOrientation
     * @param {Object} state
     * @param {string} val
     * @return 
     */
    setBridgeOrientation: function ( state, val ) {
        state.bridge_orientation = val;
        console.log( "bridge orientation changed to: " + val );
    },

    /**
     * is_suitable_width_4hbridge setter
     * 
     * @method isSuitableForHBridge
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    isSuitableForHBridge: function (state, val) {
        state.is_suitable_width_4hbridge = val;
        console.log( "is_suitable_width_4hbridge changed to: " + val );
    },

    /**
     * is_suitable_height_4bridge setter
     * 
     * @method isSuitableHeightForBridge
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    isSuitableHeightForBridge: function ( state, val ) {
        state.is_suitable_height_4bridge = val;
        console.log( "is_suitable_height_4bridge changed to: " + val );
    },

    /**
     * has_bridge setter
     * 
     * @method hasBridge
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    hasBridge: function ( state, val ) {
        state.has_bridge = val;
        console.log( "has_bridge changed to: " + val );
    },

    /**
     * bridge_supportID setter
     * 
     * @method setBridgeSupportID
     * @param {Object} state
     * @param {Integer} val
     * @return 
     */
    setBridgeSupportID: function ( state, val ) {
        state.bridge_supportID = val;
        console.log( "bridge_supportID changed to: " + val );
    },

    /**
     * Description
     * @method setBridgeID
     * @param {Object} state
     * @param {Integer} val
     * @return 
     */
    setBridgeID: function ( state, val ) {
        state.bridge_ID = val;
        console.log( "bridge_ID changed to: " + val );
    },

    /**
     * Commputes dimensions on bridge places ( supports added )
     * 
     * @method computeDimensionsOnSupportsChanges
     * @param {Object} state
     * @param {Object} obj
     * @return 
     */
    computeDimensionsOnSupportsChanges: function ( state, obj ) {

        // # Computation is based on bridge orientattion selected
        switch ( state.bridge_orientation ) {

            case 'H': // # Horizontal

                // # Depends on drawer type selected also
                switch ( state.drawertype ) {

                    case 4:// # Custom drawer

                        if ( obj.op == "clear" ) {

                            var supports_in = state.bridge_supports_selected.length;

                            if ( 0 == supports_in ) {
                                console.log( "no changes applied to available width" );
                                return;
                            }

                            state.dimensions.delta_width += supports_in * 6;
                            console.log( "available width enlarged by: " + supports_in * 6 );
                            return;
                        }
                        
                        // # Else 
                        state.dimensions.delta_width -= 12;
                        console.log( "available width reduced by: " + 12 );
                        
                        break;

                    case 3:
                    case 2:
                    case 1:
                        // do nothing
                        break;
                }

                break;

            case 'V': // # Vertical

                switch ( state.drawertype ) {

                    case 4: // custom
                    case 3: // lineabox 2 sides

                        if ( obj.op == "clear" ) {

                            var supports_in = state.bridge_supports_selected.length;

                            if ( 0 == supports_in ) {
                                console.log( "no changes applied to available length" );
                                return;
                            }

                            state.dimensions.delta_length += supports_in * 6;
                            console.log( "available length enlarged by: " + supports_in * 6 );
                            return;
                        }
                        
                        // # Else 
                        state.dimensions.delta_length -= 12;
                        console.log( "available length reduced by: " + 12 );
                        
                        break;

                    case 2:// lineabox 3 sides
                    case 1:// lineabox 4 sides

                        if ( obj.op == "clear" ) {

                            var supports_in = state.bridge_supports_selected.length;

                            if ( 0 == supports_in ) {
                                console.log( "no changes to available length" );
                                return;
                            }

                            state.dimensions.delta_length += supports_in * 6;
                            console.log( "available length enlarged by: " + 6 );
                            return;
                        }
                        
                        // # Else 
                        state.dimensions.delta_length -= 6;
                        console.log( "available length reduced by: " + 6 );
                        
                        break;
                }

                break;
        }
    },

    /**
     * bridge_supports_selected push management
     * 
     * @method manageBridgeSupport
     * @param {Object} state
     * @param {Object} payload
     * @return 
     */
    manageBridgeSupport: function ( state, payload ) {
        state.bridge_supports_selected.push( payload.items[ 0 ] );
        console.log( "pushing in support" );
    },

    /**
     * bridge_supports_selected clear management
     * 
     * @method clearBridgeSupports
     * @param {Object} state
     * @return 
     */
    clearBridgeSupports: function ( state ) {
        state.bridge_supports_selected = [];
        console.log( "Bridge supports cleared" );
    },

    /**
     * Description
     * @method clearBridgeData
     * @param {Object} state
     * @return 
     */
    clearBridgeData: function (state) {

        // # Clear supports
        state.bridge_supports_selected = [];

        // # Clear bridges
        state.bridges_selected = [];

        // # Clear bridge ID
        state.bridge_ID = 0;

        // # Clear bridge support ID
        state.bridge_supportID = 0;

        // # No bridge selected
        state.has_bridge = false;

        console.log( "clearing bridge data" );
    },

    /**
     * step4_2D_ratio setter
     * 
     * @param {Object} state
     * @param {Number} val
     */
    setStep42DRatio: function ( state, val ) {
        state.step4_2D_ratio = val;
        console.log( "step4_2D_ratio changed to: " + val );
    },

    /**
     * TODO
     * @param  {[type]} state [description]
     * @return {[type]}       [description]
     */
    clearDrawerBorders: function( state ) {

        state.borders = {
            top: "",
            left: "",
            bottom: "",
            right: "",
            background: ""
        }
    },

    /**
     * onecompleted setter
     * 
     * @method setOnecompleted
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    setOnecompleted: function ( state, val ) {
        state.onecompleted = val;
        console.log( "onecompleted changed to: " + val );
    },

    /**
     * twocompleted setter
     * 
     * @method setTwocompleted
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    setTwocompleted: function ( state, val ) {
        state.twocompleted = val;
        console.log( "twocompleted changed to: " + val );
    },

    /**
     * threecompleted setter
     * 
     * @method setThreecompleted
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    setThreecompleted: function ( state, val ) {
        state.threecompleted = val;
        console.log( "threecompleted changed to: " + val );
    },

    /**
     * bridgecompleted setter
     * 
     * @method setBridgecompleted
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    setBridgecompleted: function ( state, val ) {
        state.bridgecompleted = val;
        console.log( "bridgecompleted changed to: " + val );
    },

    /**
     * fourcompleted setter
     * 
     * @method setFourcompleted
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    setFourcompleted: function ( state, val ) {
        state.fourcompleted = val;
        console.log( "fourcompleted changed to: " + val );
    },

    /**
     * fivecompleted setter
     * 
     * @method setFivecompleted
     * @param {Object} state
     * @param {Boolean} val
     * @return 
     */
    setFivecompleted: function ( state, val ) {
        state.fivecompleted = val;
        console.log( "fivecompleted changed to: " + val );
    },

    /**
     * drawerTypes setter
     * 
     * @param {Object} state
     * @param {Object} val
     */
    setDrawersTypes: function ( state, val ) {
        state.drawerTypes = val;
        console.log( "drawer types downloaded" );
    },

    /**
     * bridgeTypes setter
     * 
     * @param {Object} state
     * @param {Object} val
     */
    setBridgesTypes: function ( state, val ) {
        state.bridgeTypes = val;
        console.log( "bridge types downloaded" );
    },

    /**
     * supportTypes setter
     * 
     * @param {Object} state
     * @param {Object} val
     */
    setSupportsTypes: function ( state, val ) {
        state.supportTypes = val;
        console.log( "support Types downloaded" );
    },

    /**
     * [setDividerTypes description]
     * @param {Object} state
     * @param {Object} val
     */
    setDividerTypes: function ( state, val ) {
        state.dividerTypes = val;
        console.log( "divider Types downloaded" );
    },

    setDividerTypesPlain: function ( state, val ) {
        state.dividerTypesPlain = val;
    },

    /**
     * [setTextureTypes description]
     * @param {Object} state
     * @param {Object} val
     */
    setTextureTypes ( state, val ) {
        state.textureTypes = val;
        console.log( "texture Types downloaded" );
    },

    /**
     * currentComponentHeader setter
     * 
     * @param {Object} state
     * @param {string} val
     */
    setComponentHeader : function ( state, val )  {
        state.currentComponentHeader = val;
    },

    /**
     * objectWorkingOn setter
     * 
     * @param {Object} state
     * @param {Object} val
     * @return
     */
    setobjectWorkingOn: function ( state, val ) {
        state.objectWorkingOn = val;
    },

    /**
     * Update the position of a divider
     * @param state
     * @param payload
     */
    updateDividerPosition: function (state,payload) {

        //Change the state.dividers_selected with a new one with the selected divider having coords changed
        state.dividers_selected = state.dividers_selected.map((cur) => {
            //Modify only if id are the same
            if (cur.id==payload.id) {
                cur.x=payload.x;
                cur.y=payload.y;
            }
            return cur;
        });
    },

    /**
     * [updateDividerSku description]
     * @param  {[type]} state   [description]
     * @param  {[type]} payload [description]
     * @return {[type]}         [description]
     */
    updateDividerSku: function (state,payload) {

        //Change the state.dividers_selected with a new one with the selected divider having sku changed
        state.dividers_selected = state.dividers_selected.map( ( cur ) => {
            //Modify only if id are the same
            if (cur.id==payload.id) {
                cur.sku=payload.sku;
            }
            return cur;
        });
    },


    updateAllDividerSku: function (state,payload) {
        state.dividers_selected = state.dividers_selected.map( ( cur ) => {
            //Modify only if id are the same
            if (cur.id==payload.id) {
                cur.sku=payload.sku;
            }
            return cur;
        });
    },


    /**
     * Remove a divider depending on the dividerId
     * @param state
     * @param dividerId
     */
    removeDivider: function( state, dividerId ) {

        console.log( " removing divider id: ", dividerId );

        state.dividers_selected = state.dividers_selected.filter( ( cur ) => {
            return cur.id != dividerId;
        });

        console.log( state.dividers_selected );
    },

    /**
     * Add a divider to state.dividers_selected
     * Push the first sku in the items list
     * @method pushDivider
     * @param {} state
     * @param {} obj
     * @return
     */
    pushDivider: function (state, obj) {
        console.log("pushing in divider");
        let _category = obj.category;
        let _dividerCategoryObj = state.dividerTypes.dividers[_category];
        let _dimension = obj.subCategory;
        let _dividerDimension = _dividerCategoryObj[_dimension];
        let _objProt = _dividerDimension.items[0];
        obj.sku = _objProt.sku;
        state.dividers_selected.push( obj );
    },


    /**
     * Remove all dividers
     * @param state
     */
    clearDividers: function( state ) {
        state.dividers_selected = [];
    },


    setDrawerBorder(state,payload) {
        state.borders[payload.id]=payload.dbId;
    },


    changeBridgeSku(state,payload) {
        let _tmp = state.bridgeTypes[state.bridge_ID];
        let _tmp1 = _tmp['items'];
        let itemToPutIn = _tmp1.filter((item)=> {
            return (item.sku==payload);
        });
        state.bridges_selected = state.bridges_selected.map((item) => {
            return itemToPutIn[0];
        });
    },

    addBridge(state) {
        // # get the first item
        let bridgeExample = state.bridges_selected[0];
        state.bridges_selected.push(bridgeExample);
    },

    removeBridge(state) {
        state.bridges_selected.pop();
    },

    /**
     * Description
     * @method manageBridge
     * @param {} state
     * @param {} obj
     * @return
     */
    manageBridge: function (state, obj) {

        state.bridges_selected.push(obj);
    },


    /**
     * Description
     * @method clearBridges
     * @param {} state
     * @return
     */
    clearBridges: function (state) {
        state.bridges_selected = [];
    },

    /**
     * Description
     * @method clearAllBridgeData
     * @param {} state
     * @return
     */
    clearAllBridgeData: function (state) {

        console.log("clearing all bridge data");

        state.bridge_orientation = '';
        state.bridge_supports_selected = [];
        state.bridges_selected = [];
        state.bridge_ID = 0;
        state.bridge_supportID = 0;
        state.has_bridge = 0;
        state.dimensions.delta_width = 0;
        state.dimensions.delta_length = 0;

    },

    changeSupportSku: function (state,payload) {
        state.bridge_supports_selected = state.bridge_supports_selected.map((item) => {
            return payload;
        });
    },

    setCanvasReady: function (state) {
        console.log("SETTING CANVAS READY");
        state.canvasReady=true;
    },

    setCanvasSvg: function(state,svg) {
        state.canvasSvg=svg;
    },

    setDrawer3dImage: function(state,img) {
        state.drawer3dImage=img;
    },

    setScene: function (state,scene) {
        //Setting 3D scene
        state.scene=scene;
    },

    setRenderer: function (state,renderer) {
        //Setting 3D renderer
        state.renderer=renderer;
    },

    setCamera: function (state,camera) {
        //Setting 3D renderer
        state.camera=camera;
    },

    setDividerHelper: function (state,helper) {
        state.dividerHelper = helper;
    },

    setGalleryImages: function( state, val ) {
        state.gallery_images = val;
    },

    setCurrentStep: function (state, val) {
        state.currentStep = val;
    },

    setHintViewed: function( state, val ) {
        state.hint_viewed = val;
    }



};

export default mutations;
