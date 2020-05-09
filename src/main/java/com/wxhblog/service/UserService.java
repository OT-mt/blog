package com.wxhblog.service;

import com.wxhblog.entity.User;
import org.apache.ibatis.session.RowBounds;

import java.util.List;

public interface UserService {
    public User getUserById(Long id);

    public List<User> getAllUser();

    public List<User> getAllWithRowRounds(RowBounds rowBounds);

    public User getUserByMail(String mail);

    public void addUser(User user);

    public User login(User user);
}
