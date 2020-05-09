package com.wxhblog.service;

import com.wxhblog.entity.Code;
import org.springframework.stereotype.Service;

@Service
public interface CodeService {
    public Code getCodeByMail(String mail);

    public void addCode(Code code);

    public String getCodeByMailAndValue(Code code);
}
