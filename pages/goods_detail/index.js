// pages/goods_detail/index.js

import { request } from "../../request/index"
import { showModal, showToast } from "../../utils/asyncWx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    imageArr: [],
    isCollected: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {

    let pages = getCurrentPages();
    let { options } = pages[pages.length - 1]

    // console.log(options);
    // const {goods_id} = options  结构赋值
    this.getDetail(options.goods_id)
    // options.goods_id是个string类型
    // 需要转换为number类型，
    // 在控制台，number类型显示蓝色，string类型显示黑色
    let id = parseInt(options.goods_id)
    let colls = wx.getStorageSync("colls") || [];
    // console.log(colls);

    // console.log((colls[0].goods_id))
    // console.log(id);
    // console.log(typeof(options.goods_id));

    // // 在做恒等的时候，必须保证类型相同
    // console.log(colls.filter(item => item.goods_id === id));
    if (colls.length && (colls.filter(item => item.goods_id === id).length)) {
      this.setData({
        // true表示收藏，false表示未收藏
        isCollected: true
      })
      console.log(123);
    }
  },




  async getDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id,
      }
    })
    // console.log(res);

    let arr = []
    res.pics.forEach(element => {
      arr.push(element.pics_big)
    });
    // console.log(res);

    // this.data.goodsDetail = res
    this.setData({
      goodsDetail: {
        goods_id: res.goods_id,
        pics: res.pics,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        goods_introduce: res.goods_introduce,
        count: 1,
        checked: true,
      },
      imageArr: arr
    })

  },
  handlePrevewImage(e) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.imageArr[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: this.data.imageArr,

    })
    // console.log(e.currentTarget.dataset.index);

  },
  handleCartAdd() {
    // console.log(123);
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(item => item.goods_id === this.data.goodsDetail.goods_id)
    // console.log(index);
    if (index === -1) {
      cart.push(this.data.goodsDetail)
    } else {
      cart[index].count++
    }

    wx.setStorageSync("cart", cart);

    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    });
  },

  async handleCollect() {
    let colls = wx.getStorageSync("colls") || [];
    if (!this.data.isCollected) {
      colls.push(this.data.goodsDetail)

      wx.setStorageSync('colls', colls)
      this.setData({
        isCollected: !this.data.isCollected
      })

      await showToast({title:"收藏成功"})
        

    } else {

      const res = await showModal({ content: "确定要取消收藏吗！" })
      if (res.confirm) {
        let index = colls.findIndex(v => v.goods_id === this.data.goodsDetail.goods_id)
        colls.splice(index, 1)
        wx.setStorageSync('colls', colls)
        this.setData({
          isCollected: !this.data.isCollected
        })
        await showToast({title:"取消成功"})
      }
    }

  }

})