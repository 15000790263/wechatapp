// pages/auth/index.js
import { login } from "../../utils/asyncWx"
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e) {
    try {
      // console.log(e);
      const { encryptedData, iv, rawData, signature } = e.detail
      const { code } = await login()
      const loginParams = { encryptedData, iv, rawData, signature, code }

      const res = await request({
        url: "/users/wxlogin",
        data: loginParams,
        method: "post"
      })
      console.log(res);
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面

      })
    } catch (error) {
      console.log(error);
    }
  }

})