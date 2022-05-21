//创建store实例对象
import { observable, action } from "mobx-miniprogram";

export const store = observable({
  // 数据字段
  activeTabBarIndex: 0,//tabBar切换索引
  // 线号的键值对id：name
  lineArray:[
    {id:0, line:'MD1'},{id:1, line:'MD2'},{id:2, line:'MD3'},{id:3, line:'MD4'},{id:4, line:'MD5'},{id:5, line:'MD6'},{id:6, line:'MD7'},{id:7, line:'Liquid'}
  ],
  // 从后端读取的数据存储在此数组中
  updateArray:[{id:0,line:'MD1',qualityPrf:1,safetyPrf:1,timeGap:1.1,productPrd:1,overdue:200,rework:15,operator:'李二狗',date:'2022-03-19'}],
  lineName: 'MD1',
  lineId: 0,
  condition: 0,
  // 下标测试
  sum: 8,
  // wx接口用户登录信息
  userInfo: '',
  openid: '',
  hasUserInfo: 0,

  // actions函数包裹着一个带参数的更新方法，用来修改store中的数据字段，同时指向一个方法名
  // 区域状态显示内容更新
  updateStatus:action(function(){
      const length = this.lineArray.length
      for(let i = 0; i < length; i++){
        if(this.lineArray[i].id == this.lineId){
          this.lineName = this.lineArray[i].line;
        }
      }
    }),
  
  // 左箭头点击切换线号
  leftSwitch:action(function(){
    if(this.lineId != 0){
      this.lineId -= 1; 
    }
    else{
      this.lineId = 7;
    }
  }),
  // 右箭头点击切换线号
  rightSwitch:action(function(){
    if(this.lineId < 7){
      this.lineId += 1; 
    }
    else{
      this.lineId = 0;
    }
  }),

  updateActiveTabBarIndex:action(function(index){
    this.activeTabBarIndex = index;
  })

});