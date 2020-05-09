package com.wxhblog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
@Table("user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    public User(String mail,String password,String name,String img_src) {
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.img_src = img_src;
    }

    @Id
    private Long id;

    private String name;

    private String mail;

    private String password;

    private String img_src;
}
