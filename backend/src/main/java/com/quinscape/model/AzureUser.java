package com.quinscape.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AzureUser {
    private String id;
    private String displayName;
    private String givenName;
    private String surname;
    private String jobTitle;
    private String mail;
    private String mobilePhone;
    private String photo;
    private List<Group> groups;
}
