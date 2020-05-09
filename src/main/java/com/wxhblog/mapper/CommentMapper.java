package com.wxhblog.mapper;

import com.wxhblog.entity.Comment;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CommentMapper {

    // 得到评论
    @Select("select * from comment where id = #id")
    @Results(value = {
            @Result(property = "id",column = "id"),
            @Result(property = "value",column = "value")
    })
    public Comment getCommentById(Long id);

    // get
    @Select(
            "<script>" +
                    "select * from comment where " +
                    "<foreach collection='list' open='id=' separator=' or id =' item='item'>" +
                    "#{item}" +
                    "</foreach>" +
                    " ORDER BY created_time DESC"+
                    "</script>"
    )
    @Results(value = {
            @Result(property = "id",column = "id"),
            @Result(property = "value",column = "value"),
            @Result(property = "created_time",column = "created_time"),
            @Result(property = "user",column = "umail",one = @One(select = "com.wxhblog.mapper.UserMapper.getUserByMail"))
    })
    public List<Comment> getComment(List<Long> list, RowBounds rowBounds);

    // 添加博客,获取自动生成的主键
    @Insert("insert into comment (value,umail)values(#{value},#{user.mail})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public void addComment(Comment comment);

    @Delete("delete from comment where id = #{id}")
    public void deleteComment(Long id);
}
