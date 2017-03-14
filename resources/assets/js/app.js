
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * We will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */
import VueRouter  from 'vue-router'
import router     from './router'
import Vue        from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

// # Tell Vue to use these plugins
Vue.use( Vuex );
Vue.use( VueRouter );

/**
 * [store description]
 * @type {Vuex}
 */
const store = new Vuex.Store({

	modules:{
        i18n: vuexI18n.store
	},

	state: {

        /**
		 * Linguagio dell'interfaccia grafica
		 * @type: string
         */
		language:'it',

		/**
		 * [drawertype description]
		 * @type {Number}
		 */
		drawertype: 0,


		/**
		 * [bridge_category description]
		 * @type {Number}
		 */
		drawer_type_category: 0,

		/**
		 * [is_lineabox description]
		 * @type {Boolean}
		 */
	    is_lineabox: false,

	    /**
	     * [dimensions description]
	     * @type {Object}
	     */
	    dimensions: {

	    	/**
	    	 * [width description]
	    	 * @type {Number}
	    	 */
	        width: 800,

	        /**
	         * [shoulder_height description]
	         * @type {Number}
	         */
	        shoulder_height: 100,

	        /**
	         * [length description]
	         * @type {Number}
	         */
	        length: 600
	    },

	    /**
	     * drawer width must not exceed a value for a H bridge to be chosen
	     * @type {Boolean}
	     */
	    is_suitable_width_4hbridge: true,

	    /**
	     * shoulder height must exceed a minimum value to allow for a bridge to be chosen
	     * @type {Boolean}
	     */
	    is_suitable_height_4bridge: true,

	    /**
	     * [bridge_orientation description]
	     * @type {String}
	     */
	    bridge_orientation: "",

	    /**
	     * [has_bridge description]
	     * @type {Boolean}
	     */
	    has_bridge: false,

	    /**
	     * [bridge_supportID description]
	     * @type {Number}
	     */
	    bridge_supportID: 0,

	    /**
	     * [bridge_ID description]
	     * @type {Number}
	     */
	    bridge_ID: 0,

	    /**
	     * [bridge_supports_selected description]
	     * @type {Array}
	     */
	    bridge_supports_selected: [],

	    /**
	     * [bridges_selected description]
	     * @type {Array}
	     */
	    bridges_selected: [],

	   	/**
	     * [dividers description]
	     * @type {Array}
	     */
	    dividers_selected:[],

	    /**
	     * [pdf description]
	     * @type {Object}
	     */
	    pdf: {

	    	brochure: false,
	    	summary: true,
	    	email: '',
	    	send: false,
	    	download: false
	    },

	    /**
	     * [onecompleted description]
	     * @type {Boolean}
	     */
	    onecompleted: false,

	    /**
	     * [twocompleted description]
	     * @type {Boolean}
	     */
	    twocompleted: false,

	    /**
	     * [threecompleted description]
	     * @type {Boolean}
	     */
	    threecompleted: false,

	    /**
	     * [bridgecompleted description]
	     * @type {Boolean}
	     */
	    bridgecompleted: false,

	    /**
	     * [fourcompleted description]
	     * @type {Boolean}
	     */
	    fourcompleted: false,

	    /**
	     * [fivecompleted description]
	     * @type {Boolean}
	     */
	    fivecompleted: false

	},

	mutations: {

		setLanguage: function (state,locale) {
			console.log("Setting language");
            state.language=locale;
            Vue.i18n.set(locale);
        },

		setDrawerType: function( state, typeID ) {
			console.log( "drawer type changed to: " + typeID );
			state.drawertype = typeID;
		},

		setDrawerTypeCategory: function( state, val ) {
			console.log( "type category set to: " + val );
			state.drawer_type_category = val;
		},

		isLineaBox: function( state, val ) {
			console.log( "lineabox flag changed to: " + val );
			state.is_lineabox = val;
		},

		setWidth: function( state, val ) {
			console.log( "width dimension changed to: " + val );
			state.dimensions.width = val;
		},

		setLength: function( state, val ) {
			console.log( "length dimension changed to: " + val );
			state.dimensions.length = val;
		},

		setShoulderHeight: function( state, val ) {
			console.log( "shoulder height dimension changed to: " + val );
			state.dimensions.shoulder_height = val;
		},

		setBridgeOrientation: function( state, val ) {
			console.log( "bridge orientation changed to: " + val );
			state.bridge_orientation = val;
		},

		isSuitableForHBridge: function( state, val ) {
			console.log( "is_suitable_width_4hbridge changed to: " + val );
			state.is_suitable_width_4hbridge = val;
		},

		isSuitableHeightForBridge: function( state, val ) {
			console.log( "is_suitable_height_4bridge changed to: " + val );
			state.is_suitable_height_4bridge = val;
		},

		hasBridge: function( state, val ) {
			console.log( "has_bridge changed to: " + val );
			state.has_bridge = val;
		},

		setBridgeSupportID: function( state, val ) {
			console.log( "bridge_supportID changed to: " + val );
			state.bridge_supportID = val;
		},

		setBridgeID: function( state, val ) {
			console.log( "bridge_ID changed to: " + val );
			state.bridge_ID = val;
		},

		computeDimensionsOnSupportsChanges: function ( state, obj ) {

			switch( state.bridge_orientation ) {

				case 'H':

					switch( state.drawertype ) {

						case 4:

							if( obj.op == "clear" ) {
								state.dimensions.width += 12;
								console.log( "width enlarged by: " + 12 );
							}
							else{
								state.dimensions.width -= 12;
								console.log( "width reduced by: " + 12 );
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

					switch( state.drawertype ) {

						case 4:
						case 3: 

							if( obj.op == "clear" ){
								state.dimensions.length += 12;
								console.log( "length enlarged by: " + 12 );
							}
							else{
								state.dimensions.length -= 12;
								console.log( "length reduced by: " + 12 );
							}
						break;

						case 2:
						case 1: 
							if( obj.op == "clear" ){
								state.dimensions.length += 6;
								console.log( "length enlarged by: " + 6 );
							}
							else{
								state.dimensions.length -= 6;
								console.log( "length reduced by: " + 6 );
							}
						break;
					}	

				break;
			}
		},

		manageBridgeSupport: function( state, obj ) {

            console.log( "pushing in support" );
			state.bridge_supports_selected.push( obj );
		},

		clearBridgeSupports: function( state ) {
			console.log( "Bridge supports cleanUp");
			state.bridge_supports_selected = [];
		},

		manageBridge: function( state, obj ) {

            console.log( "pushing in bridge" );
			state.bridges_selected.push( obj );
		},

		removeBridge: function( state, val ) { /** TODO **/ },

		clearBridges: function( state ) {
			console.log( "Bridges cleanUp");
			state.bridges_selected = [];
		},


		clearBridgeData: function( state ) { 

			console.log( "clearing bridge data" );

            state.bridge_supports_selected = [];
            state.bridges_selected = [];
            state.bridge_ID = 0;
            state.bridge_supportID = 0;
            state.has_bridge = false;
       	},

       	manageDivider: function ( state, obj ) {

       		console.log( "managing dividers" );

            if(  $.inArray( obj.id, state.dividers_selected ) != -1 ) {
            	console.log( "pulling out divider" );
                state.dividers_selected.splice( $.inArray( obj.id, state.dividers_selected ), 1 );
                return;
            }
            
            console.log( "pushing in divider" );
            state.dividers_selected.push( obj.id );
       	},


       	setOnecompleted: function( state, val ) {
       		console.log( "onecompleted changed to: " + val );
       		state.onecompleted = val;
       	},

	    setTwocompleted: function( state, val ) {
	    	console.log( "twocompleted changed to: " + val );
	    	state.twocompleted = val;
       	},

	    setThreecompleted: function( state, val ) {
       		console.log( "threecompleted changed to: " + val );
       		state.threecompleted = val;
       	},

	    setBridgecompleted: function( state, val ) {
       		console.log( "bridgecompleted changed to: " + val );	    	
       		state.bridgecompleted = val;
       	},

	    setFourcompleted: function( state, val ) {
       		console.log( "fourcompleted changed to: " + val );	    	
       		state.fourcompleted = val;
       	},

	    setFivecompleted: function( state, val ) {
       		console.log( "fivecompleted changed to: " + val );	    	
       		state.fivecompleted = val;
       	},
	}
});

Vue.use(vuexI18n.plugin, store);

const translationsEn = {
    "step1.title": "Welcome to the Split configurator page",
	"step2.warning":"you must select a drawer type",
    'step2.error.tipologie':"Impossible to retive drawer types, come back later",
    "step2.title":"Drawer type",
	"Cassetto":"Drawer",
    'LineaBox 4 lati':'LineaBox 4 sides',
    'LineaBox 3 lati':'LineaBox 3 sides',
    'LineaBox 2 lati':'LineaBox 2 sides',
    "avanti": "Next",
	"attenzione":"Attention! ",
	"step1.product_description_title": "Product description",
	"step1.product_description_text": "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then", 
	"step3.title": "Drawer dimensions",
	"step3.advice": "all fields are required and expressed in millimeters, width must be between {Rwll} and {Rwul}, length between {Rhll} and {Rhul}, edge height between {Shll} and {Shup}. Width > {maxw4b} will prevent an horizontal bridge to be placed in",
	"step3.shoulder_label": "Edge",
	"step3.drawer_width_label": "Drawer width",
	"step3.drawer_length_label": "Drawer length",
	"step3.drawer_edge_height_label": "Edge height",
	"step3.edge_advice": "Lineabox drawer type has 3 fixed edge heights",
	"stepponte.title": "Bridge choice",
	"stepponte.orientation_description": "Would you like to place horizontal or vertical bridge elements?",
	"stepponte.orientation_title": "Bridge orientation",
	"horizontal": "Horizontal",
	"vertical": "Vertical",
	"stepponte.supports_description": "How high do you want to place the bridge?",
	"stepponte.supports_title": "Positioning Height",
	"stepponte.bridge_description": "Choose bridge height",
	"stepponte.bridge_title": "Bridge types",
	"step4.title": "Dividers choice",	
	"step5.title": "Download configurazione",	
	"step5.summary_label": "Summary",
	"step5.email_label": "Email Address",
	"step5.email_send": "Send email",
	"step5.download": "Download"

};

const translationsIt = {
    "step1.title": "Benvenuti nel configuratore Split",
    "step2.warning":"è obbligatorio selezionare una tipologia di cassetto",
    'step2.error.tipologie':"Impossibile scaricare le tipologie di cassetto, riprovi più tardi",
    "step2.title":"Tipologia di cassetto",
    "Cassetto":"Cassetto",
	'LineaBox 4 lati':'LineaBox 4 lati',
    "avanti": "Avanti",
    "attenzione":"Attenzione! ",
    "step1.product_description_title": "Descrizione del prodotto",
    "step1.product_description_text": "In una terra lontana, dietro le montagne Parole, lontani dalle terre di Vocalia e Consonantia, vivono i testi casuali. Vivono isolati nella cittadina di Lettere, sulle coste del Semantico, un immenso oceano linguistico. Un piccolo ruscello chiamato Devoto Oli attraversa quei luoghi, rifornendoli di tutte le regolalie di cui hanno bisogno. È una terra paradismatica, un paese della cuccagna in cui golose porzioni di proposizioni arrostite volano in bocca a chi le desideri. Non una volta i testi casuali sono stati dominati dall’onnipotente Interpunzione, una vita davvero non ortografica. Un giorno però accadde che la piccola riga di un testo casuale, di nome Lorem ipsum, decise di andare a esplorare la vasta Grammatica. Il grande Oximox tentò di dissuaderla, poiché quel luogo pullulava di virgole spietate, punti interrogativi selvaggi e subdoli punti e virgola, ma il piccolo testo casuale non si fece certo fuorviare. Raccolse le sue sette maiuscole, fece scorrere la sua iniziale nella cintura, e si mise in cammino. Quando superò i primi colli dei monti Corsivi, si voltò a guardare un’ultima volta la skyline di Lettere, la sua città, la headline del villaggio Alfabeto e la subline della sua stessa strada, il vicolo Riga. Una domanda retorica",
    "step3.title": "Dimensioni cassetto",
    "step3.advice": "tutti i campi sono obbligatori ed espressi in millimetri, la larghezza deve essere compresa tra {Rwll} e {Rwul}, la lunghezza tra {Rhll} e {Rhul}, l'altezza sponda tra {Shll} e {Shup}. Larghezze superiori a {maxw4b} impediranno il posizionamento dell'elemento ponte orizzontale.",
    "step3.shoulder_label": "Sponda",
    "step3.drawer_width_label": "Larghezza interna cassetto",
	"step3.drawer_length_label": "Profondità interna cassetto",
	"step3.drawer_edge_height_label": "Altezza interna sponda",  
	"step3.edge_advice": "Per il cassetto lineabox sono disponibili 3 altezze predefinite per la sponda",
	"stepponte.title": "Scelta del ponte",  
	"stepponte.orientation_description": "Vuoi inserire elementi ponte? orizzontali o verticali?",
	"stepponte.orientation_title": "Orientamento Ponti",
	"horizontal": "Orizzontale",
	"vertical": "Verticale",
	"stepponte.supports_description": "A che altezza vuoi mettere i ponti?",
	"stepponte.supports_title": "Altezza di posizionamento",	
	"stepponte.bridge_description": "Seleziona l’altezza del ponte da inserire",
	"stepponte.bridge_title": "Tipologie di ponte",	
	"step4.title": "Gestione inserti",	
	"step5.title": "Configuration download",
	"step5.summary_label": "Riepilogo",
	"step5.email_label": "Indirizzo email",
	"step5.email_send": "Invia email",
	"step5.download": "Scarica"
};


// add translations directly to the application
Vue.i18n.add('en', translationsEn);
Vue.i18n.add('it', translationsIt);

// set the start locale to use
Vue.i18n.set('it');
Vue.i18n.fallback('it')


// # Load others components
const languageselector = Vue.component( 'languageselector', require('./components/languageselector.vue' ) );

// # Load components ( NAV )
const step1 = Vue.component( 'step1', require('./components/step1.vue' ));
const step2 = Vue.component( 'step2', require('./components/step2.vue' ));
const step3 = Vue.component( 'step3', require('./components/step3.vue' ));
const stepponte = Vue.component( 'stepponte', require('./components/step-ponte.vue' ));
const step4 = Vue.component( 'step4', require('./components/step4.vue' ));
const step5 = Vue.component( 'step5', require('./components/step5.vue' ));


// # Create and mount root instance.
// # Make sure to inject the router.
// # Route components will be rendered inside <router-view>.
const App = new Vue({

	/**
	 * vuex store injection
	 */
	store,

	/**
	 * router injection
	 */
	router,

	/**
	 * Components ( children of this root instance )
	 * @type {Object}
	 */
	components : {

		languageselector,
		step1,
		step2,
		step3,
		stepponte,
		step4,
		step5
	},

  	data : {}
 
}).$mount( '#app' );


