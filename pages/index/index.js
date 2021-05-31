import { post } from "../../utils/request";
import { wlz } from "./../../helper/wlz";

//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    advs: [],
    deviceNo: "",
    device: {},
    goodslist: []
  },

  goPage(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/goodsDetail/index?id=${id}&deviceid=${this.data.device.deviceNo}`
    });
  },
  onLoad: async function() {
    wx.setStorageSync(
      "token",
      "MTMzNGhmdlR2VDJ2VDJ5SStUWEo3YkJFT2NQb2JYSk5xT3BpR1krL1hKRG1rUldUTisxbGtCUVRTSU0xY2pB"
    );
    this.setData({ deviceNo: "A0000001" });
    this.getInfo();
  },

  async getInfo() {
    const { deviceNo } = this.data;
    if (!deviceNo) {
      return;
    }
    const { advs, device, goodslist } = await post({
      r: "shop.get_shopindex",
      deviceNo
    });
    this.setData({
      advs,
      device,
      goodslist
    });
  }
});
