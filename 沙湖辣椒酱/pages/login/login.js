// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    loadingHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var that = this
    if (app.trim(e.detail.value.phone) == "" || app.trim(e.detail.value.psd) == "") {
      wx.showToast({
        title: '请输入账号或密码',
        icon: "none"
      })
      that.setData({
        disabled: false
      })
      return;
    } else {
      that.setData({
        loadingHidden: false
      })
      wx.request({
        url: getApp().globalData.url + '/api/login',
        data: {
          "phone": e.detail.value.phone,
          "password": e.detail.value.psd
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success: res => {
          if (res.data.code == 200) {
            wx.redirectTo({
              url: '/pages/index/index',
            })
            that.setData({
              loadingHidden: true
            })
            console.log(res)
            var is_super = res.data.message.is_super
            let token = res.data.message.token_type + ' ' + res.data.message.access_token;
            var expires_out = new Date().getTime() + res.data.message.expires_in;
            var temp = Object.assign({}, res.data.message, { expires_out: expires_out });
            wx.setStorageSync('Authorization', token);
            wx.setStorageSync('userInfo_shop', temp);
            wx.setStorageSync('is_super', is_super);
          } else if (res.data.code == 401) {
            that.setData({
              disabled: false,
              loadingHidden: true
            })
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.message,
            })
          }
        },
        fail: function (error) {
          that.setData({
            disabled: false,
            loadingHidden: true
          })
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.message,
          })
        }

      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})