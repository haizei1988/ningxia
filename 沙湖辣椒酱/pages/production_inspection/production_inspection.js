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
    goodsName: '',
    date: "",
    goodsId: '',
    supplierName: '',
    supplierId: '',
    feederId: "",
    feederName: "",
    result: [{
      num: 1,
      name: "合格"
    }, {
      num: 0,
      name: "不合格"
    }],
    result_name: ['合格', '不合格'],
    types: [{
      num: 1,
      name: "自检"
    }, {
      num: 2,
      name: "第三方检测机构"
    }],
    types_name: ['自检', '第三方检测机构'],
    standards:[{
      num: 1,
      name: "国家标准"
    }, {
      num: 2,
      name: "企业标准"
      }, {
        num: 3,
        name: "地方标准"
      }],
    standards_name: ['国家标准', '企业标准', '地方标准'],
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
    inputs: "请输入原料批次号",
    urls: '/api/purchase/pdt_materials',
    imgs:[],
    img_arr:[]
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
      url: getApp().globalData.url + '/api/working/pdtbasic' + '?batch_code=' + that.data.goodsName,
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
      url: getApp().globalData.url + '/api/working/pdtbasic',
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

  // 供货商
  supplierValue() {
    let that = this;
    wx.request({
      url: getApp().globalData.url + that.data.urls + '?purchase_batch=' + that.data.supplierName,
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
      url: getApp().globalData.url + that.data.urls,
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
      url: getApp().globalData.url + '/api/working/pdtbasic' + '?batch_code=' + e.detail.value,
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
      url: getApp().globalData.url + that.data.urls + '?purchase_batch=' + e.detail.value,
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
      goodsName: event.currentTarget.dataset.id.batch_code,
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
  },
  standards: function (e) {
    var that = this
    that.setData({
      index3: e.detail.value
    })
  },
  types: function (e) {
    var that = this
    that.setData({
      index2: e.detail.value
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
    var batch_code = that.data.goodsName
    var inspection_standard = that.data.standards[that.data.index3].num
    var inspection_user = e.detail.value.inspection_user
    var inspection_date = that.data.date
    var inspection_result=that.data.result[that.data.index4].num
    var inspection_sheet_no = e.detail.value.inspection_sheet_no
    var inspection_pic=that.data.imgs
    var inspection_reoprt_type=that.data.types[that.data.index2].num
    wx.request({
      url: getApp().globalData.url + '/api/working/pdtdetection',
      method: 'POST',
      data: {
        batch_code: batch_code,
        inspection_standard: inspection_standard,
        inspection_user: inspection_user,
        inspection_date: inspection_date,
        inspection_result: inspection_result,
        inspection_sheet_no: inspection_sheet_no,
        inspection_pic: inspection_pic,
        inspection_reoprt_type: inspection_reoprt_type,   
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