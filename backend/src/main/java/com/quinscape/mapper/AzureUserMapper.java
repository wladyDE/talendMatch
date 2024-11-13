package com.quinscape.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quinscape.model.AzureUser;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AzureUserMapper {

    public List<AzureUser> parseUsers(String responseBody) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);
        JsonNode usersArray = rootNode.path("value");

        List<AzureUser> userDTOList = new ArrayList<>();
        for (JsonNode userNode : usersArray) {
            String displayName = userNode.path("displayName").asText();

            if (!displayName.equals("On-Premises Directory Synchronization Service Account")) {
                userDTOList.add(buildAzureUser(userNode));
            }
        }

        return userDTOList;
    }

    public AzureUser parseUser(String responseBody) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);

        return buildAzureUser(rootNode);
    }

    private AzureUser buildAzureUser(JsonNode userNode) {
        return AzureUser.builder()
                .id(userNode.path("id").asText())
                .displayName(userNode.path("displayName").asText())
                .mail(userNode.path("mail").asText())
                .jobTitle(userNode.path("jobTitle").asText())
                .department(userNode.path("department").asText())
                .officeLocation(userNode.path("officeLocation").asText())
                .streetAddress(userNode.path("streetAddress").asText())
                .city(userNode.path("city").asText())
                .postalCode(userNode.path("postalCode").asText())
                .mobilePhone(userNode.path("mobilePhone").asText())
                .build();
    }
}
