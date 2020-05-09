package com.wxhblog.mapper;

import com.wxhblog.entity.Code;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Mapper
@Repository
public interface CodeMapper {
    @Select("select value from code where mail = #{mail}")
    public Code getCodeByMail(String mail);

    @Insert("insert into code (mail,value) values(#{mail},#{value})")
    public void addCode(Code code);

    @Select("select value from code where mail = #{mail} and value = #{value}")
    public String getCodeByMailAndValue(Code code);
}
