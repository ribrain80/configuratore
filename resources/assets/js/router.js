import VueRouter    from 'vue-router'

//Define route components
/*const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>Foo</div>' }
const Bar = { template: '<div>Bar</div>' }
*/

// lazy load components
const step1 = (resolve) => require(['./components/step1.vue'], resolve)

export default new VueRouter({
    mode: 'history',
    base: __dirname,
      routes: [
        { path: '/step1', component: step1 } // example of route with a seperate component
      ]
});