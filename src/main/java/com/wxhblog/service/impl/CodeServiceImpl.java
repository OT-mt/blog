package com.wxhblog.service.impl;

import com.wxhblog.entity.Code;
import com.wxhblog.mapper.CodeMapper;
import com.wxhblog.service.CodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CodeServiceImpl implements CodeService {
    @Autowired
    private CodeMapper codeMapper;

    @Override
    public Code getCodeByMail(String mail) {
        return codeMapper.getCodeByMail(mail);
    }

    @Override
    public void addCode(Code code) {
        codeMapper.addCode(code);
    }

    @Override
    public String getCodeByMailAndValue(Code code) {
        return codeMapper.getCodeByMailAndValue(code);
    }
}
