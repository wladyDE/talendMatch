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

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee createEmployee(AzureUser azureUser){
        return Employee.builder()
                .employeeId(azureUser.getId())
                .skillsVisibility(false)
                .employeeSkills(new ArrayList<>())
                .build();
    }
}
