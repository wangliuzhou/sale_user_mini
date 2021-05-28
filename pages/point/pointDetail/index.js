// pages/role/roleDetail/index.js
import { post } from "../../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    info: {
      picker: ["-", "-", "-"],
      devicelist: []
    }
  },

  onReady() {
    this.calendar = this.selectComponent("#calendar2");
    if (this.data.id) {
      this.getPointDetail(this.data.id);
    }
  },
  onLoad: function(options) {
    console.log(options);
    const { id } = options;
    this.setData({ id });
    // if (options.id) {
    //   this.getPointDetail(options.id);
    // }
  },
  async getPointDetail(id) {
    wx.showLoading({ title: "加载中..." });
    const info = await post({
      r: "manage.dealer.get_detail",
      id
    });
    if (info.dealer_starttime && info.dealer_endtime) {
      var beginDate = info.dealer_starttime.substr(0, 10);
      var endDate = info.dealer_endtime.substr(0, 10);
    }
    this.setData({ info, beginDate, endDate }, () => {
      console.log("this.calendar", 222, this.calendar);
      this.calendar.setFormatDateText();
    });
    wx.hideLoading();
  },
  // 点击提交信息，
  // 编辑或新增信息
  async handleSubmit() {
    const { username, dealer_tel, realname } = this.data.info;
    if (!username) {
      wx.showToast({ title: "请填写点位名称", icon: "none" });
      return;
    }
    if (!dealer_tel) {
      wx.showToast({ title: "请填写正确的点位电话", icon: "none" });
      return;
    }
    if (!realname) {
      wx.showToast({ title: "请填写负责人名称", icon: "none" });
      return;
    }
    wx.showLoading({ title: "加载中..." });
    const { id, info } = this.data;
    if (id) {
      info.id = id;
    }
    // return;
    console.log("params===", this.data.info);
    await post({
      r: "manage.dealer.submit",
      ...this.data.info
    });
    wx.showToast({
      title: id ? "编辑成功" : "添加成功",
      icon: "none"
    });
    // wx.navigateBack();
  },
  handleChange(e) {
    console.log(e);
    const { type } = e.currentTarget.dataset;
    const { value } = e.detail;
    if ("picker" === type) {
      this.data.info["province"] = value[0];
      this.data.info["city"] = value[1];
      this.data.info["area"] = value[2];
    } else {
      this.data.info[type] = value.trim();
    }
    this.setData({ info: this.data.info });
  },
  onRangeComplete(e) {
    const { begin, end } = e.detail;
    this.data.info.dealer_starttime = begin;
    this.data.info.dealer_endtime = end;
    this.setData({ info: this.data.info });
    console.log(this.data.info);
  }
});
