// pages/search/index.js
import { request } from "../../request/index"
import { debounce } from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: [],
    isFocus: false,
    inValue: ""
  },
  timer: -1,

  hindleInput(e) {

    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        isFocus: false,
        searchContent: []
      })
      return;
    }

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getSearchContent(value)
    }, 1000);

    this.setData({
      isFocus: true,
    })


  },

  async getSearchContent(query) {
    const searchContent = await request({
      url: "/goods/qsearch",
      data: {
        query,
      }
    })

    this.setData({
      searchContent,
    })
  },

  handleCancle() {
    this.setData({
      inValue: "",
      isFocus: false,
      searchContent: []
    })
    // this.hindleInput({ detail: { value: "" } })

    wx.requestPayment({
      nonceStr: 'nonceStr',
      package: 'package',
      paySign: 'paySign',
      timeStamp: 'timeStamp',
      complete: (res) => {},
      fail: (res) => {},
      signType: signType,
      success: (res) => {},
    })
  }


})