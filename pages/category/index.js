// pages/category/index.js
import { request } from "../../request/index"
// import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateLeft: [],
    cateList: [],
    rightList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      数据量太大解决方案：
        0、web中的本地存储和小程序中的本地存储的区别
          - 1、写代码的方式不一样了
           web: localStorage.setItem("key","value")  localStorage.getItem("key")
           小程序中：wx.setStorageSync("key", "value")  wx.getStorageSync("key")
          - 2、存的时候 有没有做类型转换
             web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
             小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型

        1、判断本地存储中有没有旧的数据
        {time:Date.now(),data:[]}
        2、没有旧数据，直接发送新请求
        3、有旧的数据，同时旧数据没有过期，就使用本地存储中的旧数据即可
    */

    // 1、获取本地存储中的数据  （小程序中也是存在本地存储技术的）
    const Cates = wx.getStorageSync("cates")
    if (!Cates) {
      // console.log("沙雕");
      this.getCates()

    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        // console.log("沙雕");
    this.getCates()

      } else {
        // console.log("ok");
        // this.setData({
        //   cateList
        // })
        // console.log(Cates.data);

        let arr = []
        Cates.data.forEach(element => {
          arr.push(element.cat_name)
        })
        this.setData({
          cateLeft: arr,
          cateList: Cates.data,
          rightList: Cates.data[0]
        })
      }
    }

  },

  async getCates() {
    // // console.log("沙雕");
    // request({
    //   url: '/categories'
    // }).then(res => {
    //   // console.log(res);

    //   // 把接口的数据存入到本地存储中
    //   wx.setStorageSync("cates", { time: Date.now(), data: res });

    //   let arr = []
    //   res.forEach(element => {
    //     arr.push(element.cat_name)
    //   })
    //   this.setData({
    //     cateLeft: arr,
    //     cateList: res,
    //     rightList: res[0]
    //   })
    // })

    // // 1 使用es7的async await来发送请求
    // const res = await request({ url: "/categories" });
    // // this.Cates = res;
    // this.Cates = res;
    // // 把接口的数据存入到本地存储中
    // wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    // // 构造左侧的大菜单数据
    // let leftMenuList = this.Cates.map(v => v.cat_name);
    // // 构造右侧的商品数据
    // let rightContent = this.Cates[0].children;
    // this.setData({
    //   leftMenuList,
    //   rightContent
    // })

    const res = await request({ url: '/categories' })
    // console.log(res);
    wx.setStorageSync("cates", { time: Date.now(), data: res });

    let arr = []
    res.forEach(element => {
      arr.push(element.cat_name)
    })
    this.setData({
      cateLeft: arr,
      cateList: res,
      rightList: res[0]
    })


  },


  leftTap(e) {
    console.log(e.detail);
    this.setData({
      rightList: this.data.cateList[e.detail]
    })
  }

})

