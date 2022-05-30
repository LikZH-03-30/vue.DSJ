function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      // console.log(res);
      if (res.status !== 0) return layer.msg("获取用户信息失败！");
      layer.msg("获取用户信息成功！");
      renderAvatar(res.data);
    },
  });
}

// 渲染头像
const renderAvatar = (user) => {
  console.log(user);
  let uname = user.nickname || user.username;
  //   渲染欢迎语
  $("#welcome").html(`欢迎${uname}`);
  // 渲染头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic);
    $(".text-avatar").hide();
  }else{
    //   设置文本头像
    $(".layui-nav-img").hide();
    $(".text-avatar").html(uname[0].toUpperCase())
  }
};


$("#btnLogout").click(() => {
    layui.layer.confirm('是否退出？',{icon:3,title:"提示"},function(index){
        localStorage.removeItem('token');
        location.href = "/login.html"
    })
});

getUserInfo();
