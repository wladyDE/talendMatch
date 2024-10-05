package com.quinscape.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quinscape.model.Group;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GroupMapper {
    public List<Group> parseGroups(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(jsonString);
        JsonNode valueNode = rootNode.path("value");

        List<Group> groups = new ArrayList<>();
        for (JsonNode node : valueNode) {
            Group group = new Group();
            group.setId(node.path("id").asText());
            group.setDisplayName(node.path("displayName").asText());
            groups.add(group);
        }
        return groups;
    }

    public List<String> extractUserIds(String responseBody) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);
        JsonNode valueNode = rootNode.path("value");

        List<String> userIds = new ArrayList<>();
        for (JsonNode node : valueNode) {
            userIds.add(node.path("id").asText());
        }
        return userIds;
    }
}
