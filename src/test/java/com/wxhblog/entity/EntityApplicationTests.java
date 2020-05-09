package com.wxhblog.entity;

import com.alibaba.druid.support.json.JSONWriter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wxhblog.mapper.BlogCommentMapper;
import com.wxhblog.mapper.CommentMapper;
import org.apache.ibatis.session.RowBounds;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.w3c.dom.Document;

import javax.lang.model.util.Elements;
import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SpringBootTest
class EntityApplicationTests {

    @Autowired
    private BlogCommentMapper blogCommentMapper;
    @Autowired
    private CommentMapper commentMapper;

    @Test
    void contextLoads() {
        List<Long> list = new ArrayList<>();
        list.add(2l);
        list.add(3l);

        System.out.println(commentMapper.getComment(list,new RowBounds(0,1)));
    }

    @Test
    public void url(){
        //参数字符串，如果拼接在请求链接之后，需要对中文进行 URLEncode   字符集 UTF-8
        StringBuilder sb = new StringBuilder();
        InputStream is = null;
        BufferedReader br = null;
        PrintWriter out = null;
        try {
            //接口地址
            // 获取地址
            String url = "https://restapi.amap.com/v3/ip?output=json&key=d4bb6c717516257186ab250274c74e51";
            URL    uri = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) uri.openConnection();
            connection.setRequestMethod("POST");
            connection.setReadTimeout(5000);
            connection.setConnectTimeout(10000);
            connection.setRequestProperty("accept", "*/*");
            //发送参数
            connection.setDoOutput(true);
            out = new PrintWriter(connection.getOutputStream());
            out.flush();
            //接收结果
            is = connection.getInputStream();
            br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String line;
            //缓冲逐行读取
            while ( ( line = br.readLine() ) != null ) {
                sb.append(line);
            }
            ObjectMapper objectMapper = new ObjectMapper();
//
//            Wheater wheater = objectMapper.readValue(sb.toString(),Wheater.class);
            Map<String,String> map = objectMapper.readValue(sb.toString(),Map.class);
            System.out.println(map.toString());
//            System.out.println(wheater.getCity());
        } catch ( Exception ignored ) {
        } finally {
            //关闭流
            try {
                if(is!=null){
                    is.close();
                }
                if(br!=null){
                    br.close();
                }
                if (out!=null){
                    out.close();
                }
            } catch ( Exception ignored ) {}
        }
    }

    @Test
    public void wheater(){
        //参数字符串，如果拼接在请求链接之后，需要对中文进行 URLEncode   字符集 UTF-8
        String param = "";
        StringBuilder sb = new StringBuilder();
        InputStream is = null;
        BufferedReader br = null;
        PrintWriter out = null;
        try {
            //接口地址
            String url = "https://free-api.heweather.net/s6/weather/forecast?key=7932e0e6e990485da17046410d4282d1&location=洛阳";
            URL    uri = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) uri.openConnection();
            connection.setRequestMethod("POST");
            connection.setReadTimeout(5000);
            connection.setConnectTimeout(10000);
            connection.setRequestProperty("accept", "*/*");
            //发送参数
            connection.setDoOutput(true);
            out = new PrintWriter(connection.getOutputStream());
            out.print(param);
            out.flush();
            //接收结果
            is = connection.getInputStream();
            br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String line;
            //缓冲逐行读取
            while ( ( line = br.readLine() ) != null ) {
                sb.append(line);
            }
            System.out.println(sb.toString());
        } catch ( Exception ignored ) {
        } finally {
            //关闭流
            try {
                if(is!=null){
                    is.close();
                }
                if(br!=null){
                    br.close();
                }
                if (out!=null){
                    out.close();
                }
            } catch ( Exception ignored ) {}
        }
    }
}
