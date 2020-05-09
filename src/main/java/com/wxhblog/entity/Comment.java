package com.wxhblog.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class Comment {
    private Long id;

    private String value;

    private User user;

    @JsonFormat(timezone = "CST+8", pattern = "yyyy-MM-dd")
    private Date created_time;
}
