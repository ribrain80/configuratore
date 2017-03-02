var Configuration = {

	drawerId: '',
    lineabox: false,
    drawertype:0,
    dimensions: {
        width:1000,
        depth:200,
        length:1000
    },
    dividers:[],
    bridge_supports_chosen: [{},{}],
    /*
    support obj { id, width, height, pos }
     */
    }
    /*
    * {
    *   bridges:[
    *      {id:num,color:color_id, orientation: "H"},
    *      ....
    *   ]
    * }
    * */
    bridges:[{}, {}],
    edges: [],
    pdf: {
    	brochure: false,
    	summary: false,
    	email: '',
    	send: false,
    	download: false
    }
}
