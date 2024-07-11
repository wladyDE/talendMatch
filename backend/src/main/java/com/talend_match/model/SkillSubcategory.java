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
public class SkillSubcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillSubcategoryId;

    private String skillSubcategoryName;

    @ManyToOne
    @JoinColumn(name = "skill_category_id", nullable = false)
    private SkillCategory skillCategory;
}
