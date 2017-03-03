var Configuration = {

	drawerId: '',
    lineabox: false,
    drawertype:0,
    dimensions: {
        width:800,
        shoulder_height:100,
        length:600
    },
    dividers:[],
    bridge_supports_selected: [],
    /*
    support obj { id, width, height, pos }
     */
    
    /*
    * {
    *   bridges:[
    *      {id:num,color:color_id, orientation: "H"},
    *      ....
    *   ]
    * }
    * */
    bridges_selected: [],
    pdf: {
    	brochure: false,
    	summary: false,
    	email: '',
    	send: false,
    	download: false
    }
}
