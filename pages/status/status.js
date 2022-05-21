// pages/status/status.js
//导入 绑定方法 和 store实例对象
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaArray:[
      {id:0,line:'MD1',qualityPrf:0,safetyPrf:1,timeGap:1.1,productPrf:0,overdue:200,rework:15,operator:'李二狗',date:'2022-03-19'},
      {id:1,line:'MD2',qualityPrf:1,safetyPrf:0,timeGap:2.1,productPrf:1,overdue:210,rework:25,operator:'张二狗',date:'2022-03-19'},
      {id:2,line:'MD3',qualityPrf:0,safetyPrf:1,timeGap:0,productPrf:0,overdue:220,rework:35,operator:'赵二狗',date:'2022-03-19'},
      {id:3,line:'MD4',qualityPrf:1,safetyPrf:0,timeGap:4.1,productPrf:1,overdue:230,rework:45,operator:'钱二狗',date:'2022-03-19'},
      {id:4,line:'MD5',qualityPrf:1,safetyPrf:0,timeGap:5.1,productPrf:1,overdue:240,rework:55,operator:'孙二狗',date:'2022-03-19'},
      {id:5,line:'MD6',qualityPrf:0,safetyPrf:1,timeGap:0,productPrf:0,overdue:250,rework:65,operator:'王二狗',date:'2022-03-19'},
      {id:6,line:'MD7',qualityPrf:1,safetyPrf:1,timeGap:7.1,productPrf:1,overdue:260,rework:75,operator:'周二狗',date:'2022-03-19'},
      {id:7,line:'Liquid',qualityPrf:1,safetyPrf:0,timeGap:8.1,productPrf:1,overdue:260,rework:75,operator:'吴二狗',date:'2022-03-19'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //在加载阶段调用方法将store绑定到page对象，返回值挂在this的自定义属性
    //方法的两个参数分别是this和page对象（同时定义属性）
    this.storeBindings = createStoreBindings(this,{
      store,
      fields: ['lineName','lineId','updateArray'],
      actions: ['leftSwitch','rightSwitch','updateStatus'],
    })
  },
    // 左右箭头绑定点击事件：切换线号处理函数
    leftArrow: function(){
      this.leftSwitch()
      this.updateStatus()
      this.randomGet()
    },
    rightArrow: function(){
      this.rightSwitch()
      this.updateStatus()
      this.randomGet()
    },
    //随机分配函数
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
    getStatus:function(){
      wx.request({
        url: 'example.php', //仅为示例，并非真实的接口地址
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          this.setData({
            updateArray : res.data
          })
        }
      })
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