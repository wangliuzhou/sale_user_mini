// scheme js
// pages/role/roleDetail/index.js
import { post } from "../../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    info: {
      lists: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    const { id } = options;
    this.setData({ id });
    if (options.id) {
      this.getDetail(options.id);
    }
  },
  async getDetail(id) {
    wx.showLoading({ title: "加载中..." });
    const info = await post({
      r: "manage.scheme.get_detail",
      id
    });
    this.setData({ info });
    console.log(1, this.data.info);

    wx.hideLoading();
  },
  // 点击提交信息，
  // 编辑或新增信息
  async handleSubmit() {
    const params = {
      name: this.data.info.name,
      detailed: JSON.stringify(this.data.info.lists)
    };
    console.log("this.data.info.lists", this.data.info.lists);

    wx.showLoading({ title: "加载中..." });
    const { id } = this.data;
    if (id) {
      params.id = id;
    }
    // return;
    console.log("params===", params);
    await post({
      r: "manage.scheme.submit",
      ...params
    });
    wx.showToast({
      title: id ? "编辑成功" : "添加成功",
      icon: "none"
    });
    // wx.navigateBack();
  },
  nameChange(e) {
    const { value } = e.detail;
    this.data.info.name = value.trim();
    this.setData({ info: this.data.info });
  },
  onInput(e) {
    const { index, type } = e.currentTarget.dataset;
    this.data.info.lists[index][type] = e.detail.value.trim();
    this.setData({ info: this.data.info });
  },
  chooseCate(e) {
    const { index } = e.currentTarget.dataset;
    console.log(index);
    wx.navigateTo({
      url: "/pages/scheme/cateList/index?index=" + index
    });
  },
  setItemFromGoodsList(goods) {
    console.log();
    let item = this.data.info.lists[goods.index];
    item = { ...item, ...goods };
    console.log(item);
    this.data.info.lists[goods.index] = item;
    // delete item.index;

    this.setData({ info: this.data.info });
    console.log(22, this.data.info);
  }
});
