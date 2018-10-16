// pages/admission/admission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    name:options.name
  })
  },
  camera:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.navigateTo({
          url: '../out/out?src=' + res.result, //
          success: function () {
          },       //成功后的回调；
          fail: function () { },         //失败后的回调；
          complete: function () { }      //结束后的回调(成功，失败都会执行)
        })
        console.log(res)
      }
    })
 },
  navigata:function(){
    console.log(this.data.name)
    if(this.data.name=='入场'){
      wx.navigateTo({
        url: '/pages/admission_detail/admission_detail',
      })
    } else if (this.data.name == '种子采购'){
      wx.navigateTo({
        url: '/pages/seed_procurement/seed_procurement',
      })
    } else if (this.data.name == '肥料采购'){
      wx.navigateTo({
        url: '/pages/fertilizer_procurement/fertilizer_procurement',
      })
    } else if (this.data.name == '农药采购'){
      wx.navigateTo({
        url: '/pages/pesticide_procurement/pesticide_procurement',
      })
    } 
    //新加
    else if (this.data.name == '加工原料采购') {
      wx.navigateTo({
        url: '/pages/material_procurement/material_procurement',
      })
    } else if (this.data.name == '加工投料采购') {
      wx.navigateTo({
        url: '/pages/processing_procurement/processing_procurement',
      })
    }

    else if (this.data.name == '其他采购') {
      wx.navigateTo({
        url: '/pages/admission_detail/admission_detail',
      })
    }else if (this.data.name == '实时气象') {
      wx.navigateTo({
        url: '/pages/weather_information/weather_information',
      })
    } else if (this.data.name == '基础') {
      wx.navigateTo({
        url: '/pages/basic_information/basic_information',
      })
    } else if (this.data.name == '过程') {
      wx.navigateTo({
        url: '/pages/process_information/process_information',
      })
    } else if (this.data.name == '灌溉') {
      wx.navigateTo({
        url: '/pages/Irrigation_information/Irrigation_information',
      })
    } else if (this.data.name == '施药') {
      wx.navigateTo({
        url: '/pages/application_information/application_information',
      })
    } else if (this.data.name == '收货') {
      wx.navigateTo({
        url: '/pages/delivery_information/delivery_information',
      })    
    }
//系统设置
    else if (this.data.name == '员工') {
      wx.navigateTo({
        url: '/pages/employee_management/employee_management',
      })
    }
    else if (this.data.name == '用户') {
      wx.navigateTo({
        url: '/pages/user_management/user_management',
      })
    }
//生产加工
    else if (this.data.name == '加工基础') {
      wx.navigateTo({
        url: '/pages/processing_basic_information/processing_basic_information',
      })
    } else if (this.data.name == '加工过程') {
      wx.navigateTo({
        url: '/pages/user_management/user_management',
      })
    } else if (this.data.name == '生产企业检验') {
      wx.navigateTo({
        url: '/pages/production_inspection/production_inspection',
      })
    } else if (this.data.name == '分包赋码') {
      wx.navigateTo({
        url: '/pages/user_management/user_management',
      })
    }
// 基础信息
    else if (this.data.name == '生产商厂商') {
      wx.navigateTo({
        url: '/pages/manufacturer_manufacturer/manufacturer_manufacturer',
      })
    }
    else if (this.data.name == '供应商') {
      wx.navigateTo({
        url: '/pages/supplier_management/supplier_management',
      })
    }
    else if (this.data.name == '客户') {
      wx.navigateTo({
        url: '/pages/customer_Information/customer_Information',
      })
    }
    else if (this.data.name == '投料品种') {
      wx.navigateTo({
        url: '/pages/delivery_information/delivery_information',
      })
    } else if (this.data.name == '基地') {
      wx.navigateTo({
        url: '/pages/base_information/base_information',
      })
    } else if (this.data.name == '种植地块') {
      wx.navigateTo({
        url: '/pages/planting_plot/planting_plot',
      })
    } else if (this.data.name == '食用农产品合格证书') {
      wx.navigateTo({
        url: '/pages/agricultural_products/agricultural_products',
      })
    } else if (this.data.name == '种子') {
      wx.navigateTo({
        url: '/pages/seed/seed',
      })
    } else if (this.data.name == '农药') {
      wx.navigateTo({
        url: '/pages/drug/drug',
      })
    } else if (this.data.name == '肥料') {
      wx.navigateTo({
        url: '/pages/fertilizer/fertilizer',
      })
    } else if (this.data.name == '其他') {
      wx.navigateTo({
        url: '/pages/other_inputs/other_inputs',
      })
    } else if (this.data.name == '生产加工商品') {
      wx.navigateTo({
        url: '/pages/production_goods/production_goods',
      })
    } else if (this.data.name == '生产加工原料') {
      wx.navigateTo({
        url: '/pages/production_materials/production_materials',
      })
    } else if (this.data.name == '生产加工投料') {
      wx.navigateTo({
        url: '/pages/production_processing/production_processing',
      })
    }
  }
})