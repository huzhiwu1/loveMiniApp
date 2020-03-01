// components/timeLine/timeLine.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    month:{
      type:String,
      value:'02月'
    },
    day:{
      type:String,
      value:'19'
    },
    
  },
  options:{
    multipleSlots:true
  },

  /**
   * 组件的初始数据
   */
  data: {
    emoji:escape("😃")
  },
  lifetimes:{
    attached(){
      console.log(this.data.emoji,"emoji")
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
