package com.quinscape.controller;

import com.quinscape.dto.AzureUserGroupsAndRoles;
import com.quinscape.mapper.AzureUserMapper;
import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeProfile;
import com.quinscape.model.Group;
import com.quinscape.service.AzureTokenService;
import com.quinscape.service.AzureUserService;
import com.quinscape.service.EmployeeProfileService;
import com.quinscape.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/talendmatch/api/v1/employees")
public class EmployeeProfileController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeProfileService employeeProfileService;
    @Autowired
    private AzureUserService azureUserService;
    @Autowired
    private AzureUserMapper azureUserMapper;
    @Autowired
    private AzureTokenService azureTokenService;

    @GetMapping
    public ResponseEntity<List<EmployeeProfile>> getEmployees() {
        try {
            String graphAccessToken = azureTokenService.getGraphAccessToken();

            String responseBody = azureUserService.fetchUserData(graphAccessToken, null);
            List<AzureUser> azureEmployees = azureUserMapper.parseUsers(responseBody);

            for (AzureUser azureEmployee : azureEmployees) {
                String groupsResponse = azureUserService.fetchUserGroups(graphAccessToken, azureEmployee.getId());
                List<Group> groups = azureUserMapper.parseUserGroups(groupsResponse);
                azureEmployee.setGroups(groups);
            }

            List<Employee> employees = employeeService.getEmployees();

            List<EmployeeProfile> employeeProfiles = employeeProfileService.getEmployeeProfiles(employees, azureEmployees);
            List<EmployeeProfile> sortedProfiles = employeeProfileService.sortEmployeeProfiles(employeeProfiles);

            return ResponseEntity.ok(sortedProfiles);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeProfile> getEmployeeById(@PathVariable String employeeId) {
        try {
            String graphAccessToken = azureTokenService.getGraphAccessToken();

            String responseBody = azureUserService.fetchUserData(graphAccessToken, employeeId);
            AzureUser azureEmployee = azureUserMapper.parseUser(responseBody);

            if (azureEmployee == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            String groupsResponse = azureUserService.fetchUserGroups(graphAccessToken, azureEmployee.getId());
            List<Group> groups = azureUserMapper.parseUserGroups(groupsResponse);
            azureEmployee.setGroups(groups);

            Employee employee = employeeService.getEmployeeById(employeeId);
            if (employee == null) {
                employee = employeeService.createEmployee(azureEmployee);
            }

            EmployeeProfile employeeProfile = employeeProfileService.getEmployeeProfile(employee, azureEmployee);

            return ResponseEntity.ok(employeeProfile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PatchMapping("/{employeeId}/skills-visibility")
    public ResponseEntity<Void> updateSkillsVisibility(
            @PathVariable String employeeId,
            @RequestParam boolean skillsVisibility) {
        employeeService.updateSkillsVisibility(employeeId, skillsVisibility);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}


