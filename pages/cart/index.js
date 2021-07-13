// pages/cart/index.js
import { showModal, showToast} from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    isSelectAll: true,
    isDisabled: false,
    selectCount: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  isSelectAll() {
    let arr = this.data.cart.filter(v => v.checked)
    this.setData({
      isSelectAll: arr.length === this.data.cart.length
    })
  },

  onShow() {
    // 从缓存中取值
    // console.log(1234);
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];

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
      isDisabled: !cart.length,
      selectCount
    })
    this.isSelectAll()
  },
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        // console.log(result);
        wx.setStorageSync("address", result);
      },
    });

  },
  async handleSubbtn(e) {
    // console.log(e.currentTarget.dataset.id);
    let arr = this.data.cart
    let index = arr.findIndex(v => v.goods_id === e.currentTarget.dataset.id)
    // arr.forEach(item => {
    // if (item.goods_id === e.currentTarget.dataset.id) {
    if (arr[index].count === 1) {
      // wx.showToast({
      //   title: '最后一个啦哥',
      //   icon: "none",
      //   mask: true,
      // })
      // console.log(arr);
      // wx.showModal({
      //   title: '提示',
      //   content: '确定要删除吗？',
      //   // this不对，要将这里改为箭头函数
      //   success: res => {
      //     // console.log(res);
      //     if (res.confirm) {
      //       arr.splice(index, 1)
      //       wx.setStorageSync("cart", arr);
      //       this.setData({
      //         cart: arr
      //       })
      //     }
      //     this.onShow()
      //   }
      // })

      const res = await showModal({ content: "确定要删除吗？" })
      if (res.confirm) {
        arr.splice(index, 1)
        wx.setStorageSync("cart", arr);
        this.setData({
          cart: arr
        })
      }
      this.onShow()

    } else {
      arr[index].count--
      // 数据发生改变后保存新的数据
      wx.setStorageSync("cart", arr);
      this.setData({
        cart: arr
      })
      this.onShow()
    }
    // console.log(arr);
    // }
    // })

  },
  handleAddbtn(e) {
    let arr = this.data.cart
    arr.forEach(item => {
      if (item.goods_id === e.currentTarget.dataset.id) {

        item.count++
        // 数据发生改变后保存新的数据
        wx.setStorageSync("cart", arr);
        this.setData({
          cart: arr
        })
        this.onShow()
      }
    })
  },
  handleSelect(e) {
    // console.log(e.currentTarget.dataset.id);
    let arr = this.data.cart
    arr.forEach(item => {
      if (item.goods_id === e.currentTarget.dataset.id) {

        item.checked = !item.checked
        // 数据发生改变后保存新的数据
        wx.setStorageSync("cart", arr);
        this.setData({
          cart: arr
        })
        this.onShow()
      }
    })
  },

  handleSelectAll() {
    // console.log(1234);
    let arr = this.data.cart
    if (this.data.isSelectAll) {
      arr.forEach(v => v.checked = false)
    } else {
      arr.forEach(v => v.checked = true)
    }
    wx.setStorageSync("cart", arr);
    this.setData({
      cart: arr
    })
    this.onShow()


  },
  async handlePay(){
    let {address,selectCount} = this.data
    if(!address.userName){
       await showToast({title:"请选择地址！！"})
    }else if(!selectCount){
      await showToast({title:"请选购商品！！"})
    }else{
      wx.navigateTo({
        url: '/pages/pay/index',
        
      })
    }
    
    
  }
})

