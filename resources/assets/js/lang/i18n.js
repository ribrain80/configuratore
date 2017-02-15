/**
 * Gestione del package template languageselector
 * @type {Vue}
 */
var languageselector = new Vue({
    el: 'languageselector',
    data: {
        lang:{},
        activeLanguage:'',
        languages:[
            {label:'Italiano ',code:'it'},
            {label:'English ',code:'en'},
            {label:'Español ',code:'es'},
            {label:'Français ',code:'fr'},
            {label:'Português ',code:'pt'},
            {label:'Deutsch ',code:'de'},
            {label:'中国 ',code:'zh'},
        ]
    },
    methods: {
        initlang: function () {
            var self=this;
            self.lang = new Lang();
            $.each(this.languages,function (k,cur) {
                self.lang.dynamic(cur.code, '/js/lang/'+cur.code+'.json');
            });
            this.lang.init(
                {
                    defaultLang: 'it',
                    allowCookieOverride: true
                }
            );
        },
        changeLanguage: function (newLanguage) {
            console.log('ChangeLanguage to: '+newLanguage);
            this.activeLanguage=newLanguage;
            this.lang.change(newLanguage);
        }
    },
    mounted() {
        this.initlang();
        this.activeLanguage=this.$cookie.get('langCookie');;
    }
});
