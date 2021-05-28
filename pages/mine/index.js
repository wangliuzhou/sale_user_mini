import { post } from "../../utils/request";

const app = getApp();
Page({
  data: {
    info: {},
    list: [
      {
        title: "我的订单",
        icon: "/images/mine/zhmx.png",
        path: "/pages/moneyDetail/index"
      },
      {
        title: "常见问题",
        icon: "/images/mine/zhbd.png",
        path: "/pages/accountBind/index"
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
    if (!path) {
    } else {
      wx.navigateTo({
        url: path
      });
    }
  }
});
