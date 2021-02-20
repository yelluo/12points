var app = getApp()
Page({
  data: {    
    userInfo: {}
   
  },
  onLoad: function (options) {   
      var that = this;      
      this.setData({
        game:options.game,
        userInfo:options.user,
        totalscore:options.total
      })  
      wx.setStorage({
        key:"lastScore",
        data:options.total
       }) 
  },
  reStart(){
      wx.navigateTo({ url: '../index/index'});
  }
})
