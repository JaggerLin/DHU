// pages/home/home.js
//导入 绑定方法 和 store实例对象
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
// 导入 util工具函数
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:'/images/home/migaj.png',
    searchDefault:'',
    eventArray: [],
    currentDate: util.formatDate(new Date()),
    recentDate: util.recentDate(new Date()),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //在加载阶段调用方法将store绑定到page对象，返回值挂在this的自定义属性
    //方法的两个参数分别是this和page对象（同时定义属性）
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:[],
      actions:[]
    })
    this.getRecent()
  },
  // 搜索栏跳转事件
  openSearch: function() {
    // 父页打开子页，用globalData传参；
    // app.globalData.ecData = '/pages/home/home'
    wx.navigateTo({
      url: '/packageB/pages/search/search',
      events: {
        ec: e => console.log(e)
      }
    })
  },
  /* 进入详情页面 */
  enterDetails: function(){
    const value = wx.getStorageSync('key')
    //判断是否登录
    if(value){
      wx.navigateTo({
        url: '/packageB/pages/details/details',
        events: {
          ec: e => console.log(e)
        }
      })
    }
    else{
      wx.switchTab({
        url: '/pages/mine/mine',
      })
    }
  } ,
  // 获取最近一周事件
  getRecent(){
    wx.cloud.callFunction({
      name: "topThree",
      data: {
        minDate: this.data.currentDate,
        maxDate: this.data.recentDate
      }
    })
    .then(res => {
      this.setData({
        eventArray: res.result.recent
      })
      console.log("最近事件获取成功")
    })
    .catch(console.error)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //销毁store绑定对象
    this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})