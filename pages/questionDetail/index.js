import { post } from "../../utils/request";
import { baseEncode, baseDecode } from "../../utils/index.js";

// pages/questionDettail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const { data } = await post({
      r: "topic.detail",
      id: options.id
    });
    data.content = baseDecode(data.content);
    console.log(data);
    this.setData({ data });
  }
});
