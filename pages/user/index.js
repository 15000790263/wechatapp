// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    colls:[]
  },
  
  onShow(){
    let userInfo = wx.getStorageSync('userInfo')
    let colls = wx.getStorageSync('colls') || []
    
    this.setData({
      userInfo,
      colls,
    })
  }

})