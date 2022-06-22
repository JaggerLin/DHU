// packageB/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    leftColor: 'black',
    rightColor: '#a0a0a0',
    eventArray: [],
    eventID: '',
    infoArray: [],
    activityArray: [],
    selectSign: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllAffair()
  },
/* 点击菜单，切换线变换位置，文字变色 */
  tapLeft: function () {
    this.setData({
      x: 0,
      leftColor: 'black',
      rightColor: '#a0a0a0',
      selectSign: 1
    })
    this.getAllAffair()
  },
  tapRight: function () {
    this.setData({
      x: 163,
      leftColor: '#a0a0a0',
      rightColor: 'black',
      selectSign: 0
    })
    this.getAllActivity()
  },
  /* 获取所有事件 */
  getAllAffair(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "allAffair",
      data: {
        sign: this.data.selectSign
      }
    })
    .then(res => {
      this.setData({
        eventArray: res.result.affair
      })
      wx.hideLoading()
      console.log("所有事件获取成功")
    })
    .catch(console.error)
  },
  /* 获取待完成事件 */
  getDoing(){
    // 选项标识
    this.setData({
      selectSign: 2
    })
   this.getAllAffair()
  },
  /* 获取已完成事件 */
  getDone(){
    // 选项标识
    this.setData({
      selectSign: 3
    })
    this.getAllAffair()
  },
  /* 获取已取消事件 */
  getCanceled(){
    // 选项标识
    this.setData({
      selectSign: 4
    })
    this.getAllAffair()
  },
  /* 获取所有活动 */
  getAllActivity(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "allActivity"
    })
    .then(res => {
      this.setData({
        activityArray: res.result.activity
      })
      wx.hideLoading()
      console.log("所有活动获取成功")
    })
    .catch(console.error)
  },
  /* 点击按钮查询更多信息 */ 
  getMoreInfo: function(e){
    // 获取点击事件id
    this.setData({
      eventID: e.currentTarget.id
    })
    // 加载提示
    wx.showLoading({
      title: '加载中',
    })
    // 传给云函数进行查询对应的更多信息
    wx.cloud.callFunction({
      name: "moreInfo",
      data: {
        id: this.data.eventID
      }
    })
    .then(res => {
      this.setData({
        infoArray: res.result.info
      })
      console.log(e.currentTarget.id)
      // 将查询结果存储在缓存中 给more界面调用
      wx.setStorageSync('moreInfo', this.data.infoArray)
      // 查询完成后准跳转more
      wx.hideLoading()
      wx.navigateTo({
        url: '/packageB/pages/more/more',
        events: {
          ec: e => console.log(e)
        }
      })
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