import { post } from "../../utils/request";

const app = getApp();
Page({
  data: {
    info: {},
    list: [
      {
        title: "账单明细",
        icon: "/images/mine/zhmx.png",
        func: ""
      },
      {
        title: "账户绑定",
        icon: "/images/mine/zhbd.png",
        func: ""
      },
      // {
      //   title: "合约时间",
      //   icon: "cuIcon-attentionfill",
      //   func: ""
      // },
      {
        title: "修改密码",
        icon: "/images/mine/xgmm.png",
        func: ""
      },
      {
        title: "退出账号",
        icon: "/images/mine/tczh.png",
        func: ""
      }
    ]
  },
  onLoad: function(options) {},

  attached(obj) {
    let that = this;
    let i = 0;
    let conut = 20;
    numDH();
    function numDH() {
      if (i < conut) {
        setTimeout(function() {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          });
          i++;
          numDH();
        }, 30);
      } else {
        that.setData(obj);
      }
    }
  },
  onShow: function() {
    const obj = {
      starCount: 3000,
      forksCount: 484,
      visitTotal: 24000
    };
    this.attached(obj);
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
  }
});
