// components/actionButton/actionButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:{
      type:Number,
      value:0
    },
    type:{
      type:String,
      value:'date'
    },
    title:{
      type:String,
      value:'题目'
    },
    imgUrl:{
      type:String,
      value:'/images/question.png'
    }
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
    startAnimation(){
      console.log("dong")
      let animation = wx.createAnimation({
        duration:200,
        timingFunction:'ease-in-out'
      })
      animation.scale(1.2,1.2).step().scale(1,1).step()
      this.setData({
        animationData:animation.export()
      })
    }
  }
})
