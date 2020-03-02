// components/emjoiPicker/emojiPicker.js
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
    animationData:{},
    isShow:true,
  },
  lifetimes:{
    attached(){
      let animationData = wx.createAnimation({
        duration:500,
        timingFunction:'ease-in-out'
      })
      this.animation = animationData
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showEmoji(){
      if(!this.data.isShow){
        this.animation.translateX(0).opacity(1).step()
        this.setData({
          isShow:true,
          animationData:this.animation.export()
        })
      }
      
    },
    selectEmoji(){
      console.log(this.data.isShow)
      if(this.data.isShow){
        this.animation.translateX(-100).opacity(0).step()
        this.setData({
          isShow:false,
          animationData:this.animation.export()
        })
      }
      
    }

  }
})
