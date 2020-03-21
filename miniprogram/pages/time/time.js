// miniprogram/pages/time /time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight:0,
    menuWidth:0,
    animationData:{},
    lovers:{},
    userInfo:{},
    articleNum:0,
    articleList:[],
    pagination:{
      total:0,
      current:1,
      pageSize:10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.globalData= getApp()
    let animation= wx.createAnimation({
      duration:500,
      timingFunction:'ease-in-out'
    })
    this.animation=animation
   
  },

  addNote(){
    console.log('增加文章')
   
    this.animation.rotateZ(90).step().rotateZ(-90).step()
    this.setData({
      animationData:this.animation.export()
    },()=>{
      wx.navigateTo({
        url:'/pages/addNote/addNote'
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    this.setData({
      
      navigationBarHeight:this.globalData.navigationBarHeight,
      menuWidth:this.globalData.menuWidth,
      userInfo:this.globalData.userInfo||JSON.parse(wx.getStorageSync("userInfo")||"{}"),
      lovers:this.globalData.lovers||JSON.parse(wx.getStorageSync("lovers")||"{}")
    },()=>{
      if(that.data.lovers._id){
        wx.cloud.callFunction({
          name:"getArticleNum",
          data:{
            loversId:that.data.userInfo.commonid
          }
        }).then(res=>{
          const total = res.result.total
          // console.log(res,"res")
          that.setData({
            articleNum:total
          })

        })
        // 获取文章
        wx.cloud.callFunction({
          name:"getArticle",
          data:{
            loversId:that.data.userInfo.commonid,
            pageNum:that.data.pagination.current,
            pageSize:that.data.pagination.pageSize
          }
        }).then(res=>{
          const data = res.result.data;
          that.setData({
            articleList:data
          })
        })
      }
    

      
      
    })
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})