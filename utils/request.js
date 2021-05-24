import wlz from "../helper/wlz";

const request = ({ method, data, header }) => {
  // const expire = wx.getStorageSync("expire") || 0;
  // if (expire < +new Date()) {
  //   wx.showToast({
  //     title: "登录失效，请重新登录",
  //     icon: "none"
  //   });
  //   setTimeout(() => {
  //     wx.redirectTo({
  //       url: "/pages/login/index"
  //     });
  //   }, 1800);
  //   return;
  // }
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
      } else {
        wx.showToast({
          title: data.message || "服务器异常",
          icon: "none"
        });
        throw new Error("服务器异常");
      }
    });
};

export const post = (data, header) => {
  return request({ method: "POST", data, header });
};

export const get = (data, header, app) => {
  return request({ method: "GET", data, header, app });
};
