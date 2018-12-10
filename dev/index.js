import Vue from 'vue';
import App from './app.vue';

//import VueScrollPoll from '../src/index.js';
import VueScrollPoll from '../dist/index.js';

Vue.use(VueScrollPoll);

new Vue({
    render:(h)=>h(App)
}).$mount('#app');