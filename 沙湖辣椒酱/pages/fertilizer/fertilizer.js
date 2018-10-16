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
    supplier: [],
    supplier_name: [],
    feeder: [],
    goodsName: '',
    date: "",
    goodsId: '',
    supplierName: '',
    supplierId: '',
    feederId: "",
    feederName: "",
    result: [{
      num: 1,
      name: "自购"
    }, {
      num: 2,
      name: "栽培"
    }, {
      num: 3,
      name: "野生"
    }],
    result_name: ['自购', '栽培', '野生'],
    shifou: [{
      num: 1,
      name: "有机"
    }, {
      num: 0,
      name: "无机"
    }],
    shifou_name: ['是', '否'],
    level: [{
      num: 1,
      name: "原种"
    }, {
      num: 2,
      name: "一级良种"
    }, {
      num: 3,
      name: "二级良种"
    }, {
      num: 4,
      name: "三级良种"
    }],
    level_name: ['原种', '一级良种', '二级良种', '三级良种'],
    youxiao_type: [{
      num: 1,
      name: "时"
    }, {
      num: 2,
      name: "日"
    }, {
      num: 3,
      name: "月"
    }, {
      num: 4,
      name: "年"
    }],
    youxiao_type_name: ['时', '日', '月', '年'],
    index: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    array_goods_status: true,
    feeder_name: true,
    supplier_name: true,
    init: false,
    height: '',
    hiddenLoading: true,
    unit: [],
    specification: [],

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
      url: getApp().globalData.url + '/api/basics/variety/breed' + '?variety_name=' + that.data.goodsName,
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
      url: getApp().globalData.url + '/api/basics/variety/breed',
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
    })

  },

  // 投料品厂商
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
      url: getApp().globalData.url + '/api/basics/supplier' + '?supplier_name=' + that.data.feederName,
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
      url: getApp().globalData.url + '/api/basics/supplier',
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
  //选着投料品厂商
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
    })
  },
  // 供货商
  supplierValue() {
    let that = this;
    wx.request({
      url: getApp().globalData.url + '/api/basics/manufacturer' + '?manufacturer_name=' + that.data.supplierName,
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
      url: getApp().globalData.url + '/api/basics/manufacturer',
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
  //下拉框消失
  hidden() {
    var that = this
    that.setData({
      array_goods_status: true,
      feeder_name: true,
      supplier_name: true,
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
      url: getApp().globalData.url + '/api/basics/variety/breed' + '?variety_name=' + e.detail.value,
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

  //投料品种模糊查询
  bindKeyInput2(e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      init: false
    })
    console.log(e.detail.value)
    wx.request({
      url: getApp().globalData.url + '/api/basics/supplier' + '?supplier_name=' + e.detail.value,
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
      url: getApp().globalData.url + '/api/basics/manufacturer' + '?manufacturer_name=' + e.detail.value,
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
      goodsName: event.currentTarget.dataset.id.variety_name,
      array_goods_status: true,
      hiddenLoading: true,
    })
  },

  bingId2(event) {
    this.setData({
      feederId: event.currentTarget.dataset.id.id,
      feederName: event.currentTarget.dataset.id.supplier_name,
      hiddenLoading: true,
      feeder_name: true
    })
  },
  //供货商投料品id
  bingId3(event) {
    this.setData({
      supplierId: event.currentTarget.dataset.id.id,
      supplierName: event.currentTarget.dataset.id.manufacturer_name,
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
  },
  level: function (e) {
    var that = this
    that.setData({
      index3: e.detail.value
    })
  },
  shifou: function (e) {
    var that = this
    that.setData({
      index2: e.detail.value
    })
  },
  youxiao: function (e) {
    var that = this
    that.setData({
      index1: e.detail.value
    })
  },

  //发送信息
  formSubmit: function (e) {
    var that = this
    var pesticide_name = e.detail.value.seed_name
    var variety_id = that.data.goodsId
    var supplier_id = that.data.feederId
    var manufacturer_id = that.data.supplierId
    var production_license = e.detail.value.production_license
    var period_type = that.data.youxiao_type[that.data.index1].num
    var period_validity = e.detail.value.period_validity
    var organic_pesticides = that.data.shifou[that.data.index2].num
    var specification = e.detail.value.specification
    var unit = e.detail.value.unit

    // if (goods_code == "" || whole_saler_out_code == "" || in_date == "" || transporter_code==""||voucher_code==""){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入完整信息',
    //     showCancel:false
    //   })
    //   return
    // }
    wx.request({
      url: getApp().globalData.url + '/api/basics/muck_basic',
      method: 'POST',
      data: {
        fertilizer_name: pesticide_name,
        variety_id: variety_id,
        supplier_id: supplier_id,
        manufacturer_id: manufacturer_id,
        production_license: production_license,
        period_type: period_type,
        period_validity: period_validity,
        organic_chemical_fertilizer: organic_pesticides,
        specification: specification,
        unit: unit,

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