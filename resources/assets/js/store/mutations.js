const  mutations = {

    setLanguage: function (state, locale) {
        console.log("Setting language");
        state.language = locale;
        Vue.i18n.set(locale);
    },

    setDrawerType: function (state, typeID) {
        console.log("drawer type changed to: " + typeID);
        state.drawertype = typeID;
    },

    setDrawerTypeCategory: function (state, val) {
        console.log("type category set to: " + val);
        state.drawer_type_category = val;
    },

    isLineaBox: function (state, val) {
        console.log("lineabox flag changed to: " + val);
        state.is_lineabox = val;
    },

    setWidth: function (state, val) {

        if (isNaN(val)) {
            console.log("width dimension NaN changed to: " + 300);
            state.dimensions.width = 300;
            return;
        }
        console.log("width dimension changed to: " + val);
        state.dimensions.width = parseFloat(val);
    },

    setLength: function (state, val) {

        if (isNaN(val)) {
            console.log("length dimension NaN changed to: " + 300);
            state.dimensions.length = 300;
            return;
        }

        console.log("length dimension changed to: " + val);
        state.dimensions.length = parseFloat(val);
    },

    setShoulderHeight: function (state, val) {

        if (isNaN(val)) {
            console.log("shoulder_height dimension NaN changed to: " + 100);
            state.dimensions.shoulder_height = 100;
            return;
        }

        console.log("shoulder height dimension changed to: " + parseFloat(val));
        state.dimensions.shoulder_height = parseFloat(val);
    },

    setBridgeOrientation: function (state, val) {
        console.log("bridge orientation changed to: " + val);
        state.bridge_orientation = val;
    },

    isSuitableForHBridge: function (state, val) {
        console.log("is_suitable_width_4hbridge changed to: " + val);
        state.is_suitable_width_4hbridge = val;
    },

    isSuitableHeightForBridge: function (state, val) {
        console.log("is_suitable_height_4bridge changed to: " + val);
        state.is_suitable_height_4bridge = val;
    },

    hasBridge: function (state, val) {
        console.log("has_bridge changed to: " + val);
        state.has_bridge = val;
    },

    setBridgeSupportID: function (state, val) {
        console.log("bridge_supportID changed to: " + val);
        state.bridge_supportID = val;
    },

    setBridgeID: function (state, val) {
        console.log("bridge_ID changed to: " + val);
        state.bridge_ID = val;
    },

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

    manageBridgeSupport: function (state, obj) {

        console.log("pushing in support");
        state.bridge_supports_selected.push(obj);
    },

    clearBridgeSupports: function (state) {
        console.log("Bridge supports cleanUp");
        state.bridge_supports_selected = [];
    },

    manageBridge: function (state, obj) {

        console.log("pushing in bridge");
        state.bridges_selected.push(obj);
    },

    removeBridge: function (state, val) { /** TODO **/
    },

    clearBridges: function (state) {
        console.log("Bridges cleanUp");
        state.bridges_selected = [];
    },

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

    clearBridgeData: function (state) {

        console.log("clearing bridge data");

        state.bridge_supports_selected = [];
        state.bridges_selected = [];
        state.bridge_ID = 0;
        state.bridge_supportID = 0;
        state.has_bridge = false;
    },

    manageDivider: function (state, obj) {

        console.log("managing dividers");

        if ($.inArray(obj.id, state.dividers_selected) != -1) {
            console.log("pulling out divider");
            state.dividers_selected.splice($.inArray(obj.id, state.dividers_selected), 1);
            return;
        }

        console.log("pushing in divider");
        state.dividers_selected.push(obj.id);
    },


    setOnecompleted: function (state, val) {
        console.log("onecompleted changed to: " + val);
        state.onecompleted = val;
    },

    setTwocompleted: function (state, val) {
        console.log("twocompleted changed to: " + val);
        state.twocompleted = val;
    },

    setThreecompleted: function (state, val) {
        console.log("threecompleted changed to: " + val);
        state.threecompleted = val;
    },

    setBridgecompleted: function (state, val) {
        console.log("bridgecompleted changed to: " + val);
        state.bridgecompleted = val;
    },

    setFourcompleted: function (state, val) {
        console.log("fourcompleted changed to: " + val);
        state.fourcompleted = val;
    },

    setFivecompleted: function (state, val) {
        console.log("fivecompleted changed to: " + val);
        state.fivecompleted = val;
    },
};

export default mutations;
