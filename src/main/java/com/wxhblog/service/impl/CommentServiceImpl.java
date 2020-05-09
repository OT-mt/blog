package com.wxhblog.service.impl;

import com.wxhblog.entity.BlogComment;
import com.wxhblog.entity.Comment;
import com.wxhblog.mapper.BlogCommentMapper;
import com.wxhblog.mapper.CommentMapper;
import com.wxhblog.service.CommentService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private BlogCommentMapper blogCommentMapper;
    @Override
    public List<Comment> getComment(Long bid, RowBounds rowBounds) {
        return commentMapper.getComment(blogCommentMapper.getCids(bid),rowBounds);
    }

    @Override
    @Transactional
    public void addComment(Comment comment,Long bid) {
        commentMapper.addComment(comment);

        Long cid = comment.getId();
        blogCommentMapper.addComment(new BlogComment(bid,cid));
    }

    @Override
    @Transactional
    public void deleteComment(Long id) {
        commentMapper.deleteComment(id);
        blogCommentMapper.deleteComment(id);
    }
}
