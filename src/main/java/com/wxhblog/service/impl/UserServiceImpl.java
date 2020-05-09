package com.wxhblog.service.impl;

import com.wxhblog.entity.User;
import com.wxhblog.mapper.UserMapper;
import com.wxhblog.service.UserService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserById(Long id) {
        return userMapper.getUserById(id);
    }

    @Override
    @Transactional
    public List<User> getAllUser() {
        return userMapper.getAllUser();
    }

    public List<User> getAllWithRowRounds(RowBounds rowBounds){
        return userMapper.getAllWithRowRounds(rowBounds);
    }

    @Override
    public User getUserByMail(String mail) {
        return userMapper.getUserByMail(mail);
    }

    @Override
    public void addUser(User user) {
        userMapper.addUser(user);
    }

    @Override
    public User login(User user) {
        return userMapper.login(user);
    }

}
