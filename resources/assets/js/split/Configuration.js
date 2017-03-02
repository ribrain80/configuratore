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
    /*
    * {
    *   orientation:"",
    *   bridges:[
    *      {type:num,color:color_id},
    *      ....
    *   ]
    * }
    * */
    bridges:[],
    pdf: {
    	brochure: false,
    	summary: false,
    	email: '',
    	send: false,
    	download: false
    }
}
