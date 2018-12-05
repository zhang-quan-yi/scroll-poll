import Vue from 'vue';
import App from './app.vue';

import VueScrollPoll from '../src/index.js';

Vue.use(VueScrollPoll);

new Vue({
    render:(h)=>h(App)
}).$mount('#app');