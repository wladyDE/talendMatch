package com.quinscape.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class EmployeeSkillId implements Serializable {
    private String employee;
    private Long skill;
}
