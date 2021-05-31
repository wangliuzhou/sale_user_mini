import { post } from "../../utils/request";
import { baseEncode, baseDecode } from "../../utils/index.js";
import wlz from "../../helper/wlz";

Page({
  /**
   * 页面的初始数据
   */
  data: { id: "", data: {}, deviceid: "" },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({ id: options.id, deviceid: options.deviceid });
    this.getGoodsDetail(options.id);
  },
  async getGoodsDetail(id) {
    wx.showLoading({ title: "加载中..." });
    const { data } = await post({
      r: "product.get_detail",
      id
    });
    console.log(777888, data);

    if (data.content) {
      data.content = baseDecode(data.content);
    }
    wx.hideLoading();
    console.log(data);
    this.setData({ data });
  },
  async checkLogin() {
    // 查看是否有token
    var token = wx.getStorageSync("token");
    if (token) {
      console.log(123, token);
      // 已登录
      this.onBuy();
    } else {
      console.log(456, token);
      // 未登录
      wx.getUserProfile({
        desc: "用于完善用户资料",
        success: res => {
          // this.setData({
          //   userInfo: res.userInfo,
          // });
          this.getOpenid(res.userInfo);
        }
      });
    }
  },
  async getOpenid(userInfo) {
    const { code } = await wlz.login();
    const {
      data: { token, member }
    } = await post({
      r: "wxapp.login",
      code,
      ...userInfo
    });
    wx.setStorageSync("token", token);
    wx.setStorageSync("openid", member.openid);
    this.onBuy();
  },
  async onBuy() {
    const { orderid } = await post({
      r: "order.create.submit",
      id: this.data.id,
      deviceid: this.data.deviceid
    });
    const info = await post({
      r: "order.pay",
      id: orderid
    });
    wx.requestPayment({
      timeStamp: "",
      nonceStr: "",
      package: "",
      signType: "MD5",
      paySign: "",
      success: res => {
        this.payCallback(orderid);
      },
      fail: err => {}
    });
  },
  async payCallback(orderid) {
    const info = await post({
      r: "order.pay.complete",
      id: orderid,
      type: "wechat"
    });
    console.log(456, info);
  }
});
