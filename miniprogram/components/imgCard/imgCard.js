// components/imgCard/imgCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgImg:{
      type:String,
      value:'http://img3.imgtn.bdimg.com/it/u=263595599,2238086656&fm=26&gp=0.jpg'
    },
    noteNum:{
      type:String,
      value:0
    },
    lovers:{
      type:Object,
      value:{}
    },
    userInfo:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    // attached(){
    //   const app = getApp()
    //   this.setData({
    //     lovers:app.globalData.lovers||JSON.parse(wx.getStorageSync("lovers")),
    //     userInfo:app.globalData.userInfo||JSON.parse(wx.getStorageSync("userInfo"))
    //   })
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
