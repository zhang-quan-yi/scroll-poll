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
                    resolve(ret);
                }));
            }
        }
    }
</script>
<template>
    <vue-scroll-poll :get-list="makeList"></vue-scroll-poll>
</template>

<style lang="css">
    html,body,#app{
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .scrollPoll{
        background-color: #ddeecc;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .scroll-outer{
        height: 100%;
        background-color: antiquewhite;
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
    }

    .scroll-item{
        background-color: white;
        border: 4px solid;
        padding: 22px;
    }
</style>
