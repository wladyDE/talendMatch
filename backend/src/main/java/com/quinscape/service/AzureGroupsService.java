package com.quinscape.service;

import com.quinscape.mapper.GroupMapper;
import com.quinscape.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AzureGroupsService {
    @Autowired
    private GroupMapper groupMapper;

    public List<Group> fetchAzureGroups(String accessToken) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = "https://graph.microsoft.com/v1.0/groups?$select=id,displayName";

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            return groupMapper.parseGroups(response.getBody());
        } else {
            throw new RuntimeException("Failed to fetch groups from Azure AD");
        }
    }

    public List<String> fetchUsersByGroupId(String accessToken, String groupId) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = ("https://graph.microsoft.com/v1.0/groups/" + groupId + "/members");

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            return groupMapper.extractUserIds(response.getBody());
        } else {
            throw new RuntimeException("Failed to fetch users from Azure AD");
        }
    }
}

