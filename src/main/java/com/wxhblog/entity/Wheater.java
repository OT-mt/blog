package com.wxhblog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Entity;

@Data
@Table("user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wheater {
    // 省
    private String province;
    // 市
    private String city;
}
