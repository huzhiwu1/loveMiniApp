// miniprogram/pages/addNote/addNote.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lovers: {},
    userInfo: {},
    date: "",
    emojiImg: "",
    feeling: "",
    wordNum: 0,
    textInput: '',
    selectImgList: [],
    local: '不显示',
    lng: "", lat: "",

    city: "汕头市",
    district: "金平区",
    nation: "中国",
    province: "广东省",
    street: "跃进路",
    street_number: "跃进路28号",
    isShowLocal: true,
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'SLMBZ-MJ26X-U674X-7SZRD-5I7X2-IQFD6'
    });
    const app = getApp()
    const userInfo = app.globalData.userInfo || JSON.parse(wx.getStorageSync("userInfo"))
    const lovers = app.globalData.lovers || JSON.parse(wx.getStorageSync("lovers"))
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let weekDay = date.getDay() + ""
    if (month <= 9) {
      month = "0" + month
    }

    let day = date.getDate()
    if (day <= 9) {
      day = "0" + day
    }
    date = year + "-" + month + "-" + day
    this.setData({
      date,
      lovers,
      userInfo
    })
    this.getArea()
  },
  // 地址
  openMap() {
    console.log("xuanzedizhi")
    //   // 查看是否获取用户授权
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          console.log('授权')
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              wx.chooseLocation({
                // type:'gcj02',
                // isHighAccuracy:true,
                // longitude:that.data.lng||'',
                // latitude:that.data.lat||"",
                success(res) {

                  console.log(res, "res")
                  that.setData({
                    street_number: res.name,
                    lat: res.latitude,
                    lng: res.longitude,
                    city: "",
                    district: "",
                    nation: "",
                    province: "",
                    street: "",
                    address: res.address,
                    isShowLocal: true,
                    // latitude,longitude
                  })
                },
                fail(err) {
                  console.log(er, "err")
                }
              })
            },
            fail(err) {
              // console.log(err,"err")
              // that.openMap()
              that.openConfirm()
            }
          })
        } else {
          wx.chooseLocation({
            // type:'gcj02',
            // isHighAccuracy:true,
            // longitude:that.data.lng||'',
            // latitude:that.data.lat||"",
            success(res) {
              console.log(res, "")
              that.setData({
                street_number: res.name,
                lat: res.latitude,
                lng: res.longitude,
                city: "",
                district: "",
                nation: "",
                province: "",
                street: "",
                address: res.address,
                isShowLocal: true,
                // latitude,longitude
              })
            },
            fail(err) {
              console.log(er, "err")
            }
          })
        }
      }
    })
  },
  // 不显示地址
  closeLocal() {
    this.setData({
      isShowLocal: false
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
  // 再次获取授权
  openConfirm() {
    let that = this;
    wx.showModal({
      content: '亲，没有你的授权，无法使用定位功能哦',
      confirmText: "确认",
      cancelText: "取消",
      success(res) {
        if (res.confirm) {
          wx.openSetting({
            success(res) {
              that.openMap()
            }
          })
        } else {

        }
      }
    })
  },

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
        // console.log('local',res)
        const { city,
          district,
          nation,
          province,
          street,
          street_number } = res.result.address_component
        const { lng, lat } = res.result.location
        that.setData({
          city,
          district,
          nation,
          province,
          street,
          street_number,
          lng, lat,
          address: res.result.address
        })
        // console.log(res,"res")
        // wx.showToast({
        //   icon:"none",
        //   title:res.result.address,
        //   duration:10000
        // })
      },
      fail: function (err) {
        // console.log(err, "err")
        that.setData({
          isShowLocal: false
        })
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
  // 选择时间
  selectTime(e) {
    const { date } = e.detail
    this.setData({
      date
    })
  },
  // 选择心情
  selectEmoji(e) {
    // console.log(e,"E")
    const { emojiImg, feeling } = e.detail
    this.setData({
      emojiImg,
      feeling,
    })

  },
  //删除图片
  discard(e) {
    let index = e.currentTarget.dataset.index
    this.data.selectImgList.splice(index, 1)
    this.setData({
      selectImgList: this.data.selectImgList
    })
  },
  // 预览图片
  previewImg(e) {
    console.log(e)
    let url = e.currentTarget.dataset.url;
    let that = this
    wx.previewImage({
      current: url,
      urls: that.data.selectImgList
    })
  },
  //选择用户
  selectUserPic() {
    wx.chooseImage({
      count: 9 - this.data.selectImgList.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res,"res")
        this.setData({
          selectImgList: this.data.selectImgList.concat(res.tempFilePaths)
        })
      }
    })
  },
  //提交
  handleSubmit() {
    wx.showLoading({
      title:"加载中"
    })
    const {
      textInput,
      date, emojiImg, feeling, lng, lat, city, district, nation, province,
      street,
      street_number,
      address,
      isShowLocal,
      selectImgList,
      userInfo
    } = this.data
    if(!date){
      wx.showToast({
        title:"请填写日期",
        icon:"none"
      })
      return;
    }
    if(!emojiImg){
      wx.showToast({
        title:"请填写心情",
        icon:"none"
      })
      return;
    }
    if(!textInput){
      wx.showToast({
        title:"请填写内容",
        icon:"none"
      })
      return;
    }
    // 发布，
    //1.上传图片
    let imgList = []
    this.uploadImg(selectImgList).then(res => {
      res.forEach(item => {
        imgList.push(item.fileID)
      })
      return imgList
      // imgList=res
      // console.log(imgList)
    }).then(res => {
      // 增加文章
      wx.cloud.callFunction({
        name: "addArticle",
        data: {
          imgList: res,
          textInput,
          date, emojiImg, feeling, lng, lat, city, district, nation, province,
          street,
          street_number,
          address,
          isShowLocal,
          author:userInfo.openid,
          loversId:userInfo.commonid,
          writeTime:JSON.parse(JSON.stringify(new Date()))
        }
      }).then(res=>{
        wx.showToast({
          title:"发布成功",
          icon:"none"
        })
        wx.navigateBack()
      })
      // console.log(res,"res")
    }).catch(err => {
      wx.showToast({
        title: "图片上传失败",
        icon: "none"
      })
    }).finally(res=>{
      wx.hideLoading()
    })

  },
  uploadImg(list) {
    return new Promise((resolve, reject) => {
      let { userInfo, lovers } = this.data
      let url = "" + userInfo.commonid + new Date().getTime()
      let promiseList = []
      list.forEach(item => {
        promiseList.push(wx.cloud.uploadFile({
          cloudPath: url + Math.random() * 10000 + /\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/g.exec(item)[0],
          filePath: item
        }))
      })
      // console.log(promiseList,"listllist")
      Promise.all(promiseList).then(res => {
        // console.log(res,"list")
        resolve(res)
      }).catch(err => reject(err))
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