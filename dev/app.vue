<script>
    export default{
        data(){
            return {

            }
        },
        methods: {
            makeList: function(page,length){
                let ret = [];
                let start = (page-1) * length;
                for(let i=0;i<length;i++){
                    ret.push(start + i + 1);
                }
        
                return (new Promise(function(resolve,reject){
                    setTimeout(function(){
                        resolve(ret);
                    },0);
                }));
            }
        }
    }
</script>
<template>
    <vue-scroll-poll :get-list="makeList" :max-height="20000"></vue-scroll-poll>
</template>

<style lang="css">
    html,body,#app{
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .scroll-item{
        background-color: white;
        border: 4px solid;
        padding: 22px;
    }
</style>
