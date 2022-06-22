//创建store实例对象
import { observable, action } from "mobx-miniprogram";

export const store = observable({
  // 数据字段
  activeTabBarIndex: 0,//tabBar切换索引
  
  condition: 0,
  // 下标测试
  sum: 8,
  // wx接口用户登录信息
  userInfo: '',
  openid: '',
  hasUserInfo: 0,

  // actions函数包裹着一个带参数的更新方法，用来修改store中的数据字段，同时指向一个方法名
  

  updateActiveTabBarIndex:action(function(index){
    this.activeTabBarIndex = index;
  })

});