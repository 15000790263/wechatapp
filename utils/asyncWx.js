export function showModal({ content }) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content,
      // this不对，要将这里改为箭头函数
      success: res => {
        resolve(res)
      }
    })
  })
}

export function showToast({ title }) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      // complete: (res) => {},
      duration: 1000,
      fail: (res) => {
        reject(err)
      },
      icon: "none",
      mask: true,
      success: (res) => {
        resolve(res)
      },
    })
  })
}


export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      timeout: 1000,
    })
  })
}

export function requestPayment(pay) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      // timeStamp: pay.timeStamp,
      // nonceStr: pay.nonceStr,
      // package: pay.package,
      // signType: pay.signType,
      // paySign: pay.paySign,
      ...pay,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        // console.log(12345);
        reject(err)
      },
    })
  })
}


export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};



export function debounce(func,delay = 300){
  let timer = null;
  return function(...args){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this,args)
    }, delay);
  }
}
