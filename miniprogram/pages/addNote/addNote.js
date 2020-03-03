// miniprogram/pages/addNote/addNote.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordNum: 0,
    textInput: '',
    selectImgList: [],
    local: '不显示',
    lng:"",lat:"",

    city: "汕头市",
    district: "金平区",
    nation: "中国",
    province: "广东省",
    street: "跃进路",
    street_number: "跃进路28号",
    isShowLocal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'SLMBZ-MJ26X-U674X-7SZRD-5I7X2-IQFD6'
    });


  },
  // 打开地址
  openMap(){

  },
  // 不显示地址
  closeLocal(){
    this.setData({
      isShowLocal:false
    })
  },
  // getLocal(){
  //   // 查看是否获取用户授权
  //   let that = this;
  //   wx.getSetting({
  //     success(res){
  //       if(!res.authSetting['scope.userLocation']){
  //         wx.authorize({
  //           scope:'scope.userLocation',
  //           success(res){
  //             wx.getLocation({
  //               type:'gcj02',
  //               isHighAccuracy:true,
  //               success(res){
  //                 console.log(res,"gcj02")
  //                 const latitude = res.latitude
  //                 const longitude = res.longitude;
  //                 that.setData({
  //                   latitude,longitude
  //                 },()=>{
  //                   that.getArea()
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  getArea() {
    // console.log("getE",qqmapsdk)
    let that = this
    qqmapsdk.reverseGeocoder({
      sig: 'EJYHNuE5pyhXFiTgFMJznHocr6ZBb22w',
      // location:{
      //   latitude:this.data.latitude,
      //   longitude:this.data.longitude
      // },
      success: function (res) {
        const { city,
          district,
          nation,
          province,
          street,
          street_number } = res.result.address_component
          const {lng,lat} = res.result.location
        that.setData({
          city,
          district,
          nation,
          province,
          street,
          street_number,
          lng,lat
        })
        // console.log(res,"res")
        // wx.showToast({
        //   icon:"none",
        //   title:res.result.address,
        //   duration:10000
        // })
      },
      fail: function (err) {
        console.log(err, "err")
      }
    })

  },
  textInput(event) {
    console.log(event)
    let value = event.detail.value
    this.setData({
      textInput: value,
      wordNum: value.length
    })
  },
  //选择用户
  selectUserPic() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res,"res")
        this.setData({
          selectImgList: res.tempFilePaths
        })
      }
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
    // this.getLocal()
    this.getArea()
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