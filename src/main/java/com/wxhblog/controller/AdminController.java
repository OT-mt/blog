package com.wxhblog.controller;

import com.wxhblog.entity.Admin;
import com.wxhblog.entity.Blog;
import com.wxhblog.entity.User;
import com.wxhblog.service.AdminService;
import com.wxhblog.service.BlogService;
import com.wxhblog.service.CommentService;
import com.wxhblog.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private BlogService blogService;

    @Autowired
    private CommentService commentService;

    @GetMapping("/view")
    public String view(){
        return "admin";
    }

    @PostMapping("/addCookie")
    @ResponseBody
    public Admin addCookie(@RequestBody Admin admin, HttpServletRequest request, HttpServletResponse response){
        admin.setPassword(MD5Util.MD5(admin.getPassword()));
        admin = adminService.login(admin);

        if (admin!=null){
            Cookie[] cookies = request.getCookies();
            if (cookies!=null&&cookies.length>0){
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals("JSESSIONID")){
                        cookie.setMaxAge(0);
                    }
                }
            }

            HttpSession session = request.getSession();
            session.setAttribute("admin",admin);

            Cookie c = new Cookie("JSESSIONID",session.getId());
            c.setMaxAge(60*60*24);
            response.addCookie(c);
        }

        return admin;
    }

    // 判断cookie中是否可以获取到登录的信息
    @GetMapping("/getCookieLogin")
    @ResponseBody
    public Boolean getCookieLogin(HttpServletRequest request){
        Admin admin = new Admin();
        HttpSession session = request.getSession();
        admin = (Admin) session.getAttribute("admin");
        session.setAttribute("admin",admin);
        return admin.getAccount()!=null;
    }

    // 删除博客
    @GetMapping("/deleteBlog/{blogId}")
    @ResponseBody
    public String deleteBlog(@PathVariable Long blogId,HttpServletRequest request){
        if (this.confirmAdmin(request)){
            blogService.deleteBlog(blogId);
        }
        return "";
    }

    // 进入修改博客页面
    @GetMapping("/changeBlogView/{blogId}")
    public ModelAndView changeBlogView(@PathVariable Long blogId,HttpServletRequest request){
        Blog blog = blogService.getBlogById(blogId);
        ModelAndView mv = new ModelAndView();
        mv.addObject("blog",blog);
        mv.setViewName("changeBlog");

        if (!this.confirmAdmin(request)){
            mv.setViewName("noAdmin");
        }

        return mv;
    }
    // 修改博客
    @PostMapping("/changeBlog")
    @ResponseBody
    public String changeBlog(@RequestBody Blog blog,HttpServletRequest request){
        if (this.confirmAdmin(request)){
            blogService.changeBlog(blog);
            return "更改成功";
        }
        return "未登录";
    }
    // 删除评论
    @GetMapping("/deleteComment/{id}")
    @ResponseBody
    public String deleteComment(@PathVariable Long id,HttpServletRequest request){
        if (this.confirmAdmin(request)){
            commentService.deleteComment(id);
            return "更改成功";
        }
        return "未登录";

    }

    // 判断是不是管理员
    public Boolean confirmAdmin(HttpServletRequest request){
        Admin admin = new Admin();
        HttpSession session = request.getSession();
        admin = (Admin) session.getAttribute("admin");
        session.setAttribute("admin",admin);

        try {
            return admin.getAccount()!=null;
        }catch (Exception e){
            return false;
        }

    }
}
