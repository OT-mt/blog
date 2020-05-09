package com.wxhblog.controller;

import com.github.pagehelper.PageInfo;
import com.wxhblog.entity.Code;
import com.wxhblog.entity.Register;
import com.wxhblog.entity.User;
import com.wxhblog.service.CodeService;
import com.wxhblog.service.UserService;
import com.wxhblog.utils.MD5Util;
import com.wxhblog.utils.StringUtil;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private JavaMailSender mailSender ;
    @Autowired
    private CodeService codeService;


    // 登录
    @PostMapping("/login")
    @ResponseBody
    public User login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response){
        if (StringUtil.isEmpty(user.getMail())||StringUtil.isEmpty(user.getPassword())){
            return new User();
        }
        user.setPassword(MD5Util.MD5(user.getPassword()));

        user = userService.login(user);
        // 将 user 信息存入 cookie 和 session 中
        if (user!=null){
            HttpSession session = request.getSession();
            session.setAttribute("user",user);
            Cookie c = new Cookie("JSESSIONID",session.getId());
            c.setMaxAge(60*60*24);
            response.addCookie(c);
        }

        return user;
    }
    // 判断cookie中是否可以获取到登录的信息
    @GetMapping("/getCookieLogin")
    public User getCookieLogin(HttpServletRequest request){
        User user = new User();
        HttpSession session = request.getSession();
        user = (User) session.getAttribute("user");
        return user;
    }

    @RequestMapping(path = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public User getById(@PathVariable Long id){
        System.out.println(id);
        User user = userService.getUserById(id);
        System.out.println(user);
        return user;
    }

    @RequestMapping("/all")
    public List<User> add(){
        return userService.getAllUser();
    }

    @GetMapping("/getPage/{index}")
    public List<User> with(@PathVariable int index){
        // 第一个参数开始的位置，第二个参数一页有多少
        RowBounds rowBounds = new RowBounds((index-1)*10,10);

        List<User> list = userService.getAllWithRowRounds(rowBounds);

        PageInfo pageInfo = new PageInfo(list);
        System.out.println(pageInfo);

        return list;
    }

    /*
    * 得到验证码
    * */

    @GetMapping("/getCode/{mail}")
    public HashMap<String,String> getCode(@PathVariable String mail){
        HashMap<String,String> mes = new HashMap<>();

        if (!StringUtil.mail(mail)){
            mes.put("forMail","邮箱格式不合法");
            return mes;
        }
        if(userService.getUserByMail(mail)!=null){
            mes.put("forMail","邮箱已被注册");
            return mes;
        }

        String code = "";

        Code codeobj = codeService.getCodeByMail(mail);
        // 判断验证码是否存在
        if (codeService.getCodeByMail(mail)!=null){
            code = codeobj.getValue();
        }
        else {
            Random r = new Random();
            for (int i = 0; i < 6; i++) {
                code += r.nextInt(9);
            }
            // 数据库添加验证码
            Code addcode = new Code();
            addcode.setMail(mail);
            addcode.setValue(code);
            codeService.addCode(addcode);
        }
        // 发送邮件
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom("wxhkeji@163.com");
        simpleMailMessage.setText(code);
        simpleMailMessage.setSubject("获取注册验证码");
        simpleMailMessage.setTo(mail);
        simpleMailMessage.setCc("wxhkeji@163.com");

        mes.put("code",code);
        mailSender.send(simpleMailMessage);
        return mes;
    }

    /*
    * 注册
    *
    * */
    @PostMapping("/register")
    public HashMap<String,String> register(@RequestBody Register register){
        HashMap<String,String> map = new HashMap<>();

        String name = register.getName();
        String password = register.getPassword();
        String mail = register.getMail();
        String code = register.getCode();
        if (userService.getUserByMail(mail)!=null){
            map.put("forMail","该邮箱已被注册");
            return map;
        }
        if (name.length()<3||name.length()>8){
            map.put("forName","名字长度应该大于三且小于八");
        }
        if (!StringUtil.password(password)){
            map.put("forPassword","密码长度应该在8-20之间，且包含数字，字母大小写，标签符号的组合");
        }
        if (codeService.getCodeByMailAndValue(new Code(mail,code))==null){
            map.put("forMail","该邮箱未获取验证码");
        }
        if (map.isEmpty()){
            // 进行注册
            userService.addUser(new User(mail, MD5Util.MD5(password),name,"static/imgs/1.jpg"));
            map.put("success","yes");
        }
        return map;
    }

}
