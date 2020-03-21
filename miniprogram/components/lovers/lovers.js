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
    lover:{
      type:Object,
      value:{},
      observer(newVal,oldVal){
        if(!newVal)return 
        console.log(newVal,"val")
        const _id = newVal.starttime
        wx.cloud.callFunction({
          name:"getOneMarkDay",
          data:{
            _id
          }
        }).then(res=>{
          const data = res.result.data[0]
          this.setData({
            beginTime:data.beginTime
          })
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    beginTime:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
