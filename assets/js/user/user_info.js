$(function() {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

    const initUserInfo = () =>{
         $.ajax({
             type:'GET',
             url:'/my/userinfo',
             success:(res) =>{
                 if(res.status !=0) return layer.msg ('用户信息输入失败')
                //  console.log(res);
                // 调用form.val()给表单快速赋值
                form.val('formUserInfo',res.data)
             }
         })
    }

    $('#btnCz').click((e)=>{
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:(res) =>{
                if(res.status != 0) return layer.msg('修改用户信息失败')
                layer.msg('修改用户信息成功')
                window.parent.getUserInfo()
                // console.log(res);

            }
        })
    })
    initUserInfo()
})