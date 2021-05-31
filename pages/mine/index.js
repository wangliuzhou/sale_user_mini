import { post } from "../../utils/request";
import wlz from "../../helper/wlz";

const app = getApp();
Page({
  data: {
    info: {},
    list: [
      {
        title: "我的订单",
        icon: "/images/mine/zhmx.png",
        path: "/pages/orderList/index"
      },
      {
        title: "常见问题",
        icon: "/images/mine/zhbd.png",
        path: "/pages/questionList/index"
      }
      // {
      //   title: "联系客服",
      //   icon: "/images/mine/kefu.png",
      //   path: "/pages/changePsw/index"
      // }
    ]
  },
  onLoad: function(options) {},

  onShow: function() {
    this.getInfo();
  },
  async getInfo() {
    const info = await post({ r: "member" });
    this.setData({ info });
  },
  tapPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.info.phonenumber
    });
  },

  goPage(e) {
    const { path } = e.currentTarget.dataset;
    if (path) {
      var token = wx.getStorageSync("token");
      // 查看是否有token
      if (token) {
        console.log(123, token);
        // 已登录
        wx.navigateTo({
          url: path
        });
      } else {
        console.log(456, token);
        // 未登录
        wx.getUserProfile({
          desc: "用于完善用户资料",
          success: res => {
            // this.setData({
            //   userInfo: res.userInfo,
            // });
            this.getOpenid(res.userInfo, path);
          }
        });
      }
    }
  },
  async getOpenid(userInfo, path) {
    wx.showLoading({
      title: "加载中..",
      icon: "none"
    });
    const { code } = await wlz.login();
    const {
      data: { token, member }
    } = await post({
      r: "wxapp.login",
      code,
      ...userInfo
    });
    wx.hideLoading();
    wx.setStorageSync("token", token);
    wx.setStorageSync("openid", member.openid);
    wx.navigateTo({
      url: path
    });
  }
});
