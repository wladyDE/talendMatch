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
    private String givenName;
    private String surname;
    private String jobTitle;
    private String mail;
    private String mobilePhone;
    private String photo;
    private List<String> roles;
    private List<String> groups;
}
