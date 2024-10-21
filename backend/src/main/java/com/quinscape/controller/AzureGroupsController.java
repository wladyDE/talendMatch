package com.quinscape.controller;

import com.quinscape.model.Group;
import com.quinscape.service.AzureGroupsService;
import com.quinscape.service.AzureTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    private AzureTokenService azureTokenService;

    @GetMapping
    public ResponseEntity<List<Group>> getGroups() {
        try {
            String graphAccessToken = azureTokenService.getGraphAccessToken();

            List<Group> groups = azureGroupsService.fetchAzureGroups(graphAccessToken);

            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<String>> getUsersByGroupId(@PathVariable String id) {
        try {
            String graphAccessToken = azureTokenService.getGraphAccessToken();

            List<String> usersId = azureGroupsService.fetchUsersByGroupId(graphAccessToken, id);

            return ResponseEntity.ok(usersId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
