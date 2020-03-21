// components/timePicker/timePicker.js
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
    date:'2020-02-02',
    endTime:'2020-02-02',
    year:'',
    day:'',
    month:'',
    weekDay:'',
  },
  lifetimes:{
    attached(){
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let weekDay = date.getDay()+""
      if(month<=9){
        month = "0"+month
      }
     
      let day = date.getDate()
      if(day<=9){
        day="0"+day
      }
      date = year+"-"+month+"-"+day
      this.setData({
        date,
        month,
        day,
        weekDay,
        year,
        endTime:date
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange(event){
      let date = event.detail.value;
      let weekDay  = new Date(date).getDay()+""
      
      let year = date.split('-')[0]
      let month = date.split('-')[1]
      let day = date.split('-')[2]
      this.setData({
        year,
        month,
        day,
        weekDay,
        date
      },()=>{
        this.triggerEvent("selectTime",{
          date
        })
      })
    }
  }
})
