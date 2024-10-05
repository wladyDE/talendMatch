package com.quinscape.controller;

import com.quinscape.dto.AzureUserGroupsAndRoles;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/talendmatch/api/v1/me")
public class CurrentUserController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeProfileService employeeProfileService;
    @Autowired
    private AzureUserService azureUserService;

    @GetMapping
    public ResponseEntity<EmployeeProfile> getCurrentUser(
            @AuthenticationPrincipal OidcUser principal,
            @RegisteredOAuth2AuthorizedClient("azure") OAuth2AuthorizedClient authorizedClient) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String accessToken = authorizedClient.getAccessToken().getTokenValue();
        String userFullName = principal.getFullName();

        try {
            AzureUser azureUser = getAzureUser(accessToken, userFullName);
            if (azureUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Employee employee = getEmployeeDetails(azureUser.getId());
            if (employee == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            EmployeeProfile employeeProfile = employeeProfileService.getEmployeeProfile(employee, azureUser);
            return ResponseEntity.ok(employeeProfile);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private AzureUser getAzureUser(String accessToken, String userFullName) throws Exception {
        String responseBody = azureUserService.fetchUserData(accessToken, null);
        AzureUser azureUser = azureUserService.findAzureUser(responseBody, userFullName);

        if (azureUser != null) {
            AzureUserGroupsAndRoles userGroupsAndRoles = azureUserService.fetchUserRoles(accessToken, azureUser.getId());
            azureUser.setGroups(userGroupsAndRoles.getGroups());
            azureUser.setRoles(userGroupsAndRoles.getRoles());

            String azureUserPhoto = azureUserService.fetchUserPhoto(accessToken, azureUser.getId());
            azureUser.setPhoto(azureUserPhoto);
        }

        return azureUser;
    }

    private Employee getEmployeeDetails(String userId) {
        Employee employee = employeeService.getEmployeeById(userId);
        if (employee != null) {
            List<EmployeeSkill> skills = employeeService.getSkillsByEmployeeId(employee.getEmployeeId());
            employee.setEmployeeSkills(skills);
        }
        return employee;
    }
}


