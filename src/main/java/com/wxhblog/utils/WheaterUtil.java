package com.wxhblog.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class WheaterUtil {
    // 得到所在城市
    public static String getCity(){
        //参数字符串，如果拼接在请求链接之后，需要对中文进行 URLEncode   字符集 UTF-8
        StringBuilder sb = new StringBuilder();
        InputStream is = null;
        BufferedReader br = null;
        PrintWriter out = null;
        String city="北京";
        try {
            //接口地址
            // 获取地址
            String url = "https://restapi.amap.com/v3/ip?output=json&key=d4bb6c717516257186ab250274c74e51";
            URL uri = new URL(url);
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
            Map<String,String> map = objectMapper.readValue(sb.toString(),Map.class);
            city = map.get("city");

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

                return city;
            } catch ( Exception ignored ) {}
        }
        return city;
    }
    // 得到城市的近三天天气
    public static String wheater(String city){
        //参数字符串，如果拼接在请求链接之后，需要对中文进行 URLEncode   字符集 UTF-8
        StringBuilder sb = new StringBuilder();
        InputStream is = null;
        BufferedReader br = null;
        PrintWriter out = null;
        String result = "";
        try {
            //接口地址
            String url = "https://free-api.heweather.net/s6/weather/forecast?key=7932e0e6e990485da17046410d4282d1&location="+city;
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
            result = sb.toString();
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
        return result;
    }
}
