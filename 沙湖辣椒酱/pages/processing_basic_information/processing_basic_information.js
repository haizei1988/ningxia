// pages/admission_detail/admission_detail.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    user: true,
    pageData: {
      page: 1,
      limit: 30
    },
    total: '',
    array_goods: [],
    supplier: [],
    supplier_name: [],
    feeder: [],
    principals:[],
    goodsName: '',
    date: "",
    goodsId: '',
    supplierName: '',
    supplierId: '',
    principalsName: '',
    principalsId: '',
    feederId: "",
    feederName: "",
    result: [{
      num: 1,
      name: "产地证明号"
    }, {
      num: 2,
      name: "动物检疫合格证明编号"
    }, {
      num: 3,
      name: "食用农产品合格证编号"
    }, {
      num: 4,
      name: "自产生批次码"
    }],
    result_name: ['产地证明号', '动物检疫合格证明编号', '食用农产品合格证编号','自产生批次码'],
    index: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    array_goods_status: true,
    feeder_name: true,
    supplier_name: true,
    principal_name: true,
    init: false,
    height: '',
    hiddenLoading: true,
    unit: [],
    specification: [],
    inputs: "请输入种子批次号",
    urls: '/api/purchase/seed'
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
  // 投料品厂商
  principalsValue() {
    var that = this;
    that.setData({
      init: false,
      pageData: {
        page: 1,
        limit: 30
      }
    })
    wx.request({
      url: getApp().globalData.url + '/api/system/account/staff' + '?name=' + that.data.principalsName,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            principals: !res.data.message.data.length ? [] : [...res.data.message.data],
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
        console.log(res)
      }
    })
  },
  principalsNull(val = '') {
    let that = this;
    var temp = {};
    that.setData({
      hiddenLoading: false,
      init: false
    })
    wx.request({
      url: getApp().globalData.url + '/api/system/account/staff',
      method: 'GET',
      data: !val ? that.data.pageData : Object.assign(that.data.pageData, { page: parseInt(that.data.pageData.page) + 1 }),
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            principals: !res.data.message.data.length ? [] : (!val ? [...res.data.message.data] : [...that.data.array_goods, ...res.data.message.data]),
            hiddenLoading: true,
            init: true,
            total: res.data.message.total
          })
          console.log(that.data.principals)
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
  //选着投料品厂商
  
  principals_name() {
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
   
    if (that.data.principalsName != "") {
      this.principalsValue();
    } else {
      //投料品厂商
      this.principalsNull();
    }
    that.setData({
      array_goods: true,
      feeder_name: true,
      principal_name: false,
      supplier_name: true,
    })
  },

  bindKeyInput4(e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      init: false
    })
    console.log(e.detail.value)
    wx.request({
      url: getApp().globalData.url + '/api/system/account/staff' + '?name=' + e.detail.value,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            principals: !res.data.message.data.length ? [] : [...res.data.message.data],
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
        console.log(res)

      }
    })
  },
  bingId4(event) {
    this.setData({
      principalsId: event.currentTarget.dataset.id.id,
      principalsName: event.currentTarget.dataset.id.name,
      hiddenLoading: true,
      principal_name: true
    })
  },



  // 质检员
  feederValue() {
    var that = this;
    that.setData({
      init: false,
      pageData: {
        page: 1,
        limit: 30
      }
    })
    wx.request({
      url: getApp().globalData.url + '/api/system/account/staff' + '?name=' + that.data.feederName,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            feeder: !res.data.message.data.length ? [] : [...res.data.message.data],
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
        console.log(res)
      }
    })
  },
  feederNull(val = '') {
    let that = this;
    var temp = {};
    that.setData({
      hiddenLoading: false,
      init: false
    })
    wx.request({
      url: getApp().globalData.url + '/api/system/account/staff',
      method: 'GET',
      data: !val ? that.data.pageData : Object.assign(that.data.pageData, { page: parseInt(that.data.pageData.page) + 1 }),
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': wx.getStorageSync('Authorization')
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            feeder: !res.data.message.data.length ? [] : (!val ? [...res.data.message.data] : [...that.data.array_goods, ...res.data.message.data]),
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
  feeder_name() {
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
    if (that.data.feederName != "") {
      this.feederValue();
    } else {
      //投料品厂商

      this.feederNull();
    }
    that.setData({
      array_goods: true,
      feeder_name: false,
      supplier_name: true,
      principal_name: true,
    })
  },

  bindKeyInput2(e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      init: false
    })
    console.log(e.detail.value)
    wx.request({
      url: getApp().globalData.url + '/api/system/account/staff' + '?name=' + e.detail.value,
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
        console.log(res)

      }
    })
  },
  bingId2(event) {
    this.setData({
      feederId: event.currentTarget.dataset.id.id,
      feederName: event.currentTarget.dataset.id.name,
      hiddenLoading: true,
      feeder_name: true
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
      url: getApp().globalData.url + '/api/basics/production_goods_basic' + '?goods_name=' + that.data.goodsName,
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
      url: getApp().globalData.url + '/api/basics/production_goods_basic',
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
  //选择投料品种
  Varieties_feeding: function () {
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
    if (that.data.goodsName != "") {
      console.log("youzhi")
      this.goodsNameValue();
    } else {
      //投料品种
      console.log("wuzhi")
      this.goodsNameNull();
    }
    that.setData({
      array_goods_status: false,
      feeder_name: true,
      supplier_name: true,
      principal_name: true,
    })

  },

  // 供货商
  supplierValue() {
    let that = this;
    wx.request({
      url: getApp().globalData.url + "/api/purchase/pdt_materials"+ '?purchase_batch=' + that.data.supplierName,
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
      url: getApp().globalData.url +"/api/purchase/pdt_materials",
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
      principal_name: true,
    })
  },
  //下拉框消失
  hidden() {
    var that = this
    that.setData({
      array_goods_status: true,
      feeder_name: true,
      supplier_name: true,
      principal_name: true,
    })
  },
  //投料品种模糊查询
  bindKeyInput(e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      init: false
    })
    console.log(e.detail.value)
    wx.request({
      url: getApp().globalData.url + '/api/basics/production_goods_basic' + '?goods_name=' + e.detail.value,
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
        console.log(res)

      }
    })
  },
  //供货商
  bindKeyInput3(e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      init: false
    })
    console.log(e.detail.value)
    wx.request({
      url: getApp().globalData.url +"/api/purchase/pdt_materials"+ '?purchase_batch=' + e.detail.value,
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
  //选择进场时间
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 赋值投料品品种id
  bingId(event) {
    this.setData({
      goodsId: event.currentTarget.dataset.id.id,
      goodsName: event.currentTarget.dataset.id.goods_name,
      array_goods_status: true,
      hiddenLoading: true,
    })
  },

  //供货商投料品id
  bingId3(event) {
    this.setData({
      supplierId: event.currentTarget.dataset.id.id,
      supplierName: event.currentTarget.dataset.id.purchase_batch,
      hiddenLoading: true,
      supplier_name: true
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
    var that = this

    that.setData({
      index4: e.detail.value
    })
    console.log(that.data.index4)
    if (that.data.index4 == 0) {
      that.setData({
        urls: '/api/purchase/seed',
        inputs: '请输入种子批次号'
      });
    } else if (that.data.index4 == 1) {
      that.setData({
        urls: '/api/purchase/muck',
        inputs: '请输入肥料批次号'
      });
    } else if (that.data.index4 == 2) {
      that.setData({
        urls: '/api/purchase/drug',
        inputs: '请输入农药批次号'
      });
    }
  },

  //发送信息
  formSubmit: function (e) {
    var that = this
    var pdt_goods_basics_id = that.data.goodsId
    var purchase_batch = that.data.supplierName
    var produce_date=that.data.date
    var amount = e.detail.value.amount
    var operator = that.data.principalsId
    var manager = that.data.feederId;

    // if (goods_code == "" || whole_saler_out_code == "" || in_date == "" || transporter_code==""||voucher_code==""){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入完整信息',
    //     showCancel:false
    //   })
    //   return
    // }
    wx.request({
      url: getApp().globalData.url + '/api/working/pdtbasic',
      method: 'POST',
      data: {
        pdt_goods_basics_id: pdt_goods_basics_id,
        purchase_batch: purchase_batch,
        produce_date: produce_date,
        amount: amount,
        operator: operator,
        manager: manager, 
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
        } else if (res.data.code == 400) {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          })
        }

      }
    })
  }
})