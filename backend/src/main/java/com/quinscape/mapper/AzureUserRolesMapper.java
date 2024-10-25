package com.quinscape.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AzureUserRolesMapper {
    public List<String> parseRoles(String responseBody) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);
        JsonNode groupsAndRolesArray = rootNode.path("value");

        return getRoles(groupsAndRolesArray);
    }

    private List<String> getRoles(JsonNode groupsAndRolesArray) {
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