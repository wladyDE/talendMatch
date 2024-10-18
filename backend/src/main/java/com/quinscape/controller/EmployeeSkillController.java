package com.quinscape.controller;

import com.quinscape.dto.EmployeeSkillDTO;
import com.quinscape.service.EmployeeSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/talendmatch/api/v1/employees")
public class EmployeeSkillController {
    @Autowired
    private EmployeeSkillService employeeSkillService;

    @PostMapping("/{employeeId}/skill")
    public ResponseEntity<Void> addSkillToEmployee(@RequestBody EmployeeSkillDTO employeeSkillDTO) {
        employeeSkillService.addEmployeeSkill(employeeSkillDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

