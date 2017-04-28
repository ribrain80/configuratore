const  getters = {

    getBridgesAvailabe: function (state) {
        let output = [];
        if (state.dimensions.shoulder_height && state.drawertype) {
            let shoulder_height_float = parseFloat( state.dimensions.shoulder_height );
            console.log("shoulder_height_float in getter",shoulder_height_float);
            _.forOwn(state.bridgeTypes, (value, key) => {
                console.log("KEY in getter",key);
                console.log("H in getter",value.height);
                if ((key <= 25.5) && shoulder_height_float >= 72) {
                    output.push(value);
                }
                if (( key >= 48 ) && shoulder_height_float >= 94.5) {
                    output.push(value);
                }
            });
        }
        console.log("OUTPUT in getter: ",output);
        // # Default output: empty array
        return output;
    },

    getLanguage: function( state ) {
        return state.language;
    },

    getSupportsAvailabe: function (state) {
        if (state.dimensions.shoulder_height && state.drawertype) {
            let output = [];
            let shoulder_height_float = parseFloat(state.dimensions.shoulder_height);
            _.forOwn(state.supportTypes, (value, key) => {
                switch( state.drawertype ) {
                    case 4:
                        if ((value.height<=45.5) && shoulder_height_float >= 72) {
                            output.push(value);
                        }
                        if ((value.height>=90) && shoulder_height_float >= 116) {
                            output.push(value);
                        }

                        break;
                    default:
                        // # Lineabox is the defaul here!!!!!
                        if ((value.height<=45.5) && shoulder_height_float >= 72 && shoulder_height_float < 148) {
                            output.push(value);
                        }
                        if ((value.height>=90) && shoulder_height_float >= 148) {
                            output.push(value);
                        }
                        break;
                }
            });
            return output;
        }
        return [];
    },

    getSupportsVariants: function (state) {
        let output = [];
        if ( state.bridge_supportID ) {
            let supportsByCategory = (state.bridge_supportID==1)?state.supportTypes[455]:state.supportTypes[900];
            output = supportsByCategory['items'];
        }
        return output;
    },

    getBorderVariants: function (state) {

        if (state.drawertype && state.objectWorkingOn.type && state.objectWorkingOn.type=='border') {
            let _drawerTypeVariants =state.textureTypes[state.drawertype];
            let _drawerTypeVariantsById = _drawerTypeVariants[state.objectWorkingOn.id];
            return _drawerTypeVariantsById;
        }

        return [];
    },

    getBridgesVariants: function (state) {
        if (state.has_bridge && state.bridge_ID) {
            let _tmp = state.bridgeTypes[state.bridge_ID];
            return _tmp['items'];
        }
        return [];
    },

    getBridgesVariantsVelvetFull: function (state,getters) {
        return getters.getBridgesVariants.filter((cur)=> {
            return cur.border=="Fullcolor" && cur.texture=="Neutro";
        });
    },

    getBridgesVariantsVelvetDark: function (state,getters) {
        return getters.getBridgesVariants.filter((cur)=> {
            return cur.border=="Dark core" && cur.texture=="Neutro";
        });
    },

    getBridgesVariantsLegnoFull: function (state,getters) {
        return getters.getBridgesVariants.filter((cur)=> {
            return cur.border=="Fullcolor" && cur.texture=="Legno";
        });
    },

    getBridgesVariantsLegnoDark: function (state,getters) {
        return getters.getBridgesVariants.filter((cur)=> {
            return cur.border=="Dark core" && cur.texture=="Legno";
        });
    },

    getBridgesVariantsInoxFull: function (state,getters) {
        return getters.getBridgesVariants.filter((cur)=> {
            return cur.border=="Fullcolor" && cur.texture=="Spazzolata (inox)";
        });
    },

    getBridgesVariantsInoxDark: function (state,getters) {
        return getters.getBridgesVariants.filter((cur)=> {
            return cur.border=="Dark core" && cur.texture=="Spazzolata (inox)";
        });
    },




    /**
     * Return all dividers variations depending on the selected item
     * @todo: trivial implementation -- just work but i can do it much better
     * @param state
     * @returns {Array}
     */
    getDividerVariants: function (state) {

        // Execute only if type is set
        if (state.objectWorkingOn.type && state.objectWorkingOn.type=='divider') {

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

    getDividerVariantsVelvetFull: function (state,getters) {
        console.log("IN VELVET GETTER:",getters.getDividerVariants);
        return getters.getDividerVariants.filter((cur)=> {
            console.log(cur.border,cur.texture);
            return cur.border=="Fullcolor" && cur.texture=="Neutro";
        });
    },

    getDividerVariantsVelvetDark: function (state,getters) {
        return getters.getDividerVariants.filter((cur)=> {
            return cur.border=="Dark core" && cur.texture=="Neutro";
        });
    },

    getDividerVariantsLegnoFull: function (state,getters) {
        return getters.getDividerVariants.filter((cur)=> {
            return cur.border=="Fullcolor" && cur.texture=="Legno";
        });
    },

    getDividerVariantsLegnoDark: function (state,getters) {
        return getters.getDividerVariants.filter((cur)=> {
            return cur.border=="Dark core" && cur.texture=="Legno";
        });
    },

    getDividerVariantsInoxFull: function (state,getters) {
        return getters.getDividerVariants.filter((cur)=> {
            return cur.border=="Fullcolor" && cur.texture=="Spazzolata (inox)";
        });
    },

    getDividerVariantsInoxDark: function (state,getters) {
        return getters.getDividerVariants.filter((cur)=> {
            return cur.border=="Dark core" && cur.texture=="Spazzolata (inox)";
        });
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
            'bridge_supports_selected', 'bridges_selected', 'dividers_selected','borders','canvasSvg', 'drawer3dImage' ];

        //return am object with a subset of the state object properties using the pick function from lodash libray
        return _.pick(state,needed_props);

    },


};


export default getters;