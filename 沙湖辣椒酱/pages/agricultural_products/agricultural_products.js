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
      num: 0,
      name: "时"
    }, {
      num: 1,
      name: "日"
    }, {
      num: 2,
      name: "月"
    }, {
      num: 3,
      name: "年"
    }],
    result_name: ["时", "日", '月', '年'],
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
  
  //发送信息
  formSubmit: function (e) {
    var that = this
    var product_certificate_no = e.detail.value.product_certificate_no;
    var record_at = that.data.date2;
    var period_type = that.data.result[that.data.index4].num;
    var period_validity = e.detail.value.period_validity;
    var organization = e.detail.value.organization;

   
    // if (goods_code == "" || whole_saler_out_code == "" || in_date == "" || transporter_code==""||voucher_code==""){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入完整信息',
    //     showCancel:false
    //   })
    //   return
    // }

    wx.request({
      url: getApp().globalData.url + '/api/basics/certificate',
      method: 'POST',
      data: {
        product_certificate_no: product_certificate_no,
        record_at : record_at,
        period_type:period_type,
        period_validity : period_validity,
        organization :organization,
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