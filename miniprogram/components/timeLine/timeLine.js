// components/timeLine/timeLine.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // month:{
    //   type:String,
    //   value:'02',
    //   observer(newVal){
    //     console.log(typeof newVal)
    //     console.log(newVal)
    //     return newVal+"月"
    //   }
    // },
    // day:{
    //   type:String,
    //   value:'19'
    // },
    dateNum:{
      type:String,
      value:"",
      observer(newVal){
        console.log(newVal,"vale")
        this.setData({
          month:newVal.substring(5,7)+"月",
          day:newVal.substring(8)
        })
      }
    }
    
  },
  options:{
    multipleSlots:true
  },

  /**
   * 组件的初始数据
   */
  data: {
    month:"",
    day:"",
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
