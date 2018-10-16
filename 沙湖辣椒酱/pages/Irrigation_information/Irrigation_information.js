// pages/admission_detail/admission_detail.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    supplierName: '',
    supplierId: '',
    user: true,
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
      name: "Ⅰ类"
    }, {
      num: 2,
      name: "Ⅱ类"
      }, {
        num: 2,
        name: "Ⅲ类"
    }, {
      num: 2,
      name: "Ⅳ类"
      }, {
        num: 2,
        name: "5Ⅴ类"
      }],
    result_name: ['Ⅰ类', 'Ⅱ类', 'Ⅲ类', 'Ⅳ类', '5Ⅴ类'],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var is_super = wx.getStorageSync("is_super")
    if (is_super == 1) {
      that.setData({
        user: false
      })
    } else {
      that.setData({
        user: true
      })
    }
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

  supplierValue() {
    let that = this;
    wx.request({
      url: getApp().globalData.url + "/api/system/account/staff" + "?name=" + that.data.supplierName,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            supplier: !res.data.message.data.length ? [] : [...res.data.message.data],
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
  supplierNull(val = '') {
    let that = this;
    wx.request({
      url: getApp().globalData.url + "/api/system/account/staff",
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
            supplier: !res.data.message.data.length ? [] : (!val ? [...res.data.message.data] : [...that.data.array_goods, ...res.data.message.data]),
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
  //选择供货商
  supplier_name() {
    var that = this
    that.setData({
      hiddenLoading: !this.data.hiddenLoading,
      init: false,
      pageData: {
        page: 1,
        limit: 30
      },
      total: ''
    })
    if (that.data.supplierName != "") {
      that.supplierValue();
    } else {
      that.supplierNull();
    }
    that.setData({
      array_goods: true,
      feeder_name: true,
      supplier_name: false,
    })
  },
  bingId3(event) {
    this.setData({
      supplierId: event.currentTarget.dataset.id.id,
      supplierName: event.currentTarget.dataset.id.name,
      hiddenLoading: true,
      supplier_name: true
    })
  },
  bindKeyInput3(e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      init: false
    })
    console.log(e.detail.value)
    wx.request({
      url: getApp().globalData.url + "/api/system/account/staff" + '?name=' + e.detail.value,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            supplier: !res.data.message.data.length ? [] : [...res.data.message.data],
            hiddenLoading: true,
            init: true
          })
          console.log(that.data.array_goods)
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
      url: getApp().globalData.url + '/api/farming/base_info' + '?plant_batch=' + that.data.goodsName,
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
      url: getApp().globalData.url + '/api/farming/base_info',
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
      goodsName: event.currentTarget.dataset.id.plant_batch,
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
  //选择商品
  picker_goods: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //选择进场时间
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //选择采购日期
  bindDateChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  //检疫结果
  result: function (e) {
    this.setData({
      index4: e.detail.value
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
        url: getApp().globalData.url + '/api/farming/base_info' + '?plant_batch=' + that.data.goodsName,
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
  //发送信息
  formSubmit: function (e) {
    var that = this
    var plant_batch = that.data.goodsName;
    var water_time = that.data.date2;
    var water_duration = e.detail.value.water_duration;
    var water_level = that.data.result[that.data.index4].num;
    var water_mineral = e.detail.value.water_mineral;
    var water_source = e.detail.value.water_source;
    var person_in_charge_id = that.data.supplierId;
    // if (goods_code == "" || whole_saler_out_code == "" || in_date == "" || transporter_code==""||voucher_code==""){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入完整信息',
    //     showCancel:false
    //   })
    //   return
    // }

    wx.request({
      url: getApp().globalData.url + '/api/farming/irrigation',
      method: 'POST',
      data: {
        plant_batch: plant_batch,
        water_time: water_time,
        water_duration: water_duration,
        water_level: water_level,
        water_mineral: water_mineral,
        water_source: water_source,
        person_in_charge_id: person_in_charge_id
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