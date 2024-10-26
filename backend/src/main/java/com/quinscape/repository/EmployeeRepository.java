package com.quinscape.repository;

import com.quinscape.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    List<Employee> findByEmployeeIdNot(String userId);

    List<Employee> findByEmployeeIdNotAndSkillsVisibilityTrue(String userId);
}
