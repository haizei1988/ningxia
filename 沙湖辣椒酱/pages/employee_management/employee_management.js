// pages/employee_management/employee_management.js
// pages/admission_detail/admission_detail.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    init: false,
    height: '',
    hiddenLoading: true,
    img_arr: [],
    formdata: '',
    imgs:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //检疫结果
  result: function (e) {
 
  },
  uploadPhoto() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        that.setData({
          imgs: that.data.img_arr.concat(res.tempFilePaths)
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths;
        // upload(that, tempFilePaths);
      }


    })
  },
  deleteImg: function (e) {
    console.log("quxiao")
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
   },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;

    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  }, 
   //发送信息
  formSubmit: function (e) {
    var that = this
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var id_card = e.detail.value.id_card;
    var verify_images = that.data.imgs
    // if (phone.length != 11) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请检查手机号',
    //     showCancel: false
    //   })
    //   return
    // } else if (legal_man.length >= 5 || legal_man <= 1) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请检查负责人',
    //     showCancel: false
    //   })
    //   return
    // }
    // if (goods_code == "" || whole_saler_out_code == "" || in_date == "" || transporter_code==""||voucher_code==""){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入完整信息',
    //     showCancel:false
    //   })
    //   return
    // }

    wx.request({
      url: getApp().globalData.url + '/api/system/account/staff',
      method: 'POST',
      data: {
        name: name,
        id_card: id_card,
        verify_images: verify_images,
        phone: phone,
      },
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          wx.showModal({
            title: '提示',
            content: '添加成功',
            showCancel: false
          })
        } else if (res.data.code == 422) {
          wx.showModal({
            title: '提示',
            content: '请检查输入完整信息',
            showCancel: false
          })
        }
      }
    })
  }
})