$(function () {
  getUserInof();
  //退出
  var layer = layui.layer;
  $("#btnLogout").on("click", function () {
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (
      index
    ) {
      // 1. 清空本地存储中的 token
      localStorage.removeItem("token");
      // 2. 重新跳转到登录页面
      location.href = "/login.html";
      //框架提供的 关闭 confirm 询问框
      layer.close(index);
    });
  });
});
function getUserInof() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      renderAvatar(res.data);
    },
  });
}
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".user-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var text = name[0].toUpperCase();
    $(".user-avatar").html(text).show();
  }
}
