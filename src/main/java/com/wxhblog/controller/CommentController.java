package com.wxhblog.controller;

import com.wxhblog.entity.BlogComment;
import com.wxhblog.entity.Comment;
import com.wxhblog.entity.User;
import com.wxhblog.mapper.BlogCommentMapper;
import com.wxhblog.service.CommentService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private BlogCommentMapper blogCommentMapper;

    @GetMapping("/getComment/{page}/{bid}")
    public List<Comment> getComent(@PathVariable Integer page,@PathVariable Long bid){
        RowBounds rowBounds = new RowBounds(page,2);
        return commentService.getComment(bid,rowBounds);
    }

    @PostMapping("/addComment/{bid}")
    private String addComment(@RequestBody Comment comment,@PathVariable Long bid, HttpServletRequest request){
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        session.setAttribute("user",user);

        if (user==null){
            return "用户未登录";
        }

        comment.setUser(user);

        try {
            commentService.addComment(comment,bid);
        } catch (Exception e) {
            e.printStackTrace();
            return "错误请重试";
        }

        return "评论成功";
    }
}
