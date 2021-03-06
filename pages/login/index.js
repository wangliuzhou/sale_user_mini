import { post } from "../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mobile: "15388047731",
    password: "15388047731"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.autoLogin();
  },
  autoLogin() {
    const token = wx.getStorageSync("token");
    if (token) {
      wx.switchTab({
        url: "/pages/index/index"
      });
    }
  },
  async formSubmit(e) {
    const { mobile, password } = e.detail.value;
    console.log(e.detail.value);
    const { token, member } = await post({
      r: "account.login",
      mobile,
      pwd: password
    });
    wx.setStorageSync("token", token);
    wx.setStorageSync("member", member);
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
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
