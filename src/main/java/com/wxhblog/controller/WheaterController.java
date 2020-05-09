package com.wxhblog.controller;

import com.wxhblog.utils.WheaterUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WheaterController {
    @RequestMapping("/wheater")
    public String wheater(){
        String city = WheaterUtil.getCity();
        return WheaterUtil.wheater(city);
    }
}
