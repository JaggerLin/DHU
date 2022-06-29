// packageC/pages/image/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countNum: 3, //可选图片数量
    sourceType: ['camera','album'],
    imageList: [], // 上传图片集合
    fileIDs: [],  //上传云存储后的返回值
  	form: {          // 用于其他功能提交的参数
  		ossUrl: []
  	}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  // 点击上传调用菜单栏事件
  callMenu: function(){
    let that = this
    wx.showActionSheet({
      itemList: ['拍照','从相册选择'],
      itemColor:'#0000a0',
      success (res) {
        if(!res.cancel){
          // tapIndex代表点击对应itemList后返回的数组编号
          that.choosePhoto(res.tapIndex)
        }
      },
      fail (res) {
        console.log('调用菜单失败')
      }
    })
  },
  // 打开手机相册
  choosePhoto: function(tapIndex){
    let that = this
    wx.chooseImage({
      //一次可以选多少文件
      count: that.data.countNum,
      //所选类型为图片还是视频或多选
      mediaType: ['image','video'],
      //所选图片的尺寸：原图或压缩
      sizeType: ['original','compressed'],
      //所选素材来源相册或相机拍照
      sourceType: [that.data.sourceType[tapIndex]],
      //拍摄视频最长拍摄时间，单位秒
      maxDuration: 30,
      //仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
      camera: 'back',
      success(res){
        const tempFilePath = res.tempFilePaths
        that.setData({
          imageList:tempFilePath
        })
        wx.showToast({
          title: '图片导入成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 上传图片到云存储
  uploadImgToCloud: function () {
    wx.showLoading({
      title: '上传中',
    })
    let that = this
    let tempFilePath = that.data.imageList
    // 定义存放到云服务器的文件夹及图片名字
    const cloudPath = 'imgToPdf-img/' + parseInt(new Date().getTime() / 1000) + '.png';
    // 图片路径为数组，需要循环逐个取出上，小程序上传到服务器一次只能一张图片
    tempFilePath.forEach((item, index) => {
      wx.cloud.uploadFile({
        cloudPath: cloudPath, //
        filePath: item, // 文件路径
      })
      .then(res => {
        wx.hideLoading()
        that.cloudToPDF()
      })
      .catch(error => {
        console.log(error.errMsg)
      })
    })
  },
// 上传成功调用imgToPdf云函数
  cloudToPDF: function () {
    wx.showLoading({
      title: '转换中',
    })
    wx.cloud.callFunction({
      name: 'imgToPDF',
      data: {
        width: 10,
        height: 10,
        fileID_img: res.fileID
      }
    })
    .then(res => {
      console.log(res)
      wx.hideLoading()
      that.setData({
        fileID_pdf: res.result.data.fileID,
        https_pdf: res.result.data.pdf
      })
      wx.showToast({
        title: '生成成功！',
        icon: 'none'
      })
    })
  },
  // 删除图片
  removeChooseImage(e) {
    let imgs = this.data.imageList;
    let {index} = e.currentTarget.dataset;
    imgs.splice(index, 1);
    this.setData({
      'form.ossUrl': imgs,
      imageList: imgs
    })
  },
  // 预览图片
  previewBigImage(e) {
    let imgs = this.data.imageList;
    let {index} = e.currentTarget.dataset;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})