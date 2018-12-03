import vueScrollPoll from './component/vueScrollPoll.vue';

const plugin = {
    install(Vue){
        Vue.component('VueScrollPoll',vueScrollPoll);
    }
}

export default plugin;