package com.quinscape.controller;

import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeProfile;
import com.quinscape.service.AzureTokenService;
import com.quinscape.service.AzureUserService;
import com.quinscape.service.EmployeeProfileService;
import com.quinscape.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/talendmatch/api/v1/employees")
public class EmployeesController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeProfileService employeeProfileService;
    @Autowired
    private AzureUserService azureUserService;
    @Autowired
    private AzureTokenService azureTokenService;

    @GetMapping
    public ResponseEntity<List<EmployeeProfile>> getEmployees(@AuthenticationPrincipal Jwt jwt) {
        try {
            String employeeIdFromToken = jwt.getClaim("oid");
            String graphAccessToken = azureTokenService.getGraphAccessToken();

            boolean isAdministrator = azureUserService.isAdministrator(graphAccessToken, employeeIdFromToken);

            List<AzureUser> azureEmployees = azureUserService.fetchUsersData(graphAccessToken);

            List<Employee> employees = employeeService.getEmployees(employeeIdFromToken, isAdministrator);

            List<EmployeeProfile> employeeProfiles = employeeProfileService.getEmployeeProfiles(employees, azureEmployees);

            return ResponseEntity.ok(employeeProfiles);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


