package com.quinscape.service;

import com.quinscape.mapper.AzureUserMapper;
import com.quinscape.mapper.AzureUserRolesMapper;
import com.quinscape.model.AzureUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.List;

@Service
public class AzureUserService {
    @Autowired
    AzureUserMapper azureUserMapper;
    @Autowired
    AzureUserRolesMapper azureUserRolesMapper;
    private final Map<String, String> photoCache = new HashMap<>();

    public AzureUser fetchUserData(String accessToken, String userId) throws Exception {
        String url = "https://graph.microsoft.com/v1.0/users/" + userId;
        String response = fetchData(url, accessToken);

        AzureUser user = azureUserMapper.parseUser(response);

        String photo = fetchUserPhoto(accessToken, user.getId());
        user.setPhoto(photo);

        return user;
    }

    public List<AzureUser> fetchUsersData(String accessToken) throws Exception {
        String url = "https://graph.microsoft.com/v1.0/users";
        String response = fetchData(url, accessToken);

        List<AzureUser> users = azureUserMapper.parseUsers(response);

        for (AzureUser user : users) {
            String photo = fetchUserPhoto(accessToken, user.getId());
            user.setPhoto(photo);
        }

        return users;
    }

    private String fetchData(String url, String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        url += "?$select=id,displayName,mail,jobTitle,department,officeLocation,streetAddress,city,postalCode,mobilePhone";

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }

    public boolean isAdministrator(String accessToken, String userId) throws Exception {
        List<String> roles = fetchUserRoles(accessToken, userId);
        return roles.stream().anyMatch(role -> role.equals("Global Administrator"));
    }


    private List<String> fetchUserRoles(String accessToken, String userId) throws Exception {
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

        return azureUserRolesMapper.parseRoles(response.getBody());
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

                ByteArrayInputStream inputStream = new ByteArrayInputStream(Objects.requireNonNull(photoBytes));
                BufferedImage originalImage = ImageIO.read(inputStream);
                BufferedImage resizedImage = resizeImage(originalImage);

                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                ImageIO.write(resizedImage, "jpg", outputStream);
                byte[] resizedBytes = outputStream.toByteArray();

                String photoBase64 = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(resizedBytes);

                photoCache.put(userId, photoBase64);
                return photoBase64;
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                photoCache.put(userId, null);
                return null;
            }
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    private BufferedImage resizeImage(BufferedImage originalImage) {
        int imageResolution = 300;
        Image resultingImage = originalImage.getScaledInstance(imageResolution, imageResolution, Image.SCALE_SMOOTH);
        BufferedImage outputImage = new BufferedImage(imageResolution, imageResolution, BufferedImage.TYPE_INT_RGB);
        outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);
        return outputImage;
    }
}
