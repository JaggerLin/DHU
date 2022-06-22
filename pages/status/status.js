// pages/status/status.js
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
    currentDate: util.formatDate(new Date()),
    updateArray: [],
    // 线号的键值对id：name
    lineArray: [
      {id:0, line:'MD1'},{id:1, line:'MD2'},{id:2, line:'MD3'},{id:3, line:'MD4'},{id:4, line:'MD5'},{id:5, line:'MD6'},{id:6, line:'MD7'},{id:7, line:'Liquid'}
    ],
    lineName: 'MD1',
    lineId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //在加载阶段调用方法将store绑定到page对象，返回值挂在this的自定义属性
    //方法的两个参数分别是this和page对象（同时定义属性）
    this.storeBindings = createStoreBindings(this,{
      store,
      fields: [],
      actions: [],
    })
    this.getLineStatus()
  },
    // 左右箭头绑定点击事件：切换线号处理函数
    leftArrow: function(){
      this.leftSwitch()
      if(this.updateStatus()){
        this.getLineStatus()
      }
    },
    rightArrow: function(){
      this.rightSwitch()
      if(this.updateStatus()){
        this.getLineStatus()
      }
    },
    // 区域状态显示内容更新
    updateStatus:function(){
      const length = this.data.lineArray.length;
      for(let i = 0; i < length; i++){
        if(this.data.lineArray[i].id == this.data.lineId){
          this.setData({
            lineName: this.data.lineArray[i].line
          })
        }
      };
      return 1;
    },

    // 左箭头点击切换线号
    leftSwitch:function(){
      if(this.data.lineId != 0){
        this.data.lineId -= 1; 
      }
      else{
        this.data.lineId = 7;
      }
    },
    // 右箭头点击切换线号
    rightSwitch:function(){
      if(this.data.lineId < 7){
        this.data.lineId += 1; 
      }
      else{
        this.data.lineId = 0;
      }
    },
    //随机分配函数（配合areaArray仅用于前端测试）
    randomGet:function(){
      let that = this
      let length = that.data.areaArray.length
      let x = Math.floor(Math.random() * length)
      that.data.updateArray[0] = that.data.areaArray[x]
      that.setData({
        updateArray: that.data.updateArray
      })
    },
    // 通过get请求获取此线的数据
    getLineStatus(){
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.callFunction({
        name: 'lineStatus',
        data: {
          currentDate: this.data.currentDate,
          lineName: this.data.lineName
        }
      })
      .then(res => {
        this.setData({
          updateArray: res.result.lineStatus
        })
        wx.hideLoading()
        console.log("成功获取生产情况")
      })
    },

    // 日期选择器value值改变触发事件
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        currentDate: e.detail.value
      })
      this.getLineStatus()
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