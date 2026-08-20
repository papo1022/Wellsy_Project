package com.kh.wellsy.bmi.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.bmi.model.dao.BmiDao;
import com.kh.wellsy.bmi.model.vo.Bmi;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BmiService {

    private final BmiDao bmiDao;

    public List<Bmi> selectBmiList(Integer memberId) {

        return bmiDao
                .findByMemberIdAndBmiIsNotNullOrderByRecordDateAsc(
                        memberId
                );
    }
}