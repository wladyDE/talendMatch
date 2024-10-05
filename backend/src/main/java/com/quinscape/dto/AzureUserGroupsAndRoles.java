package com.quinscape.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AzureUserGroupsAndRoles {
    private List<String> roles;
    private List<String> groups;
}
