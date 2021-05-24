// pages/role/roleType/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        image: "/images/index/user.png",
        type: "代理",
        id: 1
      },
      // {
      //   icon: "../../../images/1.png",
      //   type: "点位管理员",
      //   id: 2
      // },
      {
        image: "/images/index/user.png",
        type: "运维",
        id: 3
      },
      {
        image: "/images/index/user.png",
        type: "补货员",
        id: 4
      }
    ]
  },
  goPage(e) {
    const { id, type } = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/role/roleList/index?id=${id}&type=${type}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
