// app.js
App({
  // 小程序启动执行入口
  onLaunch(){
    console.log("starting...")
    // 云开发环境初始化
    wx.cloud.init({
      env: 'dhu-6gxr4ab9e15f555e',
      traceUser: true
    })
  }
})
