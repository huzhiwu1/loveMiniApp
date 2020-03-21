// components/howLong/howLong.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    howLong:{
      type:[Number,String],
      value:0,
      observer(newVal,oldVal){
        if(!newVal.starttime) return;
        wx.cloud.callFunction({
          name:"getOneMarkDay",
          data:{
            _id:newVal.starttime
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
