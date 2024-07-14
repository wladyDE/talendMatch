package com.quinscape.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    private String skillName;

    @ManyToOne
    @JoinColumn(name = "skill_subcategory_id", nullable = false)
    private SkillSubcategory skillSubcategory;
}
