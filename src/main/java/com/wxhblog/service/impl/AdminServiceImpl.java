package com.wxhblog.service.impl;

import com.wxhblog.entity.Admin;
import com.wxhblog.mapper.AdminMapper;
import com.wxhblog.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminMapper adminMapper;
    @Override
    public Admin login(Admin admin) {
        return adminMapper.login(admin);
    }
}
