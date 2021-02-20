
var app = getApp()
Page({
  data: {
    specification: '练习说明：\n 开始练习后，点击数字及运算符得出结果；前几步计算出的结果同样可以点击进行下一步运算。将给出的牌数用尽并得出6/12/24即为完成。',
    userInfo: {},
    gameArr: [{ id:0, name: '6点', value: '6点' }, { id:1, name: '12点', value: '12点', checked: 'true' }, { id:2, name: '24点', value: '24点' }],
    game: '12点',
    gradeArr: [{ id: 0, name: '初级', value: '初级', checked: 'true' }, { id: 1, name: '中级', value: '中级' }, { id: 2, name: '高级', value: '高级' }, { id: 3, name: '随机', value: '随机' }],
    grade:'初级'
  },
   onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
    wx.getStorage({
        key: 'lastScore',
        success: function(res) {
            that.setData({
              lastScore:res.data
            })
        } 
    })
  },
   gameChange: function (e) {
     this.setData({
       game: e.detail.value
     })
   },
   radioChange: function(e) {
       this.setData({
         grade:e.detail.value
       })
    },
   //计算页
    gotoCount() {     
        wx.navigateTo({ url: '../count/count?game='+this.data.game+'&grade='+this.data.grade+'&user='+this.data.userInfo.nickName});
    }
    
 
})
