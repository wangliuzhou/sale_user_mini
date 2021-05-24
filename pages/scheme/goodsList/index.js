// pages/scheme/goodsList/index.js
import { post } from "../../../utils/request";
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: "",
    page: 1,
    total: 0,
    list: []
  },
  onLoad: function(options) {
    this.setData({ index: options.index });
    this.getList();
  },
  async getList() {
    const { keyword, page, list } = this.data;
    wx.showLoading({
      title: "加载中..."
    });
    const info = await post({
      r: "manage.goods.get_list",
      keyword,
      page
    });
    wx.hideLoading();
    this.setData({
      list: list.concat(info.list),
      total: info.total
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
    this.setData({
      list: [],
      page: 1
    });
    this.getList();
  },
  handleInput(e) {
    this.setData({ keyword: e.detail.value.trim() });
  },
  onReachBottom: function() {
    console.log("onReachBottom");
    if (this.data.page < this.data.total) {
      this.setData({ page: this.data.page + 1 });
      this.getList();
    }
  }
});
