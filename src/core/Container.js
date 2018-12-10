/**
 * 滚动的容器类
 */
class Container{
    constructor(outerEl,innerEl,pageManager){
        this.outerEl = outerEl;
        this.innerEl = innerEl;
        this.pageManager = pageManager;

        this.outerHeight = outerEl.offsetHeight;
        this.innerHeight = innerEl.offsetHeight;

        this.paddingTop = 0;
        this.paddingBottom = 0;

        // 判断滚动到底部的误差值
        this.offset = 100;
    }

    requestData(){
        return this.pageManager.requestData()
    }

    isReachBottom(){
        let scrollTop = this.outerEl.scrollTop;
        let innerElHeight = this.innerEl.offsetHeight;

        return (scrollTop + this.outerHeight + this.offset) > innerElHeight;
    }

    updatePage(){
        let oldHeight = this.innerHeight;
        this.innerHeight = this.innerEl.offsetHeight;
        this.pageManager.updateLastPage(oldHeight,this.innerHeight);
        this.pageManager.isLoading = false;
        // console.log('end',this.pageManager.currentPage);
    }

    checkPage(){
        let scrollTop = this.outerEl.scrollTop;
        let innerHeight = this.innerHeight;
        let outerHeight = this.outerHeight;
        
        return this.pageManager.check(scrollTop,outerHeight,innerHeight);
    
    }
}

export default Container;