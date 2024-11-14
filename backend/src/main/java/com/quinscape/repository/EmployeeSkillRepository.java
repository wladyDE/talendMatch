package com.quinscape.repository;

import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {
    Optional<EmployeeSkill> findByEmployeeAndSkill(Employee employee, Skill skill);
}
