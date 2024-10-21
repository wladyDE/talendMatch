package com.quinscape.service;

import com.quinscape.dto.AzureUserGroupsAndRoles;
import com.quinscape.mapper.AzureGroupsAndRolesMapper;
import com.quinscape.mapper.AzureUserMapper;
import com.quinscape.model.AzureUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AzureUserService {
    @Autowired
    AzureUserMapper azureUserMapper;
    @Autowired
    AzureGroupsAndRolesMapper azureGroupsAndRolesMapper;
    private final Map<String, String> photoCache = new HashMap<>();

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

    public String fetchUserGroups(String accessToken, String userId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = "https://graph.microsoft.com/v1.0/users/" + userId + "/memberOf";

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }

    public AzureUserGroupsAndRoles fetchUserRoles(String accessToken, String userId) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = "https://graph.microsoft.com/v1.0/users/" + userId + "/memberOf";

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return azureGroupsAndRolesMapper.parseAzureUserGroupsAndRoles(response.getBody());
    }

    public String fetchUserPhoto(String accessToken, String userId) {
        if (photoCache.containsKey(userId)) {
            return photoCache.get(userId);
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = "https://graph.microsoft.com/v1.0/users/" + userId + "/photo/$value";

        try {
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    byte[].class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                byte[] photoBytes = response.getBody();

                ByteArrayInputStream inputStream = new ByteArrayInputStream(photoBytes);
                BufferedImage originalImage = ImageIO.read(inputStream);
                BufferedImage resizedImage = resizeImage(originalImage, 100, 100);

                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                ImageIO.write(resizedImage, "jpg", outputStream);
                byte[] resizedBytes = outputStream.toByteArray();

                String photoBase64 = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(resizedBytes);

                photoCache.put(userId, photoBase64);
                return photoBase64;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) {
        Image resultingImage = originalImage.getScaledInstance(targetWidth, targetHeight, Image.SCALE_SMOOTH);
        BufferedImage outputImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);
        return outputImage;
    }


    public AzureUser findAzureUser(String responseBody, String userEmail) throws Exception {
        List<AzureUser> azureUsers = azureUserMapper.parseUsers(responseBody);
        return azureUsers.stream()
                .filter(user -> user.getDisplayName().equalsIgnoreCase(userEmail))
                .findFirst()
                .orElse(null);
    }
}
