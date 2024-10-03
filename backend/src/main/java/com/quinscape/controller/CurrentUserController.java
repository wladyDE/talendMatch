package com.quinscape.controller;

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
            String responseBody = azureUserService.fetchUserData(accessToken, null);
            AzureUser azureUser = azureUserService.findAzureUser(responseBody, userFullName);

            if (azureUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Employee employee = employeeService.getEmployeeById(azureUser.getId());
            if (employee == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            List<EmployeeSkill> skills = employeeService.getSkillsByEmployeeId(employee.getEmployeeId());
            employee.setEmployeeSkills(skills);

            EmployeeProfile employeeProfile = employeeProfileService.getEmployeeProfile(employee, azureUser);

            return ResponseEntity.ok(employeeProfile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


