// pages/order/orderList/index.js
import { post } from "../../utils/request";
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    psize: 10,
    page: 1,
    status: "",
    list: [],
    total: "",
    statusObj: {
      "3": "已完成",
      "1": "已取消"
    }
  },

  onLoad: function (options) {
    this.getList();
  },

  onReachBottom: function () {
    console.log("onReachBottom");
    const { page, total, psize } = this.data;
    if (page < total / psize) {
      this.setData({ page: this.data.page + 1 });
      this.getOrderList();
    }
  },
  changeIndex(e) {
    this.setData({ status: e.currentTarget.dataset.status, list: [], page: 1 });
    this.getList();
  },
  async getList() {
    wx.showLoading({ title: "加载中" });
    const { page, status } = this.data;
    const { list } = await post({ r: "order.get_list", page, status });
    console.log(list);
    this.setData({ list: this.data.list.concat(list) });
    wx.hideLoading();
  },
  clickItem(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/orderDetail/index?id=" + id
    });
  }
});
