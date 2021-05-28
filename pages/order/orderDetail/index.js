// pages/order/orderDetail/index.js
import { post } from "../../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderDetail(options.id);
  },

  async getOrderDetail(id) {
    const info = await post({});
  }
});
