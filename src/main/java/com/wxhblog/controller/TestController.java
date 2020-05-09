package com.wxhblog.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;

@Controller
public class TestController {
    @RequestMapping("/hello")
    public ModelAndView sayHello(){
        return new ModelAndView("index");
    }

    // 跳转页
    @RequestMapping("/{value}")
    public String re(@PathVariable String value){
        if (value.equals("admin")){
            value = "index";
        }
        return value;
    }

}
