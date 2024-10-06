package com.quinscape.dto;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeSkillDTO {
    private String employeeId;
    private Long skillId;
    private Long level;
}

