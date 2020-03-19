// components/heart/heart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    missyou(){
      let that = this
      this.animationData = wx.createAnimation({
        duration:500,
        timingFunction:"ease-in-out"
      })
      this.animationData.scale(4,4).step().scale(1,1).step()
      this.setData({
        animationData:this.animationData.export()
      },()=>{
        setTimeout(function(){
          that.triggerEvent("missyou")
        },1000)
      })
    }
  }
})
