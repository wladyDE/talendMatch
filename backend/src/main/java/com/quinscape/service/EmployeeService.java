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

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(String id, AzureUser azureUser) {
        return employeeRepository.findById(id)
                .orElse(createEmployee(azureUser));
    }

    public Employee createEmployee(AzureUser azureUser){
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
