// scheme list  js
import { post } from "../../../utils/request";
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    page: 1,
    total: 0,
    list: [
      // {
      //   id: "1",
      //   uniacid: "1",
      //   sell_agentid: "1",
      //   thumb:
      //     "http://sell.hzybs.com/attachment/images/1/2020/05/mXftqqjiQI9jHq8HLihSetH9ThzjXh.jpg",
      //   name: "测试方案"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },
  search() {
    this.data.list = [];
    this.data.page = 1;
    this.getList();
  },
  async getList() {
    const { keyword, page, list } = this.data;
    wx.showLoading({
      title: "加载中..."
    });
    const info = await post({
      r: "manage.scheme.get_list",
      keyword,
      page
    });
    wx.hideLoading();
    this.setData({
      list: list.concat(info.list),
      total: info.total
    });
  },
  editScheme(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/scheme/schemeDetail/index?id=" + id
    });
  },
  addScheme() {
    wx.navigateTo({
      url: "/pages/scheme/schemeDetail/index"
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom");
    const { page, total, psize } = this.data;
    if (page < total / psize) {
      this.setData({ page: this.data.page + 1 });
      this.getList();
    }
  },
  handleInput(e) {
    this.setData({ keyword: e.detail.value.trim() });
  }
});
