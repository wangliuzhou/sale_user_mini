// pages/changePsw/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    p1: "",
    p2: "",
    p3: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  handleSubmit() {
    const { p1, p2, p3 } = this.data;
    if (!p1 || !p2 || !p3) {
      wx.showToast({
        title: "请填写完整信息",
        icon: "none"
      });
      return;
    }
    if (p2 !== p3) {
      wx.showToast({
        title: "新密码不一致，请重新填写",
        icon: "none"
      });
      this.setData({
        p2: "",
        p3: ""
      });
      return;
    }
  },
  handleInput(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      [type]: e.detail.value.trim()
    });
  }
});
