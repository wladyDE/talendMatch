package com.quinscape.repository;

import com.quinscape.model.EmployeeSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {
    List<EmployeeSkill> findByEmployeeEmployeeId(Long employeeId);
    List<EmployeeSkill> findByEmployeeEmployeeIdAndSkillSkillIdIn(Long employeeId, List<Long> skillIds);
}
