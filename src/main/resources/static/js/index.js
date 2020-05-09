$(function () {
    // 获取服务器路径
        //     window 对象
        //     location.hostname 返回 web 主机的域名 localhost
        //     location.pathname 返回当前页面的路径和文件名  /wxhBog/index.html
        //     location.port 返回 web 主机的端口 （80 或 443）    /8888
        // location.protocol 返回所使用的 web 协议（http: 或 https:）  http:
    var url = window.location.protocol+'//'+window.location.hostname+
        ':'+window.location.port+'/'+window.location.pathname.split('/')[1]+'/';
    // 得到博客的条
    var getBlog = $("#getBlog");
    // 博客当前页
    var currentPage = 1;

    // 监听滚轮和下拉条下拉事件
    $(window).scroll(function() {
      // 判断条到窗口顶部的距离
        var line = getBlog.offset().top-$(window).scrollTop();
        // 窗口高度
        var wh = $(window).innerHeight();

        // 如果到达底部加载五条博客
        if (line<wh-50){
            $getBlog(currentPage++);
        }
    })

    // 得到博客信息
    // jquery 内部自定义函数前缀应该加上$才可以被识别
    function $getBlog(page) {
        $.ajax({
            url:url+'blog/getPage/'+page,
            dataType:'json',
            success:function (data) {
                var $blogs = $("#blogs")
                $.each(data,function (index,obj) {
                    $blogs.append(
                        "<div>\n" +
                        "                    <div class=\"me\">\n" +
                        "                        <img src=\"static/imgs/p.png\">\n" +
                        "                        <div>王雪浩</div>\n" +
                        "                        <div class=\"time\">"+obj.created_time+"</div>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"blog\">\n" +
                        "                       <a href=\""+url+"blog/"+obj.id+"\"> "+
                        "                        <h5 class=\"blog-title\">"+obj.title+obj.view+"</h5>\n" +
                        "                        <h5 class=\"blog-type\">【"+obj.type+"】</h5>\n" +
                        "                        <div class=\"blog-text\">"+obj.text+"</div>\n" +
                        "                       </a> "+
                        "                    </div>\n" +
                        "                </div>"
                    );
                })
            }
        })
    }
    // 初始加载五条博客
    $getBlog(1);
    // 登录模态框
    $("#login").click(function () {
        $('.modal').modal('show');
    })
    // 登录按钮
    $("#confirmLogin").click(function () {
        $.ajax({
            url:url+"user/login",
            method:"post",
            data:JSON.stringify({"mail":$("#mail").val(),"password":$("#password").val()}),
            dataType: "json",
            contentType:'application/json;charset=utf-8',
            success:function (data) {
                if (data.name===null){
                    alert("账号或密码错误");
                    return;
                }
                window.location.reload();
            },
            error:function () {
                alert("账号或密码错误")
            }
        })
        $('.modal').modal('hide');
    })

    // 验证 cookie 中是否存在登录信息
    function $confirmCookieLogin() {
        $.ajax({
            url:url+"user/getCookieLogin",
            method: "get",
            dataType: "json",
            contentType:'application/json;charset=utf-8',
            success:function (data) {
                if (data.name!==null){
                    $("#login").html("用户名："+data.name+"</br>邮箱："+data.mail);
                }
            }
        })
    }
    $confirmCookieLogin();

    // 初始化操作
    function $init() {
        $("#profile").click(function () {
            window.location.href = url+"/profile";
        });
        $("#blognav").click(function(){
            window.location.href = url+"/blogColumn"
        })
        $("#writeBlog").click(function(){
            window.open(url+"writeBlog")
        })
    }
    $init();

    // 获取天气
    $.ajax({
        url:url+"wheater",
        dataType: "json",
        contentType:'application/json;charset=utf-8',
        success:function (data) {
            $.each(data.HeWeather6[0].daily_forecast,function (index,item) {
                var $li = $("#wheather li").eq(index);
                $li.find(".date").html(item.date);
                $li.find(".cond_txt_d").html(item.cond_txt_d);
                $li.find(".tmp_max").html(item.tmp_max);
                $li.find(".tmp_min").html(item.tmp_min);
                $li.find(".wind_dir").html(item.wind_dir);
            })
        }
    })
});