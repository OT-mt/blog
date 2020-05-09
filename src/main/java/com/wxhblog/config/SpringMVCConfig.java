package com.wxhblog.config;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import com.wxhblog.interceptor.AuthorInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import javax.sql.DataSource;

@Configuration
public class SpringMVCConfig implements WebMvcConfigurer {
    // 注入自定义的拦截类
    @Autowired
    private AuthorInterceptor authorInterceptor;
    /*
     * 配置druid数据源
     * */
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource(){
        return DruidDataSourceBuilder.create().build();
    }

    /*
    * 配置拦截器
    * */
    public void addInterceptors(InterceptorRegistry registry) {
        //注册拦截器添加拦截路径
        registry.addInterceptor(authorInterceptor).addPathPatterns("/profile")
                .addPathPatterns("/writeBlog")
                .addPathPatterns("/writeBlog.html")
                .addPathPatterns("/profile.html");
    }
}
