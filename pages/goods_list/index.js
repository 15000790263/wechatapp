// pages/goods_list/index.js
import { request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    index: 0,
    // 经验：接口需要的参数较多时，可以作为一个单独对象进行传递
    QueryParams: {
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10
    }
  },
  totalPage: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.QueryParams.cid = options.cid

    this.getGoods()


    // wx.showToast({
    //   title: '哈哈哈',
    //   icon: 'none'
    // });

  },
  async getGoods() {
    const res = await request({
      url: "/goods/search",
      data: this.data.QueryParams
    })

    this.setData({
      goods:[...this.data.goods,...res.goods]
    })

    this.totalPage = Math.ceil(res.total / 10)
    console.log(res)
    wx.stopPullDownRefresh()

  },

  titleTap(e) {
    // console.log(e);
    this.setData({
      // index用来排序，暂时用不到
      // index: e.detail
    })
  },
  onReachBottom() {
    // console.log("bottom");
    const page = this.data.QueryParams.pagenum ++
    if(page - this.totalPage >= 0){
      // console.log("唧唧");
      wx.showToast({
        title: '已经是最后一页啦',
        icon: 'none',
      })

    }else{
      // console.log("哥哥");
      this.getGoods()
      
    }


  },
  onPullDownRefresh() {
    this.data.QueryParams.pagenum = 1
    this.data.goods = []
    this.getGoods()

    
    
  }
})