import Vue from 'vue';
import App from './app.vue';

//import VueScrollPool from '../src/index.js';
import VueScrollPool from '../dist/index.js';

Vue.use(VueScrollPool);

new Vue({
    render:(h)=>h(App)
}).$mount('#app');