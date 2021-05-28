// pages/scheme/goodsList/index.js
import { post } from "../../../utils/request";
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: "",
    pcate: "",
    list: [],
    keyword: ""
  },
  onLoad: function(options) {
    this.setData({ index: options.index, pcate: options.id });
    this.getList();
  },
  async getList() {
    wx.showLoading({
      title: "加载中..."
    });
    const info = await post({
      r: "manage.goods.get_list",
      keyword: this.data.keyword,
      pcate: this.data.pcate
    });
    wx.hideLoading();
    this.setData({
      list: info.list
    });
  },

  chooseGoods(e) {
    const { item } = e.currentTarget.dataset;
    item.index = this.data.index;
    item.goodsid = item.id;
    delete item.id;
    app.globalData.goods = item;

    const pages = getCurrentPages();
    const prePage = pages[pages.length - 2]; //上一个页面
    if (prePage.setItemFromGoodsList) {
      prePage.setItemFromGoodsList(item);
    }
    wx.navigateBack({
      delta: 1
    });
  },
  search() {
    this.getList();
  },
  handleInput(e) {
    this.setData({ keyword: e.detail.value.trim() });
  }
});
