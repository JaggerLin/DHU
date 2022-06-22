// components/custom-search/my-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchDefault: {
      type: String,
      value: 'Search for something'
    },
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
    // 自定义的点击事件用于父节点,open为自定义名
    searchBoxHandler: function(){
      let myEventDetail = {} // detail对象，提供给事件监听函数
      let myEventOption = {} // 触发事件的选项
      this.triggerEvent('open', myEventDetail, myEventOption)
    }
  }
})
