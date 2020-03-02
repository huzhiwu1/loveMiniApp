// components/imgContent/imgContent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgList:{
      type:Array,
      value:[
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648333&di=52e02b4583f4f7a941976573662b87cc&imgtype=0&src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fstart%2F3%2F1383099952620.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648332&di=921be8b9b49c4a752ca5f943cd366eff&imgtype=0&src=http%3A%2F%2Fpic43.nipic.com%2F20140708%2F18926625_235422353831_2.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648332&di=91fbe327b56d45db2867051ae9ad08f9&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140822%2F7870066_021822179000_2.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648332&di=83ca0294e9b9d64f4e473d7db19fc1a6&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-3b7b458be06665e5ee0adb8c160d6fb7_hd.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648331&di=a11a58e7971bdda3268fb6f405067a89&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181002%2F23%2F1538493401-QoJhDTVjel.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648330&di=ebb0dd1254128f7bb68ccd8594226cf8&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0322%2F6b4fe1ac2ebb171d91d88fce9d5b6b3f.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648329&di=97f959c7c6579a239353149bd0312048&imgtype=0&src=http%3A%2F%2Fpic61.nipic.com%2Ffile%2F20150306%2F2906837_195004397624_2.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648328&di=f98619960e579b488061a5271bdfdf3e&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190903%2F21%2F1567517786-nTUriVtzul.jpg",
       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583047648328&di=3755ecef92a9da3d352d16b9a814e03d&imgtype=0&src=http%3A%2F%2Fpic26.nipic.com%2F20121218%2F6361896_003829690127_2.jpg"
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImg(event){
      let url = event.currentTarget.dataset.url
      // console.log(event)
      wx.previewImage({
        current:url,
        urls:this.properties.imgList
      })
    }
  }
})
