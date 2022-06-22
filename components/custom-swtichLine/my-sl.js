// components/custom-swtichLine/my-sl.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";
Component({
   //Mobx
   behaviors: [storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  //store绑定到自定义组件中
  storeBindings: {
    store,
    fields: {

    },
    
    actions: {

    },
  },

// 监听lineId变化；当li发生变化时，调用get请求获取数据，并更新数据
  observers:{
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
        
  }
})
