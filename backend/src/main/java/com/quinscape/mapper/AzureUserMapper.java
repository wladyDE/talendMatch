package com.quinscape.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quinscape.model.AzureUser;
import org.springframework.context.annotation.Bean;
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
            userDTOList.add(buildUserDTO(userNode));
        }

        return userDTOList;
    }

    public AzureUser parseUser(String responseBody) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);

        return buildUserDTO(rootNode);
    }


    private AzureUser buildUserDTO(JsonNode userNode) {
        return AzureUser.builder()
                .id(userNode.path("id").asText())
                .displayName(userNode.path("displayName").asText())
                .givenName(userNode.path("givenName").asText())
                .surname(userNode.path("surname").asText())
                .jobTitle(userNode.path("jobTitle").asText())
                .mail(userNode.path("mail").asText())
                .mobilePhone(userNode.path("mobilePhone").asText())
                .build();
    }
}
