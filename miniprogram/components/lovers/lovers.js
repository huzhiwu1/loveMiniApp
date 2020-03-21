// components/lovers/lovers.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type:Object,
      value:{},
      // observer:function(newVal,oldVal){
      //   console.log(newVal,"newval")
      //   if(newVal.commonid){

      //   }
      // }
    },
    articleNum:{
      type:Number,
      value:0
    },
    lover:{
      type:Object,
      value:{},
      observer(newVal,oldVal){
        // let that = this
        // console.log(that.data,"Data")
        // if(!newVal||!newVal.starttime){return;} 
        // console.log(newVal,"val")
        // const _id = newVal.starttime
        // wx.cloud.callFunction({
        //   name:"getOneMarkDay",
        //   data:{
        //     _id
        //   }
        // }).then(res=>{
        //   console.log(res,"Res")
        //   const data = res.result.data[0]
        //   console.log(data.beginTime,"be")
        //   const beginTime= data.beginTime
        //   that.setData({
        //     beginTime,
        //   },()=>{
        //     console.log(that.data.beginTime,"begintime")
        //   })
        // })
      }
    },
    beginTime:{
      type:String,
      value:""
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
