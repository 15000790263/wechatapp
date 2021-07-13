// pages/order/index.js
import { request } from "../../request/index"
import { formatDate } from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ["全部", "待付款", "待发货", "退款/退货"],
    orders: [],
    date:[]
  },

  onShow: function () {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }

    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1]
    const { type } = currentPage.options

    this.tabbar = this.selectComponent("#tabbar")
    this.tabbar.receiveIndex(type - 1)

    this.getOrders(type)
  },

  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      header: { Authorization: wx.getStorageSync('token') },
      data: {
        type,
      }
    })
    console.log(res);

    let date = res.orders.map(v => {
      return formatDate(new Date(v.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')
    })


    // console.log(date);

    this.setData({
      orders: res.orders,
      date,
    })

  },
  titleTap(e){
    // console.log(e.detail);
    this.getOrders(e.detail+1)

  }

})