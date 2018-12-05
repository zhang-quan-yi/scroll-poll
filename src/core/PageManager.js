/**
 * 分页管理类
 * 
 * 属性：
 * currentPage: 总页码数
 * pageSize: 每页包含的列表数据数量
 * api: 请求新数据的接口，返回 Promise
 * rawList: 所有的列表数据；
 * showList: 在页面上显示的列表数据；
 * pages: 所有的分页；
 * isLoading: 表示是否在请求数据；
 * 
 * 方法：
 * requestData: 请求数据；
 * addPage: 更具请求的数据创建新的分页对象；
 * updateLastPage: 更新新添加的分页的尺寸信息；
 * check: 计算将要显示哪些分页；
 */
import Page from '../core/Page.js';

class PageManager {
    constructor(pageSize,requestApi){
        this.currentPage = 0;
        this.pageSize = pageSize;

        this.api = requestApi;
        this.rawList = [];
        this.showList = [];
        this.pages = [];

        this.isLoading = false;
    }

    requestData(){
        if(this.isLoading){
            return Promise.resolve(false);
        }
        this.isLoading = true;
        this.currentPage++;
        return this.api(this.currentPage,this.pageSize).then(
            listData=>{
                let showList = this.addPage(listData);
                return showList;
            }
        )
    }

    addPage(listData){
        // 这里要直接显示下一页的数据；而不是checkpage
        let start = this.rawList.length;
        let end = this.pageSize - 1;
        let page = new Page(this.currentPage,start,end);

        this.pages.push(page);
        this.rawList = this.rawList.concat(listData);
        this.showList = this.showList.concat(listData);

        return this.showList;
    }

    updateLastPage(oldHeight,innerHeight){
        let length = this.pages.length;
        let page = this.pages[length-1];
        if(page){
            page.updatePage(oldHeight,innerHeight);
        }
    }

    check(scrollTop,outerHeight,innerElHeight){
        if(!this.pages.length){
            return false;
        }
        if(this.isLoading){
            return false;
        }

        let pages = this.pages,
            i,
            page,
            length=pages.length,
            index=-1;
        
        // console.log(scrollTop,outerHeight,innerElHeight);
        for(i=0;i<length;i++){
            page = pages[i];
            if((scrollTop + outerHeight) >= page.yAxis && scrollTop<=page.yAxis + page.height){
                if(index === -1){
                    index = i;
                    break;
                }
            }
        }

        let paddingTop = 0,
            paddingBottom = 0,
            startIndex = 0,
            endIndex = 0;
        if(index !== -1){
            let startPage = pages[index];
            startIndex = startPage.start;
            endIndex = startPage.end;
            paddingTop = startPage.yAxis;

            let endPage = pages[index + 1];
            if(endPage){
                endIndex = endPage.end;
                paddingBottom = innerElHeight - endPage.yAxis - endPage.height;
                //console.log('endPage',endPage);
            }
        }
        //console.log('startIndex',index,paddingTop,paddingBottom,innerElHeight);
        this.showList = this.rawList.slice(startIndex,endIndex+1);

        return {
            showList: this.showList,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom
        };
    }
}

export default PageManager;