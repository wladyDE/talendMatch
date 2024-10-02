package com.quinscape.repository;

import com.quinscape.model.EmployeeSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {
    List<EmployeeSkill> findByEmployeeEmployeeId(String employee_employeeId);
    List<EmployeeSkill> findByEmployeeEmployeeIdAndSkillSkillIdIn(String employee_employeeId, Collection<Long> skill_skillId);
}
