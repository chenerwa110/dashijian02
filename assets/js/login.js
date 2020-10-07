//入口函数
$(function () {
  //点击去注册账号,隐藏登录区域，显示注册区域
  $("#link-reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  //点击去登录，隐藏注册区域，显示登录区域
  $("#link-login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
  //自定义验证规则
  var form = layui.form;
  form.verify({
    //密码规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //确认密码规则
    repwd: function (value) {
      //获取密码框内容
      var pwd = $(".reg-box [name=password]").val();
      //判断确认密码框和密码框中的内容是否一致
      if (value !== pwd) {
        return "俩次密码不一致";
      }
    },
  });
  //注册功能
  var layer = layui.layer;
  $("#form-reg").on("submit", function (e) {
    //阻止表单提交
    e.preventDefault();
    //发送ajax
    $.ajax({
      method: "post",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success: function (res) {
        //返回状态判断
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        //提交成功后处理代码
        layer.msg("注册成功，请登录！");
        //手动切换到登录表单
        $("#link-login").click();
        //重置form表单
        $("#form-reg")[0].reset();
      },
    });
  });
  //登录功能
  $("#form-login").on("submit", function (e) {
    //阻止表单提交
    e.preventDefault();
    //发送ajax
    $.ajax({
      method: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        //返回状态判断
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        //提示信息，保存token，跳转页面
        layer.msg("恭喜你，登录成功！");
        //保存token
        localStorage.setItem("token", res.token);
        //跳转页面
        location.href = "/index.html";
      },
    });
  });
});
