<script>
    export default{
        data(){
            return {

            }
        },
        methods: {
            makeList: function(page){
                let length = 10;
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
    <vue-scroll-pool :get-data="makeList" :max-height="20000" outer-height="100">
        <div slot="list-item" slot-scope="slotProps" class="item">
            {{slotProps.item}}
        </div>
        <div slot="loading" class="scroll-tip">
            加载中。。。
        </div>
        <div slot="footer" class="scroll-tip">
            ～已经到底啦～
        </div>
    </vue-scroll-pool>
</template>

<style lang="css">
    html,body,#app{
        padding: 0;
        margin: 0;
    }
    .item{
        background-color: white;
        border: 4px solid;
        padding: 22px;
    }

    .scroll-tip{
        color:#666;text-align:center;padding:10px 0;
    }
</style>