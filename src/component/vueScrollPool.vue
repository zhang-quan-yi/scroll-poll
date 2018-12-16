<script>
import PageManager from '../core/PageManager.js';
import Container from '../core/Container.js';

let appendStyle = function(outerHeight){
    let css = '',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
    css = '.vsp-scroll-pool{overflow: hidden;}';
    css += '.vsp-scroll-outer{height: '+ outerHeight + ';overflow-y: scroll;-webkit-overflow-scrolling : touch;}';
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

let handleHeight = function(outerHeight){
    let height;
    // https://www.w3cplus.com/javascript/offset-scroll-client.html © w3cplus.com
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if(outerHeight.indexOf('px') !== -1){
        height = parseFloat(outerHeight);
    }else{
        height = parseFloat(outerHeight) * windowHeight/100;
    }
    height = Math.min(windowHeight,height);
    height += 'px';
    return height;
}

export default{
    props: {
        outerHeight: {
            type: [String,Number],
            default: '100'
        },
        maxHeight: {
            type: [String,Number],
            default: Number.POSITIVE_INFINITY
        },
        getData: Function
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
        let pageManager = this.pageManager = new PageManager(this.getData);
        // console.log('this.$refs.scrollOuter',this.$refs.scrollOuter);
        this.container = new Container(this.$refs.scrollOuter,this.$refs.scrollInner,pageManager);
        this.addPage();
    },
    created(){
        this.container = null;
        let height = handleHeight(this.outerHeight);
        appendStyle(height);
    }
}
</script>

<template>
    <div class="vsp-scroll-pool">
        <div class="vsp-scroll-outer" ref="scrollOuter" @scroll.passive="onscroll">
            <div class="vsp-scroll-inner" ref="scrollInner" :style="innerStyle">
                <div v-for="(item) in list" class="scroll-item" :key="item">
                    <slot name="list-item" :item="item">
                        <div>{{item}}</div>
                    </slot>
                </div>
                <slot name="loading" v-if="pageManager.isLoading" v-cloak>
                    <div class="vsp-loading">加载中...</div>
                </slot>
                <slot name="footer" v-if="isReachFooter && !pageManager.isLoading" v-cloak>
                    <div class="vsp-footer">加载完毕</div>
                </slot>
            </div>
        </div>
    </div>
</template>