package com.quinscape.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AzureTokenService {
    @Value("${spring.security.oauth2.client.registration.azure.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.azure.client-secret}")
    private String clientSecret;

    @Value("${azure.tenant-id}")
    private String tenantId;

    public String getGraphAccessToken() throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);

        String scope = "https://graph.microsoft.com/.default";
        String body = "client_id=" + clientId +
                "&scope=" + scope +
                "&client_secret=" + clientSecret +
                "&grant_type=client_credentials";

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        String tokenUrlTemplate = "https://login.microsoftonline.com/%s/oauth2/v2.0/token";
        String tokenUrl = String.format(tokenUrlTemplate, tenantId);

        ResponseEntity<String> response = restTemplate.exchange(
                tokenUrl,
                HttpMethod.POST,
                request,
                String.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            return extractAccessTokenFromResponse(response.getBody());
        } else {
            throw new Exception("Failed to get access token from Azure. Response: " + response.getBody());
        }
    }

    private String extractAccessTokenFromResponse(String responseBody) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }
}