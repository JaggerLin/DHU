// packageB/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    leftColor: 'black',
    rightColor: '#a0a0a0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
// 点击菜单，切换线变换位置，文字变色
  tapLeft: function () {
    this.setData({
      x: 0,
      leftColor: 'black',
      rightColor: '#a0a0a0'
    })
  },
  tapRight: function () {
    this.setData({
      x: 163,
      leftColor: '#a0a0a0',
      rightColor: 'black'
    })
  },
  // 查看当前事项详细
  getCurrentDetail: function(){
    wx.navigateTo({
      url: '/packageB/pages/more/more',
      events: {
        ec: e => console.log(e)
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