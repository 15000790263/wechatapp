let ajaxTimes = 0;

export function request(params) {

  ajaxTimes++;

  wx.showLoading({
    title: '加载中',
    mask:true
  })
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      // url: 'https://URL',
      // data: {},
      // method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => resolve(res.data.message),

      fail: err => reject(err),
      complete: function () {
        ajaxTimes--
        ajaxTimes === 0 && wx.hideLoading()
        // console.log(ajaxTimes);
      }

    })
  })
}