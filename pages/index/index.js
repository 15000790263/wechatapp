import { request } from "../../request/index"

Page({
  /**
  * 页面的初始数据
  */
  data: {
    swiperList: [],
    cateList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: '/home/swiperdata',
    //   // data: {},
    //   // method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: res => {
    //     // success
    //     console.log(res);
    //     this.setData({
    //       swiperList:res
    //     })
    //   },
    // })
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
    
  },
  getSwiperList(){
    request({
      url: '/home/swiperdata',
    }).then(res => {
      this.setData({
        swiperList: res
      })
    })
  },

  getCateList(){
    request({
      url: '/home/catitems',
    }).then(res => {
      // console.log(res);
      this.setData({
        cateList: res
      })
    })
  },

  getFloorList(){
    request({
      url: '/home/floordata',
    }).then(res => {
      // console.log(res);
      this.setData({
        floorList: res
      })
    })
  }

})