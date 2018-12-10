<script>
import PageManager from '../core/PageManager.js';
import Container from '../core/Container.js';

let appendStyle = function(){
    let css = '',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
    css = '.vsp-scroll-poll{height: 100%;width: 100%;overflow: hidden;}';
    css += '.vsp-scroll-outer{height: 100%;overflow-y: scroll;-webkit-overflow-scrolling : touch;}';
    css += '.vsp-loading,.vsp-footer{color:#666;text-align:center;padding:10px 0;}';
    style.type = 'text/css';

    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
};

export default{
    props: {
        outerHeight: {
            type: [String,Number],
            default: '100%'
        },
        maxHeight: {
            type: [String,Number],
            default: Number.POSITIVE_INFINITY
        },
        getList: Function
    },
    data(){
        return {
            list: [],
            paddingTop: 0,
            paddingBottom: 0,
            isReachFooter: false,
            pageManager: {}
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
            if(this.container.isReachBottom() && !this.isReachFooter){
                // console.log('bottom');
                if(this.container.innerHeight >= this.maxHeight){
                    this.isReachFooter = true;
                }
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
        let pageManager = this.pageManager = new PageManager(10,this.getList);
        // console.log('this.$refs.scrollOuter',this.$refs.scrollOuter);
        this.container = new Container(this.$refs.scrollOuter,this.$refs.scrollInner,pageManager);
        this.addPage();
    },
    created(){
        appendStyle();
        this.container = null;
    }
}
</script>

<template>
    <div class="vsp-scroll-poll">
        <div class="vsp-scroll-outer" ref="scrollOuter" @scroll.passive="onscroll">
            <div class="vsp-scroll-inner" ref="scrollInner" :style="innerStyle">
                <div v-for="(item) in list" class="scroll-item" :key="item">
                    <slot name="list-item" :item="item">
                        <div>{{item}}</div>
                    </slot>
                </div>
                <slot name="loading" v-if="pageManager.isLoading">
                    <div class="vsp-loading">加载中...</div>
                </slot>
                <slot name="footer" v-if="isReachFooter && !pageManager.isLoading">
                    <div class="vsp-footer">加载完毕</div>
                </slot>
            </div>
        </div>
    </div>
</template>