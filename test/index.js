Vue.config.productionTip = false
var vueScrollPoll = window['vue-scroll-poll'].default;
Vue.use(vueScrollPoll);
new Vue({
    el: '#app',
    data: {

    },
    methods: {
        makeList: function(page,length){
            let ret = [];
            let start = (page-1) * length;
            for(let i=0;i<length;i++){
                ret.push(start + i + 1);
            }
    
            return (new Promise(function(resolve,reject){
                resolve(ret);
            }));
        }
    }
});