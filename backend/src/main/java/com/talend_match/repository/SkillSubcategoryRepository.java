package com.talend_match.repository;

import com.talend_match.model.SkillSubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillSubcategoryRepository extends JpaRepository<SkillSubcategory, Long> {
}
