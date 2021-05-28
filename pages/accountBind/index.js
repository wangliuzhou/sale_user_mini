// pages/accountBind/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    card: "",
    binkName: ""
  },

  onLoad: function(options) {},
  inputChange(e) {
    const { value } = e.detail;
    const { type } = e.currentTarget.dataset;
    this.setData({
      [type]: value.trim()
    });
  },
  handleSubmit() {
    const { name, card, binkName } = this.data;
    if (!name || !card || !binkName) {
      wx.showToast({
        title: "请输入完整信息",
        icon: "none"
      });
      return;
    }
  }
});
