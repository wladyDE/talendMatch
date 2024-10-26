package com.quinscape.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeProfile {
    private String employeeId;

    private boolean skillsVisibility;
    private List<EmployeeSkill> employeeSkills;

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
