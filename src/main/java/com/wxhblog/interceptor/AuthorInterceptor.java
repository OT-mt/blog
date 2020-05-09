package com.wxhblog.interceptor;

import com.wxhblog.entity.Admin;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
public class AuthorInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Admin admin = new Admin();
        HttpSession session = request.getSession();
        admin = (Admin) session.getAttribute("admin");

        Boolean isAdmin = false;
        try {
            isAdmin = admin.getAccount()!=null;
        } catch (Exception e) {
        }

        if (!isAdmin){
            response.sendRedirect("noAdmin");
            return false;
        }
        return true;
    }
    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
    }
}
