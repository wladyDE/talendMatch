package com.quinscape.controller;

import com.quinscape.dto.AzureUserGroupsAndRoles;
import com.quinscape.mapper.AzureUserMapper;
import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeProfile;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.service.AzureUserService;
import com.quinscape.service.EmployeeProfileService;
import com.quinscape.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping
    public ResponseEntity<List<EmployeeProfile>> getEmployees(
            @RegisteredOAuth2AuthorizedClient("azure") OAuth2AuthorizedClient authorizedClient) {
        String accessToken = authorizedClient.getAccessToken().getTokenValue();

        try {
            String responseBody = azureUserService.fetchUserData(accessToken, null);
            List<AzureUser> azureEmployees = azureUserMapper.parseUsers(responseBody);

            List<Employee> employees = employeeService.getEmployees();

            List<EmployeeProfile> employeeProfiles = employeeProfileService.getEmployeeProfiles(employees, azureEmployees);
            List<EmployeeProfile> sortedProfiles = employeeProfileService.sortEmployeeProfiles(employeeProfiles);

            return ResponseEntity.ok(sortedProfiles);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeProfile> getEmployeeById(
            @RegisteredOAuth2AuthorizedClient("azure") OAuth2AuthorizedClient authorizedClient,
            @PathVariable String id) {
        String accessToken = authorizedClient.getAccessToken().getTokenValue();

        try {
            String responseBody = azureUserService.fetchUserData(accessToken, id);
            AzureUser azureEmployee = azureUserMapper.parseUser(responseBody);

            if (azureEmployee == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Employee employee = employeeService.getEmployeeById(id);
            if (employee == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            AzureUserGroupsAndRoles userGroupsAndRoles = azureUserService.fetchUserRoles(accessToken, azureEmployee.getId());
            azureEmployee.setGroups(userGroupsAndRoles.getGroups());
            azureEmployee.setRoles(userGroupsAndRoles.getRoles());

            List<EmployeeSkill> skills = employeeService.getSkillsByEmployeeId(id);
            employee.setEmployeeSkills(skills);

            EmployeeProfile employeeProfile = employeeProfileService.getEmployeeProfile(employee, azureEmployee);

            return ResponseEntity.ok(employeeProfile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


