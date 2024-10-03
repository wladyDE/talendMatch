package com.quinscape.service;

import com.quinscape.mapper.AzureUserMapper;
import com.quinscape.model.AzureUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AzureUserService {
    @Autowired
    AzureUserMapper azureUserMapper;

    public String fetchUserData(String accessToken, String userId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = "https://graph.microsoft.com/v1.0/users";

        if (userId != null && !userId.isEmpty()) {
            url += "/" + userId;
        }

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }

    public AzureUser findAzureUser(String responseBody, String userEmail) throws Exception {
        List<AzureUser> azureUsers = azureUserMapper.parseUsers(responseBody);
        return azureUsers.stream()
                .filter(user -> user.getDisplayName().equalsIgnoreCase(userEmail))
                .findFirst()
                .orElse(null);
    }
}
