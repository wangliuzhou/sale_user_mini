// pages/questionList/index.js
import { post } from "../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: { list: [] },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },
  async getList() {
    let { list } = await post({ r: "topic.get_list", page: 1 });
    this.setData({ list });
  },
  goPage(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/questionDetail/index?id=" + id
    });
  }
});
