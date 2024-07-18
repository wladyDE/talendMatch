package com.quinscape.repository;

import com.quinscape.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e JOIN e.employeeSkills es WHERE es.skill.skillId IN :skillIds GROUP BY e.employeeId HAVING COUNT(DISTINCT es.skill.skillId) = :skillCount")
    List<Employee> findEmployeesBySkills(@Param("skillIds") List<Long> skillIds, @Param("skillCount") long skillCount);
    Optional<User> findByEmail(String email);
}
