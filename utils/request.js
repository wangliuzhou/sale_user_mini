import wlz from "../helper/wlz";

const request = ({ method, data, header }) => {
  return wlz
    .request({
      method,
      url: "https://sell.hzybs.com/app/wxapi.php",
      data,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        ...header,
        TOKEN: wx.getStorageSync("token") || ""
      }
    })
    .then(({ data }) => {
      if (data.error === 0) {
        return data;
      } else if (data.error === 100001) {
        // wx.redirectTo({
        //   url: "/pages/login/index"
        // });
      } else {
        wx.showToast({
          title: data.message || "服务器异常",
          icon: "none"
        });
        throw new Error(data.message || "服务器异常");
      }
    });
};

export const post = (data, header) => {
  return request({ method: "POST", data, header });
};

export const get = (data, header, app) => {
  return request({ method: "GET", data, header, app });
};
