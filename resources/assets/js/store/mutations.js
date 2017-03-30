const  mutations = {

    /**
     * Description
     * @method setLanguage
     * @param {} state
     * @param {} locale
     * @return 
     */
    setLanguage: function (state, locale) {
        console.log("Setting language");
        state.language = locale;
        Vue.i18n.set(locale);
    },

    /**
     * Description
     * @method setDrawerType
     * @param {} state
     * @param {} typeID
     * @return 
     */
    setDrawerType: function (state, typeID) {
        console.log("drawer type changed to: " + typeID);
        state.drawertype = typeID;
    },

    /**
     * Description
     * @method setDrawerTypeCategory
     * @param {} state
     * @param {} val
     * @return 
     */
    setDrawerTypeCategory: function (state, val) {
        console.log("type category set to: " + val);
        state.drawer_type_category = val;
    },

    /**
     * Description
     * @method isLineaBox
     * @param {} state
     * @param {} val
     * @return 
     */
    isLineaBox: function (state, val) {
        console.log("lineabox flag changed to: " + val);
        state.is_lineabox = val;
    },

    /**
     * Description
     * @method setWidth
     * @param {} state
     * @param {} val
     * @return 
     */
    setWidth: function (state, val) {

        if (isNaN(val)) {
            console.log("width dimension NaN changed to: " + 300);
            state.dimensions.width = 300;
            return;
        }
        console.log("width dimension changed to: " + val);
        state.dimensions.width = parseFloat(val);
    },

    /**
     * Description
     * @method setLength
     * @param {} state
     * @param {} val
     * @return 
     */
    setLength: function (state, val) {

        if (isNaN(val)) {
            console.log("length dimension NaN changed to: " + 300);
            state.dimensions.length = 300;
            return;
        }

        console.log("length dimension changed to: " + val);
        state.dimensions.length = parseFloat(val);
    },

    /**
     * Description
     * @method setShoulderHeight
     * @param {} state
     * @param {} val
     * @return 
     */
    setShoulderHeight: function (state, val) {

        if (isNaN(val)) {
            console.log("shoulder_height dimension NaN changed to: " + 100);
            state.dimensions.shoulder_height = 100;
            return;
        }

        console.log("shoulder height dimension changed to: " + parseFloat(val));
        state.dimensions.shoulder_height = parseFloat(val);
    },

    /**
     * Description
     * @method setBridgeOrientation
     * @param {} state
     * @param {} val
     * @return 
     */
    setBridgeOrientation: function (state, val) {
        console.log("bridge orientation changed to: " + val);
        state.bridge_orientation = val;
    },

    /**
     * Description
     * @method isSuitableForHBridge
     * @param {} state
     * @param {} val
     * @return 
     */
    isSuitableForHBridge: function (state, val) {
        console.log("is_suitable_width_4hbridge changed to: " + val);
        state.is_suitable_width_4hbridge = val;
    },

    /**
     * Description
     * @method isSuitableHeightForBridge
     * @param {} state
     * @param {} val
     * @return 
     */
    isSuitableHeightForBridge: function (state, val) {
        console.log("is_suitable_height_4bridge changed to: " + val);
        state.is_suitable_height_4bridge = val;
    },

    /**
     * Description
     * @method hasBridge
     * @param {} state
     * @param {} val
     * @return 
     */
    hasBridge: function (state, val) {
        console.log("has_bridge changed to: " + val);
        state.has_bridge = val;
    },

    /**
     * Description
     * @method setBridgeSupportID
     * @param {} state
     * @param {} val
     * @return 
     */
    setBridgeSupportID: function (state, val) {
        console.log("bridge_supportID changed to: " + val);
        state.bridge_supportID = val;
    },

    /**
     * Description
     * @method setBridgeID
     * @param {} state
     * @param {} val
     * @return 
     */
    setBridgeID: function (state, val) {
        console.log("bridge_ID changed to: " + val);
        state.bridge_ID = val;
    },

    /**
     * Description
     * @method computeDimensionsOnSupportsChanges
     * @param {} state
     * @param {} obj
     * @return 
     */
    computeDimensionsOnSupportsChanges: function (state, obj) {

        switch (state.bridge_orientation) {

            case 'H':

                switch (state.drawertype) {

                    case 4:

                        if (obj.op == "clear") {
                            var supports_in = state.bridge_supports_selected.length;
                            if (0 == supports_in) {
                                console.log("no changes to available width");
                                return;
                            }
                            state.dimensions.delta_width += supports_in * 6;
                            console.log("available width enlarged by: " + supports_in * 6);
                        }
                        else {
                            state.dimensions.delta_width -= 12;
                            console.log("available width reduced by: " + 12);
                        }
                        break;

                    case 3:
                        // do nothing
                        break;

                    case 2:
                    case 1:
                        // do nothing
                        break;
                }

                break;

            case 'V':

                switch (state.drawertype) {

                    case 4: // custom
                    case 3: // lineabox 2 sides

                        if (obj.op == "clear") {

                            var supports_in = state.bridge_supports_selected.length;
                            if (0 == supports_in) {
                                console.log("no changes to available length");
                                return;
                            }
                            state.dimensions.delta_length += supports_in * 6;
                            console.log("available length enlarged by: " + supports_in * 6);
                        }
                        else {
                            state.dimensions.delta_length -= 12;
                            console.log("available length reduced by: " + 12);
                        }
                        break;

                    case 2:
                    case 1:
                        if (obj.op == "clear") {
                            var supports_in = state.bridge_supports_selected.length;
                            if (0 == supports_in) {
                                console.log("no changes to available length");
                                return;
                            }
                            state.dimensions.delta_length += supports_in * 6;
                            console.log("available length enlarged by: " + 6);
                        }
                        else {
                            state.dimensions.delta_length -= 6;
                            console.log("available length reduced by: " + 6);
                        }
                        break;
                }

                break;
        }
    },

    /**
     * Description
     * @method manageBridgeSupport
     * @param {} state
     * @param {} obj
     * @return 
     */
    manageBridgeSupport: function (state, obj) {

        console.log("pushing in support");
        state.bridge_supports_selected.push(obj);
    },

    /**
     * Description
     * @method clearBridgeSupports
     * @param {} state
     * @return 
     */
    clearBridgeSupports: function (state) {
        console.log("Bridge supports cleanUp");
        state.bridge_supports_selected = [];
    },

    /**
     * Description
     * @method manageBridge
     * @param {} state
     * @param {} obj
     * @return 
     */
    manageBridge: function (state, obj) {

        console.log("pushing in bridge");
        state.bridges_selected.push(obj);
    },

    /**
     * Description
     * @method removeBridge
     * @param {} state
     * @param {} val
     * @return 
     */
    removeBridge: function (state, val) { /** TODO **/
    },

    /**
     * Description
     * @method clearBridges
     * @param {} state
     * @return 
     */
    clearBridges: function (state) {
        console.log("Bridges cleanUp");
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

        console.log("has bridge changed to: " + state.has_bridge);
    },

    /**
     * Description
     * @method clearBridgeData
     * @param {} state
     * @return 
     */
    clearBridgeData: function (state) {

        console.log("clearing bridge data");

        state.bridge_supports_selected = [];
        state.bridges_selected = [];
        state.bridge_ID = 0;
        state.bridge_supportID = 0;
        state.has_bridge = false;
    },

    /**
     * Description
     * @method manageDivider
     * @param {} state
     * @param {} obj
     * @return 
     */
    pushDivider: function (state, obj) {

        console.log("managing dividers");

        /*if ($.inArray(obj.id, state.dividers_selected) != -1) {
            console.log("pulling out divider");
            state.dividers_selected.splice($.inArray(obj.id, state.dividers_selected), 1);
            return;
        }*/

        console.log("pushing in divider");
        state.dividers_selected.push( obj );
        console.log( state.dividers_selected );
    },

    removeDivider: function( state, objID ) {

        console.log( " removing ");

        var removeMe = {};
        state.dividers_selected.forEach( function( divider, index ) {
            if( objID === divider.id ) {
                 removeMe = index;
            }
        });
        
        Vue.delete( state.dividers_selected, removeMe );
        //state.dividers_selected.$remove( removeMe );        
        console.log( state.dividers_selected );
    },

    clearDividers: function( state ) {
        state.dividers_selected = [];
    },

    setDrawerBorderTopHex: function( state, obj ) {
        console.log( "changing border top hex to: " + obj );
        state.drawer_border_top.hex = obj;
    },

    setDrawerBorderLeftHex: function( state, obj ) {
        console.log( "changing border left hex to: " + obj );
        state.drawer_border_left.hex = obj;
    },

    setDrawerBorderRightHex: function( state, obj ) {
        console.log( "changing border right hex to: " + obj );
        state.drawer_border_right.hex = obj;
    },

    setDrawerBorderBottomHex: function( state, obj ) {
        console.log( "changing border bottom hex to: " + obj );
        state.drawer_border_bottom.hex = obj;
    },  

    setDrawerBorderSelected: function( state, obj ) {
        console.log( obj );
        console.log( "drawer_border_" +  obj.id );
        state[ "drawer_border_" +  obj.id ].selected = obj.val;
    },  

    clearDrawerBorders: function( state ) {
        state.drawer_border_top = {};
        state.drawer_border_left = {};
        state.drawer_border_right = {};
        state.drawer_border_bottom = {};
    },

    setDividerHex: function( state, obj ) {

        var i = 0;
        state.dividers_selected.forEach( function( divider, index ) {
            if( obj.id === divider.id ) {
                 i = index;
            }
        });

        state.dividers_selected[ i ].hex = obj.hexa;
    },  

    setBridgeHex: function( state, obj ) {

        for( var i = 0; i < state.bridges_selected.length; i++ ) {
            state.bridges_selected[ i ].hex = obj;
        }
        console.log( state.bridges_selected );
    },

    /**
     * Description
     * @method setOnecompleted
     * @param {} state
     * @param {} val
     * @return 
     */
    setOnecompleted: function (state, val) {
        console.log("onecompleted changed to: " + val);
        state.onecompleted = val;
    },

    /**
     * Description
     * @method setTwocompleted
     * @param {} state
     * @param {} val
     * @return 
     */
    setTwocompleted: function (state, val) {
        console.log("twocompleted changed to: " + val);
        state.twocompleted = val;
    },

    /**
     * Description
     * @method setThreecompleted
     * @param {} state
     * @param {} val
     * @return 
     */
    setThreecompleted: function (state, val) {
        console.log("threecompleted changed to: " + val);
        state.threecompleted = val;
    },

    /**
     * Description
     * @method setBridgecompleted
     * @param {} state
     * @param {} val
     * @return 
     */
    setBridgecompleted: function (state, val) {
        console.log("bridgecompleted changed to: " + val);
        state.bridgecompleted = val;
    },

    /**
     * Description
     * @method setFourcompleted
     * @param {} state
     * @param {} val
     * @return 
     */
    setFourcompleted: function (state, val) {
        console.log("fourcompleted changed to: " + val);
        state.fourcompleted = val;
    },

    /**
     * Description
     * @method setFivecompleted
     * @param {} state
     * @param {} val
     * @return 
     */
    setFivecompleted: function (state, val) {
        console.log("fivecompleted changed to: " + val);
        state.fivecompleted = val;
    },

    setDrawersTypes: function (state,val) {
        state.drawerTypes = val;
    },

    setBridgesTypes: function (state,val) {
        state.bridgeTypes = val;
    },

    setSupportsTypes: function (state,val) {
        state.supportTypes = val;
    },

    setDividerTypes: function (state,val) {
        state.dividerTypes = val;
    },

    setComponentHeader : function (state,payload)  {
        console.log("EXECUTED");
        state.currentComponentHeader=payload;
    }

};

export default mutations;
