package com.quinscape.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quinscape.dto.AzureUserGroupsAndRoles;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AzureGroupsAndRolesMapper {
    public AzureUserGroupsAndRoles parseAzureUserGroupsAndRoles(String responseBody) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);
        JsonNode groupsAndRolesArray = rootNode.path("value");

        List<String> groupsAndRoles = getRolesAndGroups(groupsAndRolesArray);
        List<String> roles = getRoles(groupsAndRolesArray);

        List<String> groups = new ArrayList<>(groupsAndRoles);
        groups.removeAll(roles);

        return AzureUserGroupsAndRoles.builder()
                .groups(groups)
                .roles(roles)
                .build();
    }

    private List<String> getRolesAndGroups(JsonNode groupsAndRolesArray){
        List<String> groupsAndRoles = new ArrayList<>();
        for (JsonNode node : groupsAndRolesArray) {
            String name = node.path("displayName").asText();
            if (!name.isEmpty()) {
                groupsAndRoles.add(name);
            }
        }
        return groupsAndRoles;
    }

    private List<String> getRoles(JsonNode groupsAndRolesArray){
        List<String> roles = new ArrayList<>();
        for (JsonNode roleNode : groupsAndRolesArray) {
            String objectType = roleNode.path("@odata.type").asText();
            if (objectType.contains("directoryRole")) {
                String roleName = roleNode.path("displayName").asText();
                if (!roleName.isEmpty()) {
                    roles.add(roleName);
                }
            }
        }
        return roles;
    }
}
