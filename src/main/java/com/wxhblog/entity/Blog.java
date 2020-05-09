package com.wxhblog.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wxhblog.enums.BlogEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Blog {
    public Blog(BlogEnum type,String title,String text,String text_mark,String text_html){
        this.type = type;
        this.text = text;
        this.title = title;
        this.text_mark = text_mark;
        this.text_html = text_html;
    }
    @Id
    private Long Id;

    private BlogEnum type;

    private String title;

    private String text;

    private String text_mark;

    private String text_html;

    private Integer view;

    private List<Comment> comments;

    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date created_time;

    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date updated_time;

}
