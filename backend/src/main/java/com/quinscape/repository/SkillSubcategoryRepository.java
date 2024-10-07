package com.quinscape.repository;

import com.quinscape.model.SkillSubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillSubcategoryRepository extends JpaRepository<SkillSubcategory, Long> {
}