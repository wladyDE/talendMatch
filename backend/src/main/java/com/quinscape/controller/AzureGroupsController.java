package com.quinscape.controller;

import com.quinscape.model.Group;
import com.quinscape.service.AzureGroupsService;
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
@RequestMapping("/talendmatch/api/v1/groups")
public class AzureGroupsController {
    @Autowired
    AzureGroupsService azureGroupsService;

    @GetMapping
    public ResponseEntity<List<Group>> getGroups(
            @RegisteredOAuth2AuthorizedClient("azure") OAuth2AuthorizedClient authorizedClient) {

        String accessToken = authorizedClient.getAccessToken().getTokenValue();

        try {
            List<Group> groups = azureGroupsService.fetchAzureGroups(accessToken);

            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<String>> getUsersByGroupId(
            @RegisteredOAuth2AuthorizedClient("azure") OAuth2AuthorizedClient authorizedClient,
            @PathVariable String id) {
        String accessToken = authorizedClient.getAccessToken().getTokenValue();

        try {
            List<String> usersId = azureGroupsService.fetchUsersByGroupId(accessToken, id);

            return ResponseEntity.ok(usersId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
