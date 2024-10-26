package com.quinscape.controller;

import com.quinscape.dto.EmployeeSkillDTO;
import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeProfile;
import com.quinscape.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/talendmatch/api/v1/me")
public class CurrentUserController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeProfileService employeeProfileService;
    @Autowired
    private AzureUserService azureUserService;
    @Autowired
    private AzureTokenService azureTokenService;
    @Autowired
    private EmployeeSkillService employeeSkillService;

    @GetMapping
    public ResponseEntity<EmployeeProfile> getEmployeeById(@AuthenticationPrincipal Jwt jwt) {
        try {
            String employeeIdFromToken = jwt.getClaim("oid");

            String graphAccessToken = azureTokenService.getGraphAccessToken();

            AzureUser azureEmployee =  azureUserService.fetchUserData(graphAccessToken, employeeIdFromToken);

            Employee employee = employeeService.getEmployeeById(employeeIdFromToken);

            EmployeeProfile employeeProfile = employeeProfileService.getEmployeeProfile(employee, azureEmployee);

            return ResponseEntity.ok(employeeProfile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/skill")
    public ResponseEntity<Void> addEmployeeSkill(
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

    @PatchMapping("/skills-visibility")
    public ResponseEntity<Void> updateSkillsVisibility(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam boolean skillsVisibility) {
        try {
            String employeeIdFromToken = jwt.getClaim("oid");

            employeeService.updateSkillsVisibility(employeeIdFromToken, skillsVisibility);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}


