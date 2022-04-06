let nameurl = 'https://www.jk.cxkf.cc/api_herolist.php'  //获取英雄列表
let zlurl='https://jk.cxkf.cc/api_select.php'   //获取战力信息
let heros = [] 
function getheros() {
    let pictures=[]
    wx.showLoading({
      title: '获取中',
    })    
    wx.request({
        url: nameurl,
        dataType: 'json',
        method: "GET",
        success(res) { 
            wx.hideLoading() 
            res = res.data
            if(res.code==200){
                heros = res.data
                for (let i of heros) {
                    pictures.push(
                      {
                        url: i.iconUrl,
                        name: i.cname,
                        isShow:true
                      }
                    )
                  }
                console.log('获取图片和昵称：', pictures)
            }
        }
    })
    return pictures
}
function getzl(hero,type){
    let msg={}
    wx.showLoading({
      title: '获取数据中',
    })    
    wx.request({
      url: `${zlurl}?hero=${hero}&type=${type}`,
      dataType: 'json',
        method: "GET",
        success(res) { 
          wx.hideLoading() 
            res = res.data.data 
            // console.log('全部数据:',res)
            msg['title']=res.name+'['+res.platform+']'
            msg['msg']='最低县标：'+res.area+'('+res.areaPower+')'+'\n最低市标：'+res.city+'('+res.cityPower+')'+'\n最低省标：'+res.province+'('+res.provincePower+')'+'\n更新时间：'+res.updatetime
            console.log('整理的数据:',msg)
        }
    })
    return msg
}
module.exports={
    getheros:getheros,
    getzl:getzl
}