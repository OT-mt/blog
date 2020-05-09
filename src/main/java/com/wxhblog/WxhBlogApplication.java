package com.wxhblog;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import com.wxhblog.mapper.UserMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.List;

@SpringBootApplication
@MapperScan("com.wxhblog.mapper")
public class WxhBlogApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(WxhBlogApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
    }
}
