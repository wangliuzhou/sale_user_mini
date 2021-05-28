import { post } from "../../utils/request";

// pages/syncScheme/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    allCheck: false,
    index: "0",
    schemeList: [],
    schemeListFormat: [],
    devicelist: [
      // {
      //   deviceNo: "A0000001",
      //   id: "1",
      //   remarks: "测试",
      //   schemename: "测试方案",
      //   thumb:
      //     "http://sell.hzybs.com/attachment/images/1/2020/05/mXftqqjiQI9jHq8HLihSetH9ThzjXh.jpg"
      // },
      // {
      //   deviceNo: "A0000001",
      //   id: "2",
      //   remarks: "测试",
      //   schemename: "测试方案",
      //   thumb:
      //     "http://sell.hzybs.com/attachment/images/1/2020/05/mXftqqjiQI9jHq8HLihSetH9ThzjXh.jpg"
      // },
      // {
      //   deviceNo: "A0000001",
      //   id: "3",
      //   remarks: "测试",
      //   schemename: "测试方案",
      //   thumb:
      //     "http://sell.hzybs.com/attachment/images/1/2020/05/mXftqqjiQI9jHq8HLihSetH9ThzjXh.jpg"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({ id: options.id });
    this.getSchemelist();
    this.getInfo(options.id);
  },
  async getSchemelist() {
    const { list } = await post({
      r: "manage.scheme.get_list",
      keyword: "",
      page: 1,
      psize: 9999999
    });
    console.log("方案列表", list);
    const schemeListFormat = list.map(({ name }) => name);
    this.setData({ schemeList: list, schemeListFormat });
  },
  async getInfo(id) {
    const { devicelist } = await post({
      r: "manage.dealer.op.schemein",
      id
    });
    this.setData({ devicelist });
  },
  allCheck() {
    const { allCheck, devicelist } = this.data;
    devicelist.forEach(item => {
      item.checked = !allCheck;
    });
    this.setData({ allCheck: !allCheck, devicelist: this.data.devicelist });
  },
  PickerChange(e) {
    this.setData({ index: e.detail.value });
  },
  toogleChoose(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.devicelist[index];
    item.checked = !item.checked;
    this.setData({ devicelist: this.data.devicelist });
    this.setAllCheck();
  },
  setAllCheck() {
    const allCheck = this.data.devicelist.every(item => item.checked);
    this.setData({ allCheck });
  },
  async handleSubmit() {
    let { id, devicelist, schemeList, index } = this.data;
    const choosed = devicelist
      .filter(item => item.checked)
      .map(item => ({ deviceNo: item.deviceNo }));
    const schemeid = schemeList[index].id;
    await post({
      r: "manage.dealer.op.postscheme",
      dealerid: id,
      schemeid,
      detailed: JSON.stringify(choosed)
    });
    wx.showToast({
      title: "同步成功",
      icon: "nome"
    });
  }
});
