package com.quinscape.service;

import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.repository.EmployeeRepository;
import com.quinscape.repository.EmployeeSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public List<EmployeeSkill> getSkillsByEmployeeId(String employeeId) {
        return employeeSkillRepository.findByEmployeeEmployeeId(employeeId);
    }

    public List<Employee> getEmployeesBySkills(List<Long> skillIds) {
        long skillCount = skillIds.size();
        return employeeRepository.findEmployeesBySkills(skillIds, skillCount);
    }

    public List<EmployeeSkill> getSpecifiedSkillsByEmployeeId(String employeeId, List<Long> skillIds) {
        return employeeSkillRepository.findByEmployeeEmployeeIdAndSkillSkillIdIn(employeeId, skillIds);
    }
}
