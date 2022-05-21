// pages/mine/mine.js
//导入 绑定方法 和 store实例对象
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseAddUser: 0,
    nickName: "",
    userDeatils: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['userInfo','openid','hasUserInfo'],
      actions:[]
    })
    // this.getOpenid()//页面加载时提前自动获取用户openid
  },

  //获取openid：跳转到页面时即自动获取
  getOpenid(){
    wx.cloud.callFunction({
      name: 'login',
    })
    .then(res => {
      this.setData({
        openid: res.result.openid,
        canIUseAddUser: res.result.countResult
      })
      console.log("获取openid",)
    })
    .catch(console.error)
  },

  // 数据库内添加新用户
  addUserInfo(){
    wx.cloud.callFunction({
      name: 'addUser',
      data: {
        openid: this.data.openid,
        identity: "",
        name: "",
        sex: "",
        birthday: "",
        joinDate: "",
        createDate: Date.now(),
        phone: ""
      }
    })
    .then(res => {
      console.log("成功添加新用户信息")
    })
  },
  // 获取用户详细信息
  getUserDeatils(){
    wx.cloud.callFunction({
      name: 'userInfo',
      data: {
        openid: this.data.openid
      }
    })
    .then(res => {
      this.setData({
        userDeatils: res.result.info
      })
      console.log("成功获取用户详情")
    })
  },

  //点击按钮授权登录l：先授权用户信息，再判断是否为新用户，非用户直接显示详情
  loginBtn() {
    // 调用api：wx.getUserProfile获取头像和昵称
    let that = this
    wx.getUserProfile({
      desc: '完善用户个人资料',
      success: (res) => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: 1,
          nickName: res.userInfo.nickName
        })
        // 存入缓存
        wx.setStorageSync('key', this.data.hasUserInfo)
        console.log("获取授权信息")
        this.getOpenid()//再次检查登录,防止用户频繁切换
        // 查询数据库内是否存在此用户openid
        if(that.data.canIUseAddUser == 0){
          this.addUserInfo() //调用添加新用户云函数
        }
        else{
          console.log("非新用户")
          this.getUserDeatils()//调用用户详情云函数
        }
      },
      fail(res) {
        console.log('授权失败', res)
      }
    })
  },
  //退出登录logOut
  logOut() {
    this.setData({
      userInfo:'',
      hasUserInfo: 0
    })
    // 存入缓存
    wx.setStorageSync('key', this.data.hasUserInfo)
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