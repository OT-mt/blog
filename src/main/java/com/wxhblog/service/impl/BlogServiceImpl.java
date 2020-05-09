package com.wxhblog.service.impl;

import com.wxhblog.entity.Blog;
import com.wxhblog.entity.BlogType;
import com.wxhblog.enums.BlogEnum;
import com.wxhblog.mapper.BlogMapper;
import com.wxhblog.service.BlogService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogMapper blogMapper;

    @Override
    public List<BlogType> getAllBlogType() {
        return blogMapper.getAllBlogType();
    }

    @Override
    public String getBlogTypeById(Integer id) {
        return blogMapper.getBlogTypeById(id);
    }

    public List<Blog> getAllWithRowRounds(RowBounds rowBounds){
        return blogMapper.getAllWithRowRounds(rowBounds);
    }

    @Override
    public List<Blog> getColumnPageBlog(RowBounds rowBounds, String type) {
        return blogMapper.getColumnPageBlog(rowBounds,type);
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogMapper.getBlogById(id);
    }

    @Override
    public void addBlog(Blog blog) {
        blogMapper.addBlog(blog);
    }

    @Override
    public Integer getColumnCount(String type) {
        return blogMapper.getColumnCount(type);
    }

    @Override
    public void deleteBlog(Long id) {
        blogMapper.deleteBlog(id);
    }

    @Override
    public void changeBlog(Blog blog) {
        blogMapper.changeBlog(blog);
    }

    @Override
    public void addView(Long id) {
        blogMapper.addView(id);
    }
}
