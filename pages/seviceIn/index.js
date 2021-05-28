// pages/seviceIn/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  handleSubmit() {},
  scan() {
    wx.scanCode({
      success: res => {
        console.log(res);
      },
      fail: () => {
        wx.showToast({
          title: "扫码失败，请重试",
          icon: "none"
        });
      }
    });
  }
});
