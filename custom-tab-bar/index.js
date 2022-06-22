// custom-tab-bar/index.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../store/store";

Component({
  //Mobx
  behaviors: [storeBindingsBehavior],

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的样式隔离选项
    */
   options: {
    styleIsolation: 'shared',
  },

  /**
   * 组件的初始数据
   */
  data: {
    // active:0,//此数据为使用store前的，active的索引数据值
    "list": [
      {
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "pagePath": "/pages/status/status",
        "text": "生产",
        "iconPath": "/images/tabs/KPI.png",
        "selectedIconPath": "/images/tabs/KPI-active.png"
      },
      {
        "pagePath": "/pages/task/task",
        "text": "绩效",
        "iconPath": "/images/tabs/status.png",
        "selectedIconPath": "/images/tabs/status-active.png",
        info:2
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "/images/tabs/mine.png",
        "selectedIconPath": "/images/tabs/mine-active.png"
      }
    ]
  },

  //store绑定到自定义组件中
  storeBindings: {
    store,
    fields: {
      sum: 'sum',
      active:'activeTabBarIndex'
    },
    
    actions: {
      updateActive:'updateActiveTabBarIndex'
    },
  },

  //利用数据监听器监听字段sum值，发生变化后将监听值传给参数newVal
  //将监听新值赋给list数组的第三个成员的info
  observers:{
    'sum':function(newVal){
      this.setData({
        'list[2].info': newVal
      })
      // console.log(newVal);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // bind:change触发此方法，event.detail 的值为当前选中项的索引
      // this.setData({ active: event.detail });//此值为使用store前，更新索引方法
      this.updateActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})
