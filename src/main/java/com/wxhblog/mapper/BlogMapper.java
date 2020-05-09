package com.wxhblog.mapper;

import com.wxhblog.entity.Blog;
import com.wxhblog.entity.BlogType;
import com.wxhblog.entity.Comment;
import com.wxhblog.enums.BlogEnum;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BlogMapper {
    // 得到所有博客类型
    @Select("select * from blog_type")
    public List<BlogType> getAllBlogType();

    // 凭借博客类型id获取博客类型的值
    @Select("select value from blog_type where id = #{id}")
    public String getBlogTypeById(Integer id);

    // 倒序查询
    @Select("SELECT * FROM blog ORDER BY VIEW DESC")
    public List<Blog> getAllWithRowRounds(RowBounds rowBounds);

    // 凭借id查询
    @Select("select * from blog where id = #{id}")
    public Blog getBlogById(Long id);

    // 添加博客
    @Insert("insert into blog values(null,#{type},#{title},#{text},#{text_mark},#{text_html},0,null,null)")
    public void addBlog(Blog blog);

    // 得到分栏的所有博客数量
    @Select("select count(*) from blog where type like #{type}")
    public Integer getColumnCount(String type);

    // 得到分栏
    @Select("SELECT id,title,text,view,created_time FROM blog WHERE TYPE LIKE #{type} ORDER BY VIEW DESC")
    public List<Blog> getColumnPageBlog(RowBounds rowBounds, String type);


    // 删除博客
    @Delete("DELETE FROM blog WHERE id = #{id}")
    public void deleteBlog(Long id);

    // 改变博客
    @Update("UPDATE blog SET title=#{title},text=#{text},text_mark=#{text_mark},text_html=#{text_mark}," +
            "text_html=#{text_html}  WHERE id = #{id}")
    public void changeBlog(Blog blog);

    // 访问加一
    @Update("UPDATE blog SET VIEW = VIEW +1 WHERE id = #{id}")
    public void addView(Long id);
}
