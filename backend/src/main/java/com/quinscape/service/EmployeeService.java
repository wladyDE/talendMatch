package com.quinscape.service;

import com.quinscape.dto.EmployeeSkillDTO;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.model.Level;
import com.quinscape.model.Skill;
import com.quinscape.repository.EmployeeRepository;
import com.quinscape.repository.EmployeeSkillRepository;
import com.quinscape.repository.SkillRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public List<EmployeeSkill> getSkillsByEmployeeId(Long employeeId) {
        return employeeSkillRepository.findByEmployeeEmployeeId(employeeId);
    }

    public List<Employee> getEmployeesBySkills(List<Long> skillIds) {
        long skillCount = skillIds.size();
        return employeeRepository.findEmployeesBySkills(skillIds, skillCount);
    }

    public List<EmployeeSkill> getSpecifiedSkillsByEmployeeId(Long employeeId, List<Long> skillIds) {
        return employeeSkillRepository.findByEmployeeEmployeeIdAndSkillSkillIdIn(employeeId, skillIds);
    }
}
