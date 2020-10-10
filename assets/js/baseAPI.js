//开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
//拦截所有ajax请求
$.ajaxPrefilter(function (params) {
  //拼接对应的服务器地址
  params.url = baseURL + params.url;
  if (params.url.indexOf("/my/") !== -1) {
    params.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  //拦截所有的响应，判断身份认证信息
  params.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      //清空本地token
      localStorage.removeItem("token");
      //页面跳转
      location.href = "/login.html";
    }
  };
});
