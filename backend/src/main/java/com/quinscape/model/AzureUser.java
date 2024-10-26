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
    private String mail;
    private String jobTitle;
    private String department;
    private String officeLocation;
    private String streetAddress;
    private String city;
    private String postalCode;
    private String mobilePhone;
    private String photo;
}
