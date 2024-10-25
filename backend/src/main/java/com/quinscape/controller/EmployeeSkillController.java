package com.quinscape.controller;

import com.quinscape.dto.EmployeeSkillDTO;
import com.quinscape.service.EmployeeSkillService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/talendmatch/api/v1/employees")
public class EmployeeSkillController {
    @Autowired
    private EmployeeSkillService employeeSkillService;

    @PostMapping("/me/skill")
    public ResponseEntity<Void> addSkillToEmployee(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody EmployeeSkillDTO employeeSkillDTO) {
        try {
            String employeeIdFromToken = jwt.getClaim("oid");
            employeeSkillDTO.setEmployeeId(employeeIdFromToken);
            employeeSkillService.addEmployeeSkill(employeeSkillDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

