package com.wxhblog.mapper;

import com.wxhblog.entity.BlogComment;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BlogCommentMapper {

    @Select("select cid from blog_comment  where bid = #{bid}")
    public List<Long> getCids(Long bid);

    // 添加博客
    @Insert("insert into blog_comment (bid,cid) values (#{bid},#{cid})")
    public void addComment(BlogComment blogComment);

    @Delete("delete from blog_comment where cid = #{id}")
    public void deleteComment(Long id);
}
