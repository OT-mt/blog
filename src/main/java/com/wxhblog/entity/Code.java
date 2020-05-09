package com.wxhblog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Code {
    public Code(String mail,String value){
        this.mail = mail;
        this.value = value;
    }
    @Id
    private Long id;

    private String mail;

    private String value;
}
