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
  // 分页
  loadPaageMore(e) {
    if (Number(this.data.pageData.page) <= Number(this.data.total)) {
      e.currentTarget.dataset.pageName === 'goods' ? this.goodsNameNull('more') : this.supplierNull('more');
    } else {
      wx.showToast({
        title: '没有更多的数据',
        icon: 'none'
      })
    }
  },
  goodsNameValue() {
    var that = this;
    that.setData({
      init: false,
      pageData: {
        page: 1,
        limit: 30
      }
    })
    wx.request({
      url: getApp().globalData.url + '/api/basics/area' + '?area_name=' + that.data.goodsName,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            array_goods: !res.data.message.data.length ? [] : [...res.data.message.data],
            hiddenLoading: true,
            init: true
          })
        } else if (res.data.code == 401) {
          that.setData({
            hiddenLoading: true,
            init: true
          })
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.message,
          })
        }
      }
    })
  },
  goodsNameNull(val = '') {
    var that = this;
    var temp = {};
    that.setData({
      hiddenLoading: false,
      init: false
    })
    wx.request({
      url: getApp().globalData.url + '/api/basics/area',
      method: 'GET',
      data: !val ? that.data.pageData : Object.assign(that.data.pageData, {
        page: parseInt(that.data.pageData.page) + 1
      }),
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            array_goods: !res.data.message.data.length ? [] : (!val ? [...res.data.message.data] : [...that.data.array_goods, ...res.data.message.data]),
            hiddenLoading: true,
            init: true,
            total: res.data.message.total
          })
        } else if (res.data.code == 401) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            hiddenLoading: true,
            init: true,
            content: res.data.message,
          })
        }
      }
    })
  },
  // 赋值投料品品种id
  bingId(event) {
    this.setData({
      goodsId: event.currentTarget.dataset.id.id,
      goodsName: event.currentTarget.dataset.id.area_name,
      array_goods_status: true,
      hiddenLoading: true,
    })
  },
  //选择种子
  Varieties_feeding: function () {
    var that = this;
    that.setData({
      hiddenLoading: !this.data.hiddenLoading,
      init: false,
      pageData: {
        page: 1,
        limit: 30
      },
      total: ''
    })
    if (that.data.goodsName != "") {
      this.goodsNameValue();
    } else {
      //投料品种
      this.goodsNameNull();
    }
    that.setData({
      array_goods_status: false,
      feeder_name: true,
      supplier_name: true,
    })

  },
  //模糊查询
  bindKeyInput(e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      init: false
    })
    if (e.detail.value !== '') {
      wx.request({
        url: getApp().globalData.url + '/api/basics/area' + '?area_name=' + e.detail.value,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': wx.getStorageSync('Authorization')
        },
        success: res => {
          if (res.data.code == 200) {
            that.setData({
              array_goods: !res.data.message.data.length ? [] : [...res.data.message.data],
              hiddenLoading: true,
              init: true
            })
          } else if (res.data.code == 401) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.message,
              hiddenLoading: true
            })
          }
        }
      })
    } else {
      this.goodsNameNull();
    }
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
          img_arr: that.data.img_arr.concat(res.tempFilePaths)
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths;
        // upload(that, tempFilePaths);
      }
    })
  },
  //发送信息
  formSubmit: function (e) {
    var that = this
    var buyer_code = e.detail.value.buyer_code;
    var buyer_name = e.detail.value.buyer_name;
    var area_id=that.data.goodsId
 
    // if (goods_code == "" || whole_saler_out_code == "" || in_date == "" || transporter_code==""||voucher_code==""){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入完整信息',
    //     showCancel:false
    //   })
    //   return
    // }
    wx.request({
      url: getApp().globalData.url + '/api/basics/customer',
      method: 'POST',
      data: {
        buyer_code: buyer_code,
        buyer_name: buyer_name,

        area_id: area_id,
      
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