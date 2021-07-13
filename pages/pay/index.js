// pages/cart/index.js
import { showToast, requestPayment } from "../../utils/asyncWx";
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    selectCount: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  onShow() {
    // 从缓存中取值
    // console.log(1234);
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart").filter(v => v.checked);

    const selectCount = cart.filter(v => v.checked).length
    // 求总价格
    const totalPrice = cart.filter(item => item.checked).reduce((pre, item) => {
      return pre + item.goods_price * item.count
    }, 0)
    // 将取出来的值和计算好的总价格赋值后显示
    this.setData({
      address,
      cart,
      totalPrice,
      // 购物车为空，不能点击全选按钮
      selectCount
    })

  },
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync("address", result);
      },
    });

  },

  async handleOrderPay() {
    try {

      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        return;
      }
      // console.log("已经存在token");

      // 创建订单
      // 1、请求头参数
      const header = { Authorization: token }
      // 2、请求体参数
      const order_price = this.data.totalPrice + ""
      let { provinceName, cityName, countyName, detailInfo } = this.data.address
      const consignee_addr = provinceName + cityName + countyName + detailInfo
      let goods = []
      this.data.cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.count,
          goods_price: v.goods_price
        })
      })

      const orderParams = { order_price, consignee_addr, goods }
      // console.log(goods);
      const { order_number } = await request({
        url: "/my/orders/create",
        data: orderParams,
        header: header,
        method: "POST"
      })

      const { pay } = await request({
        url: "/my/orders/req_unifiedorder",
        method: "POST",
        header,
        data: {
          order_number,
        }
      })
      // console.log(pay);
      await requestPayment(pay)

      const res = await request({
        url: "/my/orders/chkOrder",
        method: "POST",
        header,
        data: {
          order_number
        }
      })

      wx.navigateTo({
        url: '/pages/order/index',
      })

      await showToast({ title: "支付成功" })

    } catch (error) {

      await showToast({ title: "支付失败" })

      console.log(error);
    }
  }
})

