// index.js
// 获取应用实例
const app = getApp()
let pictures = []
const heroslist = require('./wzzl.js')
let heros = []
let nowtype = 'qq'
let nowname
let msg = {
  title: '程序Bug',
  msg: '重新点击一次即可'
}
function getimgs() {
  heros = heroslist.getheros()
  for (let i of heros) {
    pictures.push(
      {
        url: i.iconUrl,
        name: i.cname
      }
    )
  }
  console.log('获取图片和昵称：', pictures)
}
// qq：安卓QQ区
// wx：安卓微信区
// ios_qq：苹果QQ区
// ios_wx：苹果微信区
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    pictures: '',
    services: [{
      zh: '安卓QQ区',
      type: 'qq'
    }, {
      zh: '安卓微信区',
      type: 'wx'
    }, {
      zh: '苹果QQ区',
      type: 'ios_qq'
    }, {
      zh: '苹果微信区',
      type: 'ios_wx'
    }
    ]
  },
  //导航栏
  tabSelect(e) {
    let id = e.currentTarget.dataset.id
    let index = id ? id : id == 0 ? 0 : e.detail.current
    // console.log('当前下标：',index)
    nowtype = this.data.services[index].type
    // console.log('当前服务器',nowtype)
    this.setData({
      TabCur: index,
      scrollLeft: (index - 1) * 60
    })
  },
  //搜索
  searchIcon(e) {
    let key = e.detail.value.toLowerCase();
    console.log('输入数据处理：', key)
    let list = this.data.pictures;
    for (let i = 0; i < list.length; i++) {
      let a = key;
      let b = list[i].name.toLowerCase();
      var patt = new RegExp(a);
      // console.log("搜索结果:", i, b, patt.test(b))
      list[i].isShow = patt.test(b)
    }
    this.setData({
      pictures: list,
      tops: 0
    })
  },
  //手动获取
  getpic() {
    var that = this
    console.log('初始化')
    pictures = heroslist.getheros()
    setTimeout(() => {
      console.log('开始')
      that.setData({
        pictures: pictures
      })
      console.log('初始化结束')
    }, 500);
  },
  //开启弹窗，显示英雄数据
  showModal(e) {
    nowname = e.currentTarget.dataset.name
    msg = heroslist.getzl(nowname, nowtype)
    var that = this
    setTimeout(() => {
      that.setData({
        modalName: e.currentTarget.dataset.target,
        modalmsg: msg
      })
    }, 400);
  },
  //关闭弹窗
  hideModal(e) {
    if(e.currentTarget.dataset.type==2){
      let clip_data=msg.title+'\n'+msg.msg
      wx.setClipboardData({
        data: clip_data?clip_data:'请重试',
        success (res) {
          wx.getClipboardData({
            success (res) {
              // console.log(res.data) // data
              wx.showToast({
                title: '已复制到粘贴板',
                icon:"none"
              })
            }
          })
        }
      })
    }
    this.setData({
      modalName: null
    })
  },
  // 事件处理函数
  onLoad() {
    var that = this
    console.log('初始化')
    pictures = heroslist.getheros()
    setTimeout(() => {
      // 获取屏幕高度
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            clientHeight: res.windowHeight
          });
          // console.log('高度：', res.windowHeight)
        }
      })
      console.log('开始')
      that.setData({
        pictures: pictures
      })
      console.log('初始化结束')
    }, 1000);
  },
  //分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {      // 来自页面内转发按钮
      console.log(res.target)
    } return {
      title: '战力查询系统',
      path: '/pages/index/index',
      success: function (res) {        // 转发成功
      },
      fail: function (res) {        // 转发失败
      }
    }
  },
  onShareTimeline: function (res) {
    if (res.from === 'button') {      // 来自页面内转发按钮
      console.log(res.target)
    } return {
      title: '战力查询系统',
      path: '/pages/index/index',
      success: function (res) {        // 转发成功
      },
      fail: function (res) {        // 转发失败
      }
    }
  }
})
