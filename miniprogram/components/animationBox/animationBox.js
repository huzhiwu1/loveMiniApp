// components/animationBox/animationBox.js
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
  lifetimes:{
    attached(){
      this.animation = wx.createAnimation({
        duration:500,
        timingFunction:'ease-in-out'
      })
    }
  },
  methods: {
    handleTap(){
      console.log('dianji')
      this.animation.scale(1.3,1.3).step().scale(1,1).step()
      
      this.setData({
        animationData:this.animation.export()
      },()=>{
        setTimeout(()=>{
          this.triggerEvent('click')
        },500)
        
      })
    }
  }
})
