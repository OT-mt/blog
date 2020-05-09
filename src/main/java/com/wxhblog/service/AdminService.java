package com.wxhblog.service;

import com.wxhblog.entity.Admin;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {
    public Admin login(Admin admin);
}
