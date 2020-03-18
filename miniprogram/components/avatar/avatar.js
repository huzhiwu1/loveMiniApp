// components/avatar/avatar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headImg:{
      type:String,
      value:'/images/defaultHead.jpeg',
      observer:function(newVal,oldVal){
        if(!newVal){
          this.setData({
            headImg:"/images/defaultHead.jpeg"
          })
        }
      }
    },
    gender:{
      type:Number,//1是男孩
      value:1,
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

  }
})
