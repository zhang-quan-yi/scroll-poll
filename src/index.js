import vueScrollPool from './component/vueScrollPool.vue';

const plugin = {
    install(Vue){
        Vue.component('VueScrollPool',vueScrollPool);
    }
}

export default plugin;