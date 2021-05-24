// scheme list  js
import { post } from "../../../utils/request";
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({ index: options.index });
    this.getList();
  },
  async getList() {
    wx.showLoading({
      title: "加载中..."
    });
    const info = await post({
      r: "shop.get_category"
    });
    wx.hideLoading();
    console.log(info);

    this.setData({
      list: info.list
    });
  },
  chooseGoods(e) {
    const { id } = e.currentTarget.dataset;
    wx.redirectTo({
      url: `/pages/scheme/goodsList/index?index=${this.data.index}&id=${id}`
    });
  }
});
