// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  formSubmit: function (e) {
    var num = e.detail.value.num
      wx.navigateTo({
        url: '../out/out?src=' + num, //
        success: function () {

        },       //成功后的回调；
        fail: function () { },         //失败后的回调；
        complete: function () { }      //结束后的回调(成功，失败都会执行)
      })
    
  }
})