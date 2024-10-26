package com.quinscape.service;

import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getEmployees(String userId, boolean isAdministrator) {
        if (isAdministrator) {
            return employeeRepository.findByEmployeeIdNot(userId);
        } else {
            return employeeRepository.findByEmployeeIdNotAndSkillsVisibilityTrue(userId);
        }
    }

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee createEmployee(AzureUser azureUser) {
        Employee newEmployee = Employee.builder()
                .employeeId(azureUser.getId())
                .skillsVisibility(false)
                .employeeSkills(new ArrayList<>())
                .build();

        employeeRepository.save(newEmployee);

        return newEmployee;
    }

    public void updateSkillsVisibility(String employeeId, boolean skillsVisibility) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setSkillsVisibility(skillsVisibility);
        employeeRepository.save(employee);
    }
}
