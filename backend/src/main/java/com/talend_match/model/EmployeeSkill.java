package com.talend_match.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeSkill {
    @Id
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Id
    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @ManyToOne
    @JoinColumn(name = "level_id", nullable = false)
    private Level level;
}
