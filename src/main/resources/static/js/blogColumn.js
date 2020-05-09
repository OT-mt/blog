

var url = window.location.protocol+'//'+window.location.hostname+
    ':'+window.location.port+'/'+window.location.pathname.split('/')[1]+'/';
/*
* 判断管理员是否登陆
* */
function confirmAdmin() {
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
// 添加博客到指定区域
function addBlog(id,blog) {
    if (confirmAdmin()){
        id.append(
            "<div class=\"blog\" id=\"blog-"+blog.id+"\">\n" +
            " <a href=\""+url+"blog/"+blog.id+"\">"+
            "                                <div class=\"title\">"+blog.title+"</div>\n" +
            "                                <div class=\"text\"></div>\n" +
            "                                <div class=\"mes\">\n" +
            "                                    <div class=\"img-box\">\n" +
            "                                        <img src=\"static/imgs/p.png\">\n" +
            "                                    </div>\n" +
            "                                    <div class=\"name\">\n" +
            "                                        王雪浩\n" +
            "                                    </div>\n" +
            "                                    <div class=\"time\">"+blog.created_time+"</div>\n" +
            "                                    <div class=\"view\">\n" +
            "                                        <img src=\"static/imgs/eye.png\" class=\"view-icon\">\n" +
            "                                        <span>"+blog.view+"</span>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            " </a>"+
            " <div class=\"admin\">" +
            "    <div class=\"delete\" title=\""+blog.id+"\">删除</div>"+
            "    <div class=\"change\" title=\""+blog.id+"\" >修改</div>"+
            "</div>"+
            "</div>"
        )
    }else {
        id.append(
            "<div class=\"blog\" id=\"blog-"+blog.id+"\">\n" +
            " <a href=\""+url+"blog/"+blog.id+"\">"+
            "                                <div class=\"title\">"+blog.title+"</div>\n" +
            "                                <div class=\"text\"></div>\n" +
            "                                <div class=\"mes\">\n" +
            "                                    <div class=\"img-box\">\n" +
            "                                        <img src=\"static/imgs/p.png\">\n" +
            "                                    </div>\n" +
            "                                    <div class=\"name\">\n" +
            "                                        王雪浩\n" +
            "                                    </div>\n" +
            "                                    <div class=\"time\">"+blog.created_time+"</div>\n" +
            "                                    <div class=\"view\">\n" +
            "                                        <img src=\"static/imgs/eye.png\" class=\"view-icon\">\n" +
            "                                        <span>"+blog.view+"</span>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            " </a>"+
            "</div>"
        )
    }


    $("#blog-"+blog.id).find(".text").text(blog.text);
}

/*
* page 当前页
* type 博客类型
* blogs 要添加在哪里
* */

function getBlog(page,type,blogs){
    $.ajax({
        url:url+"blog/getColumnPage/"+type+"/"+page,
        type:"get",
        dataType:"json",
        contentType:'application/json;charset=utf-8',
        success:function (data) {
            blogs.find("div[class='blog']").remove();
            $.each(data,function (index,obj) {
              addBlog(blogs,obj);
            })
        },
        error:function () {
            alert("请求数据失败请重试")
        }
    })
}


// 所有页面的初始化
function init() {
    // 获取所有专栏并且添加到页面
    $.ajax({
        url:url+"blog/getAllColumn",
        type: "get",
        dataType:"json",
        contentType:'application/json;charset=utf-8',
        success:function (data) {
            // 添加专栏分栏
            var nav = $(".nav");
            var content = $(".tab-content");
            $.each(data,function (index,obj) {
                var id = obj.id;
                var nav_active = '';
                var tab_avtive = '';

                if (index===0){
                    nav_active = 'active';
                    tab_avtive = ' active show';
                }
                // 添加分栏导航
                nav.append(
                    "<a class=\"nav-link "+nav_active+"\" id=\"v-pills-"+obj.id+"-tab\" " +
                    "data-toggle=\"pill\"" +
                    " title=\""+obj.id+"\" " +
                    "href=\"#v-pills-"+obj.id+"\" " +
                    "role=\"tab\" " +
                    "aria-controls=\"v-pills-"+obj.id+"\"" +
                    " aria-selected=\"true\">" +
                    obj.value +
                    "</a>"
                )
                // 添加分栏模块
                content.append(
                    "                    <div class=\"tab-pane fade "+tab_avtive+"\" id=\"v-pills-"+id+"\" role=\"tabpanel\" aria-labelledby=\"v-pills-"+id+"-tab\">\n" +
                    "                        <div class=\"blogs\">\n"+
                    "                               <div id=\"pager"+id+"\" class=\"pager clearfix\">\n" +
                    "                               </div>\n" +
                    "                        </div>\n"+
                    "                    </div>"
                )
                // 得到每一个分栏的总数,并且设置分栏
                $.ajax({
                    url:url+"blog/getBlogColumnCount/"+id,
                    type:"get",
                    success:function (data) {
                        $("#pager"+id).zPager({
                            totalData: data,
                            htmlBox: $('#wraper'),
                            btnShow: true,
                            ajaxSetData: true
                        });
                    }
                })
                // 给各个模块第一页添加博客
                getBlog(1,id,$("#v-pills-"+id).find(".blogs"))

            })
        }
    })
}

init();

// 获取要跳转的页码
function currentPage(currentPage){
    getBlog(currentPage,$(".nav .active")[0].title,$(".tab-content .active .blogs"));
}

//删除博客
function deleteBlog(blogId) {
    $.ajax({
        url:url+"admin/deleteBlog/"+blogId,
        success:function () {
            alert("删除成功");
            window.location.href = window.location.href;
        },
        error:function () {
            alert("删除失败请重试。")
        }
    })
}

$(document).on('click','.delete',function(){
    deleteBlog(this.title);
});
$(document).on('click','.change',function(){
    window.location.href = url+"admin/changeBlogView/"+this.title;
});

























