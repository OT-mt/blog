$(function(){
    // 获取服务器路径
    var url = window.location.protocol+'//'+window.location.hostname+
        ':'+window.location.port+'/'+window.location.pathname.split('/')[1]+'/';
    // 获取验证码
    var $getCode = $("#getCode");
    var $mail = $("#mail");
    var $name = $("#name");
    var $forMail = $("#forMail");
    var $forCode = $("#Code");
    // 获取验证码
    $getCode.click(function(){

        var mail = $mail.val();
        $forMail.children("div").css("display","none");
        // 判断邮箱是否为空
        if (mail === null || mail === undefined || mail === '') {
            $show($forMail,"邮箱不能为空");
            return;
        }

        $.ajax({
            url:url+'user/getCode/'+mail,
            method:"get",
            dataType:"json",
            success:function (data) {
                for (let objKey in data) {
                    if(objKey === "code"){
                        alert("获取验证码成功，请到邮箱查看");
                    }else{
                        $show($("#"+objKey),data[objKey]);
                    }
                }
            }
        })
    });
    // 注册
    $("#register").click(function(){

            $("li").children("div").css("display","none");

            // 将表单中的数据封装到一个对象
            var fields = $('#form').serializeArray();
            var obj = {}; //声明一个对象
            $.each(fields, function(index, field) {
                obj[field.name] = field.value; //通过变量，将属性值，属性一起放到对象中
            })

            $.ajax({
                url:url+"user/register",
                data:JSON.stringify(obj),
                method: "post",
                type:"post",
                dataType: "json",
                contentType:'application/json;charset=utf-8',
                success:function(data){
                    for (let objKey in data){
                        if (objKey==='success'){
                            alert("注册成功");
                            return;
                        }else {
                            $show($("#"+objKey),data[objKey]);
                        }
                    }
                }
            })
    });

    // 对应li标签下的div显示,以及error的信息改变
    function $show(id,value) {
        id.children("div").css("display","block");
        id.find(".error").text(value);
    }


    //
    // // 获取验证码
    // $("#getAuthCode").click(function(){
    //     $.ajax({
    //        url:"/haha/user/mail.do",
    //        method: "post",
    //        dataType: "text",
    //        data: {mail:$("#mail").val()},
    //        success:function(data){
    //            alert(data)
    //        },
    //         error:function(){
    //            alert("异常请稍后重试")
    //         }
    //     });
    // });
    //
    // // 进行注册
    // $("#register").click(function () {
    //     var fields = $('#form').serializeArray();
    //     var obj = {}; //声明一个对象
    //     $.each(fields, function(index, field) {
    //         obj[field.name] = field.value; //通过变量，将属性值，属性一起放到对象中
    //     })
    //
    //     $.ajax({
    //         url:"/haha/user/add.do",
    //         method:"post",
    //         dataType:"json",
    //         data:JSON.stringify(obj),
    //         contentType:"application/json",
    //         success:function(result){
    //             if (result.goodMail===false){
    //                 $(".error").eq(0).css({"display":"inline-block"});
    //             }else {
    //                 $(".error").eq(0).css({"display":"none"});
    //             }
    //             if (result.goodName===false){
    //                 $(".error").eq(1).css({"display":"inline-block"});
    //             }else {
    //                 $(".error").eq(1).css({"display":"none"});
    //             }
    //             if (result.goodPassword===false){
    //                 $(".error").eq(2).css({"display":"inline-block"});
    //             }else {
    //                 $(".error").eq(2).css({"display":"none"});
    //             }
    //             if (result.goodConfirmPassword===false){
    //                 $(".error").eq(3).css({"display":"inline-block"});
    //             }else {
    //                 $(".error").eq(3).css({"display":"none"});
    //             }
    //             if (result.goodAuthCode===false){
    //                 $(".error").eq(4).css({"display":"inline-block"});
    //             }else {
    //                 $(".error").eq(4).css({"display":"none"});
    //             }
    //
    //             if (result.goodMail===null&&result.goodName===null&&result.goodPassword===null&&result.goodConfirmPassword===null&&result.goodAuthCode===null){
    //                 alert("注册成功");
    //                 window.open("index.html","_self");
    //             }
    //         },
    //         error:function () {
    //             console.log("错误,请重试")
    //         }
    //     })
    // });
});




