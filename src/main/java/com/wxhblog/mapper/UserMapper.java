package com.wxhblog.mapper;

import com.wxhblog.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {
    @Select("select name from user")
    public List<String> getAllUserName();

    @Select("select * from user where id = #{id}")
    public User getUserById(Long id);

    // 通过邮箱查询
    @Select("select mail,name,img_src from user where mail = #{mail}")
    public User getUserByMail(String mail);

    @Select("select * from user")
    public List<User> getAllUser();

    // 分页
    @Select("select * from user")
    public List<User> getAllWithRowRounds(RowBounds rowBounds);

    // 添加用户
    @Insert("insert into user values(null,#{mail},#{password},#{name},#{img_src})")
    public void addUser(User user);

    // 登录验证
    @Select("select mail,name from user where mail = #{mail} and password = #{password}")
    public User login(User user);

}
