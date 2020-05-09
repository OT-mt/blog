$(function () {
    var url = window.location.protocol+'//'+window.location.hostname+
        ':'+window.location.port+'/'+window.location.pathname.split('/')[1]+'/';
    /*
    * 判断管理员是否登陆
    * */
        function $confirmAdmin() {
            var result = false;
            $.ajax({
                url:url+"admin/getCookieLogin",
                method:"get",
                dataType:"json",
                async:false,
                success:function (data) {
                    result = data;
                }
            })
            return result;
        }
    // 获取评论
    function $getComment(){
        $.ajax({
            url:url+"comment/getComment/"+$(".comment-box").length+"/"+$("#id").text(),
            method:"get",
            dataType:'json',
            success:function (data) {
                $.each(data,function (index,item) {
                    if ($confirmAdmin()){
                        $(".comment").append("            <div class=\"comment-box\" >\n" +
                            "                <div class=\"user\">\n" +
                            "                    <div class=\"img-box\">\n" +
                            "                        <img src=\""+url+item.user.img_src+"\" alt=\"我是头像\">\n" +
                            "                    </div>\n" +
                            "                    <div class=\"name\">\n" +
                            item.user.name +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "                <div class=\"comment-value\">\n" +
                            item.value +
                            "                </div>\n" +
                            "<div class='delete' title=\""+item.id+"\">删除</div>"+
                            "            </div>")
                    }
                    else {
                        $(".comment").append("            <div class=\"comment-box\">\n" +
                            "                <div class=\"user\">\n" +
                            "                    <div class=\"img-box\">\n" +
                            "                        <img src=\""+url+item.user.img_src+"\" alt=\"我是头像\">\n" +
                            "                    </div>\n" +
                            "                    <div class=\"name\">\n" +
                            item.user.name +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "                <div class=\"comment-value\">\n" +
                            item.value +
                            "                </div>\n" +
                            "            </div>")
                    }
                })
            }
        })
    }

    $getComment();
    $("#getComment").on("click",function(){
        $getComment();
    });

    function $addComment() {
        $.ajax({
            url:url+"comment/addComment/"+$("#id").text(),
            method: "post",
            contentType:'application/json;charset=utf-8',
            data:JSON.stringify({
                "value":$("#comment").val()
            }),
            dataType: "text",
            success:function (data) {
                alert(data);
                if (data==='评论成功'){
                    window.location.href = window.location.href;
                }
            },
            error:function (data) {
                console.log(data)
                alert("失败请重试");
            }
        })
    }

    $("#commit-comment").click(function(){
        $addComment();
    })

    $(document).on('click','.delete',function(){
        $.ajax({
            url:url+"admin/deleteComment/"+this.title,
            method:"get",
            contentType:'application/text;charset=utf-8',
            dataType:"text",
            success:function (data) {
                alert(data);
                window.location.href = window.location.href;
            },
            error:function () {
                alert("失败请重试");
            }
        })
    });

    // 范围量+1
    $.ajax({
        url:url+"blog/addView/"+$("#id").text()
    })
})