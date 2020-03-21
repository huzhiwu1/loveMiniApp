// components/markDayPannel/markDayPannel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: '/images/cake.png'
    },
    // name:{
    //   type:String,
    //   value:"在一起"
    // },
    // isDownTime:{
    //   type:Boolean,
    //   value:false
    // },
    // day:{
    //   type:String,
    //   // value:'123'
    // }
    markDay: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        console.log(newVal)
      }
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
    gotoEditMarkDay() {
      wx.navigateTo({
        url: "/pages/editMarkDay/editMarkDay?_id=" + this.data.markDay._id
      })
    },
  }
})
