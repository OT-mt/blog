package com.wxhblog.service;

import com.wxhblog.entity.Blog;
import com.wxhblog.entity.BlogType;
import com.wxhblog.enums.BlogEnum;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BlogService {
    public List<BlogType> getAllBlogType();

    public String getBlogTypeById(Integer id);

    public List<Blog> getAllWithRowRounds(RowBounds rowBounds);

    public List<Blog> getColumnPageBlog(RowBounds rowBounds, String type);

    public Blog  getBlogById(Long id);

    public void addBlog(Blog blog);

    public Integer getColumnCount(String type);

    public void deleteBlog(Long id);

    public void changeBlog(Blog blog);

    public void addView (Long id);
}
