//开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
//拦截所有ajax请求
$.ajaxPrefilter(function (params) {
  //拼接对应的服务器地址
  params.url = baseURL + params.url;
});
