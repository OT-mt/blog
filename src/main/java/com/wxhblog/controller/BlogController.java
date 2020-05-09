package com.wxhblog.controller;

import com.wxhblog.entity.Blog;
import com.wxhblog.entity.BlogType;
import com.wxhblog.service.BlogService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RequestMapping("/blog")
@Controller
public class BlogController {

    @Autowired
    private BlogService blogService;

    // 得到博客所有分栏
    @GetMapping("/getAllColumn")
    @ResponseBody
    public List<BlogType> getAllColumn(){
        return blogService.getAllBlogType();
    }

    // 得到对应分栏的博客数量
    @GetMapping("/getBlogColumnCount/{type}")
    @ResponseBody
    public Integer getBlogColumnCount(@PathVariable Integer type){
        return blogService.getColumnCount(blogService.getBlogTypeById(type));
    }

    // 得到blog的分页数据
    @GetMapping("/getPage/{page}")
    @ResponseBody
    public List<Blog> getPageBlog(@PathVariable int page){
        int limit = 5;
        // 第一个参数是从哪里开始，第二个参数是取出多少条
        RowBounds rowBounds = new RowBounds((page-1)*limit,limit);
        return blogService.getAllWithRowRounds(rowBounds);
    }

    // 得到博客分栏分页后的数据
    @GetMapping("/getColumnPage/{type}/{page}")
    @ResponseBody
    public List<Blog> getColumnPageBlog(@PathVariable int type, @PathVariable int page){
        int limit = 5;
        RowBounds rowBounds = new RowBounds((page-1)*limit,limit);

        return blogService.getColumnPageBlog(rowBounds,blogService.getBlogTypeById(type));
    }

    // 打开博客页面
    @GetMapping("/{id}")
    public ModelAndView blogDetail(@PathVariable Long id){
        ModelAndView mv = new ModelAndView();
        mv.addObject("blog",blogService.getBlogById(id));
        mv.setViewName("blog");
        return mv;
    }

    // 添加博客
    @PostMapping("/addBlog")
    @ResponseBody
    public String addBlog(@RequestBody Blog blog){
        blogService.addBlog(blog);
        return "success";
    }
    // 访问量+1
    @GetMapping("/addView/{id}")
    @ResponseBody
    public String addView(@PathVariable Long id){
        blogService.addView(id);
        return "";
    }
}
