package com.wxhblog.service;

import com.wxhblog.entity.BlogComment;
import com.wxhblog.entity.Comment;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    public List<Comment> getComment(Long bid, RowBounds rowBounds);

    public void addComment(Comment comment,Long bid);

    public void deleteComment(Long id);
}
