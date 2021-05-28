// pages/order/orderList/index.js
import { post } from "../../../utils/request";
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    index: "",
    list: [{}, {}, {}],
    pointList: [],
    pointListFormat: [],
    pointId: "",
    page: 1,
    total: 0,
    psize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPointList();
    this.getOrderList();
  },
  clickItem(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/order/orderDetail/index?id=" + id
    });
  },
  handleClickBtn(e) {
    const { index } = e.currentTarget.dataset;
    console.log(index);
  },
  search() {
    this.setData({
      list: [],
      page: 1
    });
    this.getOrderList();
  },
  onRangeComplete(e) {
    const { begin, end } = e.detail;
    console.log("onRangeComplete", begin, end);
    //
    //
    //
    //
    //
    this.search();
  },
  async getOrderList() {
    wx.showLoading({ title: "加载中..." });
    const { pointId, page } = this.data; // location
    const { list } = await post({});
    wx.hideLoading();
    //
    //
    //
    //
    //
    console.log(123);
  },
  async getPointList() {
    const { list } = await post({
      r: "manage.dealer.lists",
      keyword: this.data.keyword
    });
    const pointListFormat = list.map(item => item.username);
    this.setData({
      pointList: list,
      pointListFormat
    });
    console.log("pointList", list);
  },
  handleInput(e) {
    this.setData({ index: e.detail.value.trim() });
  },
  pickerChange(e) {
    const pointId = this.data.pointList[e.detail.value].id;
    this.setData({ index: e.detail.value, pointId });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom");
    const { page, total, psize } = this.data;
    if (page < total / psize) {
      this.setData({ page: this.data.page + 1 });
      this.getOrderList();
    }
  }
});
