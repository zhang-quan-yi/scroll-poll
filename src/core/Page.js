/**
 * Page 类
 * 以分页的形式管理列表；
 * 
 * 属性：
 * id: 分页的页码
 * start: 该分页包含的列表元素的起始下标；
 * end: 该分页包含的列表元素的结束下标；
 * height: 该分页在页面上的高度；
 * yAxis: 该分页在页面上的距离顶部的距离；
 * 
 * 方法：
 * updatePaage: 更新分页的尺寸信息
 */
class Page {
    constructor(currentPage,start,end){
        this.id = currentPage;
        this.start = start;
        this.end = start + end;
        this.height = 0;
        this.yAxis = 0;
    }

    updatePage(yAxis,innerHeight){
        this.height = innerHeight - yAxis;
        this.yAxis = yAxis;
    }
};

export default Page;