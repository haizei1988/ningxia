// pages/admission_detail/admission_detail.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    pageData: {
      page: 1,
      limit: 30
    },
    total: '',
    array_goods: [],
    array_goods_name: ["q", "s"],
    date: "",
    result: [{
      num: 1,
      name: "种子"
    }, {
      num: 2,
      name: "农药"
    }, {
      num: 3,
      name: "化肥"
    }, {
      num: 4,
      name: "其他投料"
    }],
    result_name: ["种子", "农药", '化肥', '其他投料'],
    index: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    index5: 0,
    index6: 0,
    index7: 0,
    array_goods_status: true,
    feeder_name: true,
    goodsName: "",
    supplier_name: true,
    init: false,
    height: '',
    hiddenLoading: true,
    img_arr: [],
    imgs:[],
    formdata: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight - 30
        })
      },
    })
    //设置时间
    var time = util.formatTime(new Date());
    console.log(time)
    that.setData({
      date: time,
      date2: time
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //检疫结果
  result: function (e) {
    this.setData({
      index4: e.detail.value
    })
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
    var supplier_name = e.detail.value.manufacturer_name;
    var supplier_code = e.detail.value.manufacturer_code;
 
    var operate_type = e.detail.value.operate_type;
    var type = that.data.result[that.data.index4].num
    var record_at = that.data.date2
    var legal_man = e.detail.value.legal_man;
    var phone = e.detail.value.phone;
    var license_images = that.data.imgs
    if (phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请检查手机号',
        showCancel: false
      })
      return
    } else if (legal_man.length >= 5 || legal_man <= 1) {
      wx.showModal({
        title: '提示',
        content: '请检查负责人',
        showCancel: false
      })
      return
    }
    // if (goods_code == "" || whole_saler_out_code == "" || in_date == "" || transporter_code==""||voucher_code==""){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入完整信息',
    //     showCancel:false
    //   })
    //   return
    // }

    wx.request({
      url: getApp().globalData.url + '/api/basics/supplier',
      method: 'POST',
      data: {
        supplier_name: supplier_name,
        supplier_code: supplier_code,
     
        operate_type: operate_type,
        type: type,
        record_at: record_at,
        legal_man: legal_man,
        phone: phone,
        license_images: license_images,
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