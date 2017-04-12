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

    getSupportsAvailabe: function (state) {
        if (state.dimensions.shoulder_height && state.drawertype) {
            let output = [];
            let shoulder_height_float = parseFloat(state.dimensions.shoulder_height);
            _.forOwn(state.supportTypes, (value, key) => {
                switch( state.drawertype ) {
                    case 4:
                        if ((value.height<=45.6) && shoulder_height_float >= 72) {
                            output.push(value);
                        }
                        if ((value.height>=89.8) && shoulder_height_float >= 116) {
                            output.push(value);
                        }

                        break;
                    default:
                        // # Lineabox is the defaul here!!!!!
                        if ((value.height<=45.6) && shoulder_height_float >= 72 && shoulder_height_float < 148) {
                            output.push(value);
                        }
                        if ((value.height>=89.8) && shoulder_height_float >= 148) {
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
        if (state.objectWorkingOn.type && state.objectWorkingOn.type=='bridge' && state.bridge_supportID) {
            let supportsByCategory = (state.bridge_supportID==1)?state.supportTypes[456]:state.supportTypes[898];
            output = supportsByCategory['items'];
        }
        return output;
    },

    getBorderVariants: function (state) {
        if (state.objectWorkingOn.type && state.objectWorkingOn.type=='border') {
            let out = [];
            out.push(
                {
                    description:'Bordo 1 FAKE',
                    image: 'http://lorempixel.com/output/nature-q-c-640-480-6.jpg',
                    id: 1,
                }
            );
            out.push(
                {
                    description:'Bordo 2 FAKE',
                    image: 'http://lorempixel.com/output/nature-q-c-640-480-5.jpg',
                    id: 2,
                }
            );
            out.push(
                {
                    description:'Bordo 3 FAKE',
                    image: 'http://lorempixel.com/output/nature-q-c-640-480-4.jpg',
                    id: 3,
                }
            );
            out.push(
                {
                    description:'Bordo 4 FAKE',
                    image: 'http://lorempixel.com/output/nature-q-c-640-480-3.jpg',
                    id: 4,
                }
            );
            return out;
        }
        return [];
    },

    getBridgesVariants: function (state) {
        if (state.objectWorkingOn.type && state.objectWorkingOn.type=='bridge') {
            let _tmp = state.bridgeTypes[state.objectWorkingOn.id];
            return _tmp['items'];
        }
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
            'bridge_supports_selected', 'bridges_selected', 'dividers_selected','borders','canvasSvg' ];

        //return am object with a subset of the state object properties using the pick function from lodash libray
        return _.pick(state,needed_props);

    },


};


export default getters;