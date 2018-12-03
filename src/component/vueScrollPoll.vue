<script>
import Page from '../core/Page.js';
import PageManager from '../core/PageManager.js';
import Container from '../core/Container.js';

export default{
    props: {
        outerHeight: {
            type: [String,Number],
            default: '100%'
        },
        scrollLimit: {
            type: [String,Number],
            default: Number.POSITIVE_INFINITY
        }
    },
    data(){
        return {
            list: [],
            paddingTop: 0,
            paddingBottom: 0
        };
    },
    computed:{
        innerStyle(){
            return {
                'padding-top': this.paddingTop + 'px',
                'padding-bottom': this.paddingBottom + 'px' 
            }
        }
    },
    methods: {
        update(dataMeta){
            this.list = dataMeta.showList;
            this.paddingTop = dataMeta.paddingTop;
            this.paddingBottom = dataMeta.paddingBottom;
        },
        updateList(list,cb){
            this.list = list;
            this.$nextTick(cb);
        },
        addPage(){
            this.container.requestData().then(
                listData=>{
                    // console.log('listData',listData);
                    if(listData){
                        this.updateList(listData,()=>{
                            this.container.updatePage();
                        });
                    }
                }
            );
        },
        onscroll(){
            if(this.container.isReachBottom()){
                // console.log('bottom');
                this.addPage();
            }else{
                let ret = this.container.checkPage();

                if(ret){
                    this.update(ret);
                }
            }

            
        }
    },
    mounted(){
        let pageManager = new PageManager(10,makeList);
        this.container = new Container(this.$refs.scrollOuter,this.$refs.scrollInner,pageManager);
        this.addPage();
    },
    created(){
        this.container = null;
    }
}
</script>

<template>
    <div class="vue-scroll-poll">
        <div class="scroll-outer" ref="scrollOuter" @scroll.passive="onscroll">
            <div class="scroll-inner" ref="scrollInner" :style="innerStyle">
                <div v-for="(item) in list" class="scroll-item" :key="item">
                    <slot name="list-item">
                        <div>{{item}}</div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scopted>
    .vue-scroll-poll{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .scroll-outer{
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
    }
</style>