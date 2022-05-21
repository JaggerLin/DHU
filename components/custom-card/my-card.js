// components/custom-card/my-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time:{
      type: String,
      value: '2022-03-08 19:00'
    },
    location:{
      type: String,
      value: '火星包装神仙打架区'
    },
    task:{
      type: String,
      value: '安全小伤沟通'
    },
    tag:{
      type: String,
      value: '详情查看'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 将
    addAffair(){
      this.setData({time: this.properties.time})
    },
    // 用于父节点的自定义事件
    seeDetailsHandler: function () {
      let myEventDetail = {} // detail对象，提供给事件监听函数
      let myEventOption = {} // 触发事件的选项
      this.triggerEvent('see', myEventDetail, myEventOption)
    }
  }
})
