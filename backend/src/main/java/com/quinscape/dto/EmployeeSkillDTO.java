package com.quinscape.dto;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeSkillDTO {
    private Long employeeId;
    private Long skillId;
    private String level;
}

