package com.wxhblog.mapper;

import com.wxhblog.entity.Admin;
import com.wxhblog.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AdminMapper {
    @Select("select * from admin where account = #{account} and password = password")
    public Admin login(Admin admin);
}
