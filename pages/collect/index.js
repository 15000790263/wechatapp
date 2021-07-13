// pages/collect/index.js
Page({

  
  data: {
    colls:[]
  },

 
  onShow: function () {
    
    let colls = wx.getStorageSync('colls') || []
    this.setData({
      colls
    })
    
  },

 
})