package com.quinscape.controller;

import com.quinscape.dto.EmployeeSkillDTO;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.service.EmployeeSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/talendmatch/api/employee")
public class EmployeeSkillController {
    @Autowired
    private EmployeeSkillService employeeSkillService;

    @PostMapping("/{employeeId}/skills")
    public ResponseEntity<EmployeeSkill> addSkillToEmployee(@RequestBody EmployeeSkillDTO employeeSkillDTO) {
        EmployeeSkill employeeSkill = employeeSkillService.addEmployeeSkill(employeeSkillDTO);
        return new ResponseEntity<>(employeeSkill, HttpStatus.CREATED);
    }
}

