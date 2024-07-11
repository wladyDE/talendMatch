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
public class SkillCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillCategoryId;

    private String skillCategoryName;
}
